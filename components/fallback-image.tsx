"use client"

import { useState } from "react"
import Image from "next/image"

interface FallbackImageProps {
  src: string
  alt: string
  fallbackSrc: string
  fill?: boolean
  className?: string
  width?: number
  height?: number
}

export function FallbackImage({
  src,
  alt,
  fallbackSrc,
  fill = false,
  className = "",
  width,
  height
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)
  
  const handleError = () => {
    if (!error) {
      setError(true)
      setImgSrc(fallbackSrc)
      console.log(`Image failed to load: ${src}, using fallback`)
    }
  }
  
  // Add unoptimized for external URLs without domains configured in next.config.js
  const isExternalUrl = imgSrc.startsWith('http') || imgSrc.startsWith('//')
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      onError={handleError}
      unoptimized={isExternalUrl}
      loading="eager"
      priority={true}
    />
  )
} 