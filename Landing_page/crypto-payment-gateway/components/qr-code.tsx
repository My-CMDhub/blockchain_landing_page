"use client"

import React from "react"
import QRCode from "qrcode.react"

interface QRCodeComponentProps {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
  level?: "L" | "M" | "Q" | "H"
  className?: string
}

export function QRCodeComponent({
  value,
  size = 175,
  bgColor = "#1e293b",
  fgColor = "#e2e8f0",
  level = "H",
  className,
}: QRCodeComponentProps) {
  return (
    <div className={`qr-code-container ${className} p-3 bg-black/20 rounded-lg border border-white/10`}>
      <QRCode
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        includeMargin={true}
        renderAs="svg"
      />
    </div>
  )
} 