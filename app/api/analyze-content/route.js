// app/api/analyze-content/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    console.log("Starting analysis for content length:", content.length);
    console.log("HF API Key exists:", !!process.env.HUGGINGFACE_API_KEY);

    // Run multiple analyses with timeout
    const startTime = Date.now();
    const timeout = 15000; // 15 second timeout

    const analysisPromises = [
      Promise.race([
        analyzeSpam(content),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Spam analysis timeout")), timeout)
        ),
      ]),
      Promise.race([
        analyzePhishing(content),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Phishing analysis timeout")),
            timeout
          )
        ),
      ]),
      Promise.race([
        analyzeURLs(content),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("URL analysis timeout")), timeout)
        ),
      ]),
      Promise.race([
        analyzeSentiment(content),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Sentiment analysis timeout")),
            timeout
          )
        ),
      ]),
    ];

    const results = await Promise.allSettled(analysisPromises);
    const processingTime = (Date.now() - startTime) / 1000;

    // Extract results (handle failed promises gracefully)
    const spam =
      results[0].status === "fulfilled"
        ? results[0].value
        : {
            score: 0.3,
            confidence: 0.3,
            source: "fallback",
            error: results[0].reason?.message,
          };
    const phishing =
      results[1].status === "fulfilled"
        ? results[1].value
        : {
            score: 0.3,
            confidence: 0.3,
            source: "fallback",
            error: results[1].reason?.message,
          };
    const urls =
      results[2].status === "fulfilled"
        ? results[2].value
        : {
            score: 0,
            suspiciousUrls: [],
            source: "fallback",
            error: results[2].reason?.message,
          };
    const sentiment =
      results[3].status === "fulfilled"
        ? results[3].value
        : {
            label: "neutral",
            score: 0.5,
            source: "fallback",
            error: results[3].reason?.message,
          };

    // Calculate overall trust score
    const trustScore = calculateTrustScore(spam, phishing, urls, sentiment);
    const riskLevel =
      trustScore > 70 ? "low" : trustScore > 40 ? "medium" : "high";

    const analysisResult = {
      trustScore: Math.round(trustScore),
      riskLevel,
      categories: {
        spam: Math.round(spam.score * 100),
        phishing: Math.round(phishing.score * 100),
        scam: Math.round(calculateScamScore(spam, phishing, sentiment)),
        misinformation: Math.round(calculateMisinfoScore(sentiment, urls)),
      },
      insights: generateInsights(spam, phishing, urls, sentiment, content),
      processingTime,
      confidence: Math.round(
        calculateOverallConfidence([spam, phishing, sentiment])
      ),
      modelVersion: "HuggingFace-App-v1.1.0",
      details: {
        urlAnalysis: urls,
        modelResults: {
          spam: spam,
          phishing: phishing,
          sentiment: sentiment,
        },
        apiStatus: {
          successful: results.filter((r) => r.status === "fulfilled").length,
          total: results.length,
          errors: results
            .filter((r) => r.status === "rejected")
            .map((r) => r.reason?.message),
        },
      },
    };

    console.log("Analysis completed:", {
      trustScore: analysisResult.trustScore,
      riskLevel: analysisResult.riskLevel,
      processingTime: analysisResult.processingTime,
      successfulAPIs: analysisResult.details.apiStatus.successful,
    });

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        message: error.message,
        trustScore: 50,
        riskLevel: "unknown",
        categories: { spam: 0, phishing: 0, scam: 0, misinformation: 0 },
        insights: ["Analysis temporarily unavailable - using fallback methods"],
        confidence: 30,
        modelVersion: "Fallback-v1.0.0",
      },
      { status: 500 }
    );
  }
}

