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
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
} 