"use client"

import React from "react"

type CryptoType = "ETH" | "BNB" | "MATIC" | "BTC" | "USDT"

interface CryptoIconProps {
  type: CryptoType
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function CryptoIcon({ type, size = "md", className = "" }: CryptoIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }
  
  const containerClasses = `flex items-center justify-center rounded-full ${sizeClasses[size]} ${className}`
  
  // Different styles for different coins
  const getIconStyles = (type: CryptoType) => {
    switch (type) {
      case "ETH":
        return {
          container: "bg-blue-500/10",
          icon: "text-blue-400",
          svg: (
            <svg className={`${sizeClasses[size]} text-blue-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V12L12 16L20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12V18L12 22L20 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L19.2 7.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.8 7.2L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      case "BNB":
        return {
          container: "bg-amber-500/10",
          icon: "text-amber-400",
          svg: (
            <svg className={`${sizeClasses[size]} text-amber-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 10L9 8L11 6L13 8L15 6L17 8L15 10L17 12L15 14L13 12L11 14L9 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      case "MATIC":
        return {
          container: "bg-purple-500/10",
          icon: "text-purple-400",
          svg: (
            <svg className={`${sizeClasses[size]} text-purple-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L17 7H7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22L7 17H17L12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L7 7V17L2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 12L17 17V7L22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 7L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      case "BTC":
        return {
          container: "bg-amber-500/10",
          icon: "text-amber-400",
          svg: (
            <svg className={`${sizeClasses[size]} text-amber-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.5 8H14.5C15.3284 8 16 8.67157 16 9.5C16 10.3284 15.3284 11 14.5 11H9.5V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.5 11H15C15.8284 11 16.5 11.6716 16.5 12.5C16.5 13.3284 15.8284 14 15 14H9.5V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      case "USDT":
        return {
          container: "bg-green-500/10",
          icon: "text-green-400",
          svg: (
            <svg className={`${sizeClasses[size]} text-green-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      default:
        return {
          container: "bg-blue-500/10",
          icon: "text-blue-400",
          svg: (
            <svg className={`${sizeClasses[size]} text-blue-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
    }
  }

  const styles = getIconStyles(type)

  return (
    <div className={`${containerClasses} ${styles.container}`}>
      {styles.svg}
    </div>
  )
} 