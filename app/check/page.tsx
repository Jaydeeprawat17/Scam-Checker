"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Copy,
  Download,
  Share2,
  Zap,
  Brain,
  Target,
  ArrowLeft,
} from "lucide-react";
import { NextJSBackground } from "@/components/background-effects";
import Link from "next/link";

interface AnalysisResult {
  trustScore: number;
  riskLevel: "low" | "medium" | "high";
  categories: {
    scam: number;
    misinformation: number;
    phishing: number;
    spam: number;
  };
  insights: string[];
  processingTime: number;
  confidence: number;
  modelVersion: string;
}

interface LiveStats {
  totalAnalyses: number;
  activeUsers: number;
  averageScore: number;
  threatsBlocked: number;
}

export default function CheckPage() {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalAnalyses: 1247892,
    activeUsers: 3421,
    averageScore: 87.3,
    threatsBlocked: 234567,
  });

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        totalAnalyses: prev.totalAnalyses + Math.floor(Math.random() * 3),
        activeUsers: Math.max(
          1,
          prev.activeUsers + Math.floor(Math.random() * 5) - 2
        ),
        averageScore: Math.max(
          0,
          Math.min(100, prev.averageScore + (Math.random() - 0.5) * 2)
        ),
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const analyzeContent = async () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const startTime = Date.now();

      const response = await fetch("/api/analyze-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const analysisResult = await response.json();

      // Add actual processing time
      analysisResult.processingTime = (Date.now() - startTime) / 1000;

      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis failed:", error);

      // Show error state to user
      setResult({
        trustScore: 50,
        riskLevel: "low",
        categories: {
          scam: 0,
          misinformation: 0,
          phishing: 0,
          spam: 0,
        },
        insights: ["Unable to analyze content at this time"],
        processingTime: 0,
        confidence: 0,
        modelVersion: "Error-v1.0.0",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Optional: Add a function to get detailed analysis
  // const getDetailedAnalysis = async (content:any) => {
  //   try {
  //     const response = await fetch("/api/analyze-content", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         content: content.trim(),
  //         includeDetails: true, // Request detailed analysis
  //       }),
  //     });

  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error("Detailed analysis failed:", error);
  //     throw error;
  //   }
  // };

  const copyReport = () => {
    if (!result) return;
    const report = `RealityCheck Analysis Report
Trust Score: ${result.trustScore}%
Risk Level: ${result.riskLevel.toUpperCase()}
Confidence: ${result.confidence}%
Processing Time: ${result.processingTime.toFixed(2)}s
Model: ${result.modelVersion}`;
    navigator.clipboard.writeText(report);
  };

  const exportResults = () => {
    if (!result) return;
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "realitycheck-analysis.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/20 dark:border-green-800/30";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/20 dark:border-yellow-800/30";
      case "high":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/20 dark:border-red-800/30";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-950/20 dark:border-gray-800/30";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4" />;
      case "high":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <NextJSBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="glass-modern">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
              AI Content Analysis
            </h1>
            <p className="text-muted-foreground">
              Advanced misinformation detection powered by AI
            </p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* Live Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <Card className="glass-modern border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {liveStats.totalAnalyses.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Analyses
              </div>
            </CardContent>
          </Card>

          <Card className="glass-modern border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 dark:bg-green-500/20 rounded-xl mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {liveStats.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>

          <Card className="glass-modern border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {liveStats.averageScore.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </CardContent>
          </Card>

          <Card className="glass-modern border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-xl mx-auto mb-3">
                <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {liveStats.threatsBlocked.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Threats Blocked
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="glass-modern border animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="w-5 h-5" />
                Content Analysis
              </CardTitle>
              <CardDescription>
                Paste suspicious messages, emails, or social media posts for AI
                analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Textarea
                  placeholder="Example: 'URGENT! You've won $50,000! Click here immediately to claim your prize before it expires in 24 hours!'

Or paste any:
• WhatsApp forwards
• Social media posts  
• News articles
• Email messages
• Investment offers"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-none bg-background/50 border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {content.length} characters •{" "}
                    {content.split(/\s+/).filter(Boolean).length} words
                  </span>
                  <span>
                    Est. processing: ~
                    {Math.max(1, Math.ceil(content.length / 500))}s
                  </span>
                </div>
              </div>

              <Button
                onClick={analyzeContent}
                disabled={!content.trim() || isAnalyzing}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="glass-modern border animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered threat detection and content verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground mb-4">
                      Analyzing content with AI...
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-foreground">
                        <span>Processing...</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Trust Score */}
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-3 text-foreground">
                      {result.trustScore}%
                    </div>
                    <Badge
                      className={`${getRiskColor(result.riskLevel)} border text-sm px-3 py-1`}
                    >
                      {getRiskIcon(result.riskLevel)}
                      <span className="ml-2 capitalize">
                        {result.riskLevel} Risk
                      </span>
                    </Badge>
                    <div className="mt-4">
                      <Progress value={result.trustScore} className="h-3" />
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">
                      Risk Categories
                    </h4>
                    {Object.entries(result.categories).map(
                      ([category, score]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-muted-foreground">
                              {category}
                            </span>
                            <span className="text-foreground font-medium">
                              {score}%
                            </span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    )}
                  </div>

                  {/* AI Insights */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">
                      AI Insights
                    </h4>
                    <ul className="space-y-3">
                      {result.insights.map((insight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">
                            {insight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {result.confidence}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Confidence
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {result.processingTime.toFixed(2)}s
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Processing Time
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-muted-foreground">
                    Model: {result.modelVersion}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyReport}
                      className="flex-1 glass-modern border-border/50 bg-transparent"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Report
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportResults}
                      className="flex-1 glass-modern border-border/50 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 glass-modern border-border/50 bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              )}

              {!result && !isAnalyzing && (
                <div className="text-center py-16 text-muted-foreground">
                  <Shield className="w-20 h-20 mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Ready for Analysis
                  </h3>
                  <p>
                    Enter content above to get started with AI-powered analysis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