// Spam Detection with better error handling
async function analyzeSpam(text) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  try {
    console.log("Analyzing spam with HF model...");

    const headers = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    // Try the primary spam detection model
    let response = await fetch(
      "https://api-inference.huggingface.co/models/unitary/toxic-bert",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true },
        }),
      }
    );

    // If primary model fails, try alternative
    if (!response.ok) {
      console.warn(`Primary spam model failed with status: ${response.status}`);

      response = await fetch(
        "https://api-inference.huggingface.co/models/martin-ha/toxic-comment-model",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            inputs: text,
            options: { wait_for_model: true },
          }),
        }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Spam API failed: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("Spam result structure:", typeof result, Array.isArray(result));

    // Handle different response formats
    if (Array.isArray(result) && result[0]) {
      if (Array.isArray(result[0])) {
        // Format: [[{label: "TOXIC", score: 0.xx}, {label: "CLEAN", score: 0.xx}]]
        const toxicItem = result[0].find(
          (item) =>
            item.label &&
            (item.label.toLowerCase().includes("toxic") ||
              item.label.toLowerCase().includes("spam"))
        );

        if (toxicItem) {
          return {
            score: toxicItem.score,
            label: toxicItem.score > 0.5 ? "spam" : "ham",
            confidence: toxicItem.score,
            source: "huggingface-toxic-detection",
          };
        }
      } else if (result[0].label && result[0].score !== undefined) {
        // Format: [{label: "TOXIC", score: 0.xx}]
        const item = result[0];
        return {
          score: item.label.toLowerCase().includes("toxic")
            ? item.score
            : 1 - item.score,
          label: item.score > 0.5 ? "spam" : "ham",
          confidence: item.score,
          source: "huggingface-classification",
        };
      }
    }

    throw new Error("Unexpected response format from HF API");
  } catch (error) {
    console.warn("All HF spam models failed:", error.message);
    return keywordSpamDetection(text);
  }
}

// Phishing Detection using text classification
async function analyzePhishing(text) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  try {
    console.log("Analyzing phishing with classification model...");

    const headers = { "Content-Type": "application/json" };
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    // Using a reliable text classification model
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          inputs: text,
          parameters: {
            candidate_labels: [
              "phishing",
              "scam",
              "legitimate",
              "safe",
              "suspicious",
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn(`Phishing API status: ${response.status}`);
      const errorText = await response.text();
      console.warn("Response:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("Phishing classification result:", result);

    if (result && result.labels && result.scores) {
      // Calculate combined risk score (phishing + scam + suspicious)
      let riskScore = 0;
      const riskLabels = ["phishing", "scam", "suspicious"];

      result.labels.forEach((label, index) => {
        if (riskLabels.includes(label.toLowerCase())) {
          riskScore += result.scores[index];
        }
      });

      const isPhishing = riskScore > 0.4; // Lower threshold for better detection

      return {
        score: riskScore,
        label: isPhishing ? "phishing" : "safe",
        confidence: Math.max(...result.scores), // Highest confidence
        source: "huggingface-bart-classification",
        originalText: text, // Pass text for additional analysis
        details: {
          allScores: result.scores,
          allLabels: result.labels,
          riskScore,
        },
      };
    }

    throw new Error("No phishing classification found");
  } catch (error) {
    console.warn("HF phishing analysis failed:", error.message);
    return keywordPhishingDetection(text);
  }
}

// Sentiment Analysis with multiple fallback models
async function analyzeSentiment(text) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  const models = [
    "cardiffnlp/twitter-roberta-base-sentiment-latest",
    "nlptown/bert-base-multilingual-uncased-sentiment",
    "cardiffnlp/twitter-roberta-base-sentiment",
  ];

  for (const model of models) {
    try {
      console.log(`Trying sentiment model: ${model}`);

      const headers = { "Content-Type": "application/json" };
      if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
      }

      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            inputs: text,
            options: { wait_for_model: true },
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(`Sentiment result from ${model}:`, result);

        if (Array.isArray(result) && result[0]) {
          let sentiment, score;

          if (Array.isArray(result[0])) {
            // Format: [[{label: "POSITIVE", score: 0.9}]]
            sentiment = result[0][0];
          } else {
            // Format: [{label: "POSITIVE", score: 0.9}]
            sentiment = result[0];
          }

          if (sentiment && sentiment.label && sentiment.score !== undefined) {
            const label = sentiment.label.toLowerCase().replace("label_", "");
            return {
              label,
              score: sentiment.score,
              confidence: sentiment.score,
              source: `huggingface-${model.split("/")[1]}`,
            };
          }
        }
      } else {
        console.warn(`Model ${model} failed with status: ${response.status}`);
      }
    } catch (error) {
      console.warn(`Model ${model} error:`, error.message);
    }
  }

  // All models failed, return neutral
  console.log("All sentiment models failed, using neutral fallback");
  return {
    label: "neutral",
    score: 0.5,
    confidence: 0.3,
    source: "fallback",
  };
}

