"use client"

import { QRCodeSVG } from 'qrcode.react'

interface QRCodeGeneratorProps {
  value: string
  size?: number
  className?: string
}

export function QRCodeGenerator({ value, size = 128, className }: QRCodeGeneratorProps) {
  return (
    <div className={`bg-white p-2 rounded-lg ${className || ''}`}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="L"
        includeMargin={false}
      />
    </div>
  )
} 