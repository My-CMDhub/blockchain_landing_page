"use client"

import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "@/components/fallback-image"
import { QuantitySelector } from "./quantity-selector"
import { useCart } from "./cart-context"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

interface CartItemProps {
  itemId: string
}

export function CartItem({ itemId }: CartItemProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  
  if (!cartItems || cartItems.length === 0) return null
  
  const item = cartItems.find(item => item && item.product && item.product.id === itemId)
  
  if (!item || !item.product) return null
  
  const { product, quantity } = item
  
  const handleUpdateQuantity = (newQuantity: number) => {
    setIsUpdating(true)
    
    try {
      updateQuantity(product.id, newQuantity)
      if (newQuantity === 0) {
        toast.success("Item removed from cart")
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast.error("Failed to update quantity")
    } finally {
      setTimeout(() => setIsUpdating(false), 300)
    }
  }
  
  const handleRemoveFromCart = () => {
    setIsRemoving(true)
    
    try {
      removeFromCart(product.id)
      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Error removing item:", error)
      toast.error("Failed to remove item")
      setIsRemoving(false)
    }
  }
  
  if (isRemoving) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 shadow-lg animate-fade-out">
        <div className="flex items-center justify-center h-20">
          <Loader2 className="h-6 w-6 text-teal-400 animate-spin" />
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 shadow-lg">
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10 bg-black/50">
          <FallbackImage 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-contain p-2"
            fallbackSrc="https://placehold.co/200x200/1e293b/e2e8f0?text=Product"
          />
        </div>
        
        <div className="flex-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-medium hover:text-teal-400 transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            ${(product.price * quantity).toFixed(2)}
          </div>
          
          {isUpdating ? (
            <div className="h-8 w-24 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-teal-400" />
            </div>
          ) : (
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => handleUpdateQuantity(quantity + 1)}
              onDecrease={() => handleUpdateQuantity(quantity - 1)}
            />
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-red-400 hover:bg-white/5"
          onClick={handleRemoveFromCart}
          disabled={isRemoving || isUpdating}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 