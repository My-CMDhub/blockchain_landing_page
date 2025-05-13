"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  min?: number
  max?: number
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-md border border-white/10 hover:bg-white/5"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <span className="w-8 text-center font-medium">
        {quantity}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-md border border-white/10 hover:bg-white/5"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
} 