// URL Analysis (no external API needed)
async function analyzeURLs(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];

  if (urls.length === 0) {
    return {
      score: 0,
      suspiciousUrls: [],
      urlCount: 0,
      source: "regex-analysis",
    };
  }

  const suspiciousUrls = [];
  let totalSuspicionScore = 0;

  urls.forEach((url) => {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      const suspicion = checkDomainSuspicion(domain, url);

      if (suspicion.suspicious) {
        suspiciousUrls.push({
          url,
          domain,
          reason: suspicion.reason,
          riskLevel: suspicion.riskLevel,
          score: suspicion.score,
        });
        totalSuspicionScore += suspicion.score;
      }
    } catch (error) {
      // Invalid URL format
      suspiciousUrls.push({
        url,
        reason: "Invalid URL format",
        riskLevel: "medium",
        score: 40,
      });
      totalSuspicionScore += 40;
    }
  });

  return {
    score: Math.min(totalSuspicionScore / urls.length, 100),
    suspiciousUrls,
    urlCount: urls.length,
    cleanUrls: urls.length - suspiciousUrls.length,
    source: "url-analysis",
  };
}

// Helper Functions
function checkDomainSuspicion(domain, fullUrl) {
  const suspiciousPatterns = [
    {
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      reason: "IP address used instead of domain",
      score: 80,
      risk: "high",
    },
    {
      pattern: /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|short\.link|tly\.com/,
      reason: "URL shortener detected",
      score: 45,
      risk: "medium",
    },
    {
      pattern: /\.(tk|ml|ga|cf|pw)$/,
      reason: "Free/suspicious domain extension",
      score: 65,
      risk: "high",
    },
    {
      pattern: /.{40,}/,
      reason: "Extremely long domain (possible spoofing)",
      score: 50,
      risk: "medium",
    },
    {
      pattern: /[0-9-]{10,}/,
      reason: "Many numbers/hyphens in domain",
      score: 35,
      risk: "medium",
    },
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.pattern.test(domain)) {
      return {
        suspicious: true,
        reason: pattern.reason,
        score: pattern.score,
        riskLevel: pattern.risk,
      };
    }
  }

  // Check for suspicious keywords in the full URL
  const suspiciousKeywords =
    /urgent|winner|free|prize|claim|verify|suspended|security|alert|update.*payment|confirm.*identity/i;
  if (suspiciousKeywords.test(fullUrl)) {
    return {
      suspicious: true,
      reason: "Contains suspicious keywords",
      score: 60,
      riskLevel: "high",
    };
  }

  return { suspicious: false, score: 0 };
}

function keywordSpamDetection(text) {
  const spamKeywords = [
    "free money",
    "click here now",
    "urgent action",
    "winner selected",
    "congratulations you won",
    "limited time offer",
    "act immediately",
    "guaranteed income",
    "risk free",
    "no strings attached",
    "cash bonus",
    "work from home",
    "lose weight fast",
    "miracle cure",
  ];

  const lowerText = text.toLowerCase();
  let spamScore = 0;
  let matchedKeywords = [];

  spamKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      spamScore += 0.15;
      matchedKeywords.push(keyword);
    }
  });

  return {
    score: Math.min(spamScore, 1),
    label: spamScore > 0.3 ? "spam" : "ham",
    confidence: 0.7,
    source: "keyword-detection",
    matchedKeywords,
  };
}

function keywordPhishingDetection(text) {
  const phishingKeywords = [
    "verify your account",
    "account suspended",
    "click to verify",
    "update payment information",
    "security alert",
    "unusual activity detected",
    "confirm your identity",
    "account will be locked",
    "immediate action required",
    "update billing",
    "reactivate account",
    "confirm ownership",
  ];

  const lowerText = text.toLowerCase();
  let phishingScore = 0;
  let matchedKeywords = [];

  phishingKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      phishingScore += 0.2;
      matchedKeywords.push(keyword);
    }
  });

  return {
    score: Math.min(phishingScore, 1),
    label: phishingScore > 0.4 ? "phishing" : "safe",
    confidence: 0.75,
    source: "keyword-detection",
    matchedKeywords,
  };
}

