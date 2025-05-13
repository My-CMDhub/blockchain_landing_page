"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  minutes: number
  onExpire?: () => void
}

export function CountdownTimer({ minutes, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval)
          onExpire?.()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [onExpire])
  
  const minutesLeft = Math.floor(timeLeft / 60)
  const secondsLeft = timeLeft % 60
  
  const formattedTime = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
  
  return (
    <div className="flex items-center gap-1">
      <span className={`font-medium text-xl ${timeLeft < 60 ? 'text-red-400' : ''}`}>
        {formattedTime}
      </span>
      <span className="text-xs text-muted-foreground">Time remaining</span>
    </div>
  )
} 