"use client"

import { useState } from "react"

interface PlaygroundInfo {
  expiresAt: string | null
  editUrl: string
  claimUrl: string | null
}

interface EnvVar {
  isValid: boolean
  name: string
  label: string
}

interface PlaygroundSetupModalProps {
  playgroundInfo: PlaygroundInfo
  envs: Record<string, EnvVar>
}

export function PlaygroundSetupModal({ playgroundInfo, envs }: PlaygroundSetupModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Don't show the modal - this is a demo app
  return null
}