function calculateTrustScore(spam, phishing, urls, sentiment) {
  let score = 100;

  // Major risk factors - these should significantly reduce trust
  score -= spam.score * 50; // Spam detection (0-50 point reduction)
  score -= phishing.score * 45; // Phishing/scam detection (0-45 point reduction)
  score -= urls.score * 0.25; // Suspicious URLs (minor factor)

  // Keyword-based additional penalties for obvious scams
  const text = (spam.matchedKeywords || [])
    .concat(phishing.matchedKeywords || [])
    .join(" ");
  const obviousScamPatterns = [
    /winner|won|prize|congratulations/i,
    /free.*iphone|free.*gift|free.*money/i,
    /click.*here.*now|claim.*now|hurry.*offer/i,
    /credit.*card.*details|reply.*with.*details/i,
  ];

  obviousScamPatterns.forEach((pattern) => {
    if (
      pattern.test(text) ||
      (typeof spam.originalText !== "undefined" &&
        pattern.test(spam.originalText))
    ) {
      score -= 15; // Additional penalty for obvious scam language
    }
  });

  // URL-based penalties
  if (urls.suspiciousUrls && urls.suspiciousUrls.length > 0) {
    score -= urls.suspiciousUrls.length * 10; // 10 points per suspicious URL
  }

  // Sentiment adjustments
  if (sentiment.label === "negative" && sentiment.score > 0.7) {
    score -= 8; // Highly negative content penalty
  }

  // Ensure reasonable bounds
  return Math.max(5, Math.min(95, score));
}

// Enhanced scam score calculation
function calculateScamScore(spam, phishing, sentiment) {
  let scamScore = 0;

  // Base scores
  scamScore += spam.score * 45;
  scamScore += phishing.score * 40;

  // Boost for negative sentiment (scams often use fear/urgency)
  if (sentiment.label === "negative") {
    scamScore += 15;
  }

  // Check for keyword combinations that indicate scams
  const spamKeywords = spam.matchedKeywords || [];
  const phishingKeywords = phishing.matchedKeywords || [];
  const allKeywords = [...spamKeywords, ...phishingKeywords];

  // High-risk combinations
  if (
    allKeywords.some((k) => k.includes("winner") || k.includes("won")) &&
    allKeywords.some((k) => k.includes("click") || k.includes("claim"))
  ) {
    scamScore += 20; // Winner + action = likely scam
  }

  return Math.min(scamScore, 100);
}

function calculateMisinfoScore(sentiment, urls) {
  const urlFactor = urls.score * 0.4;
  const sentimentFactor = sentiment.label === "negative" ? 15 : 5;
  return Math.min(urlFactor + sentimentFactor, 100);
}

function calculateOverallConfidence(results) {
  const confidenceValues = results.map((r) => r.confidence || 0.3);
  const avgConfidence =
    confidenceValues.reduce((a, b) => a + b) / confidenceValues.length;
  return avgConfidence * 100;
}

function generateInsights(spam, phishing, urls, sentiment, content) {
  const insights = [];

  if (spam.score > 0.6) {
    insights.push(
      `High spam probability (${Math.round(spam.score * 100)}%) - contains promotional language patterns`
    );
  }

  if (phishing.score > 0.6) {
    insights.push(
      `Potential phishing attempt detected (${Math.round(phishing.score * 100)}%) - uses urgency/security language`
    );
  }

  if (urls.suspiciousUrls && urls.suspiciousUrls.length > 0) {
    insights.push(
      `Found ${urls.suspiciousUrls.length} suspicious URL(s) - exercise caution when clicking`
    );
  }

  if (sentiment.label === "negative" && sentiment.score > 0.8) {
    insights.push(
      "Highly negative sentiment - may use fear-based manipulation tactics"
    );
  }

  if (content.length < 50) {
    insights.push(
      "Very short message - typical characteristic of automated spam"
    );
  }

  if (/[A-Z]{8,}/.test(content)) {
    insights.push("Excessive capitalization detected - common spam indicator");
  }

  if (content.split(/[.!?]/).length > 10 && content.length < 200) {
    insights.push("High punctuation density - possible urgency manipulation");
  }

  if (insights.length === 0) {
    insights.push(
      "Content appears relatively safe based on comprehensive analysis"
    );
  }

  return insights.slice(0, 5); // Limit to 5 insights
}
