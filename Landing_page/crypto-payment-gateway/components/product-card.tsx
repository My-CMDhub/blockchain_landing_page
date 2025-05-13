"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FallbackImage } from "@/components/fallback-image"
import { useCart } from "./cart-context"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

interface ProductCardProps {
  productId: string
}

export function ProductCard({ productId }: ProductCardProps) {
  const { products, addToCart } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const product = products.find(p => p.id === productId)
  
  if (!product) return null
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigating to product page when clicking the button
    e.stopPropagation() // Prevent event bubbling
    
    setIsAddingToCart(true)
    
    try {
      addToCart(product)
      toast.success("Added to cart")
    } catch (error) {
      console.error("Failed to add product to cart:", error)
      toast.error("Failed to add product to cart")
    } finally {
      setTimeout(() => setIsAddingToCart(false), 300)
    }
  }
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/30 transition-all hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl"></div>
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative aspect-square overflow-hidden p-4">
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-teal-400/80 text-black hover:bg-teal-400">
            {product.category}
          </Badge>
        </div>
        
        <Link href={`/products/${product.id}`}>
          <FallbackImage
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 z-0 transition-transform group-hover:scale-105"
            fallbackSrc="https://placehold.co/600x600/1e293b/e2e8f0?text=Product+Image"
          />
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/products/${product.id}`} className="group-hover:text-teal-400 transition-colors">
          <h3 className="font-medium mb-2">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              ≈ {product.ethPrice.toFixed(8)} ETH
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-9 w-9 rounded-full ${
              isAddingToCart 
                ? 'bg-teal-400/20 text-teal-300' 
                : 'text-teal-400 hover:bg-teal-400/20 hover:text-teal-300'
            }`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className={`h-5 w-5 ${isAddingToCart ? 'animate-pulse' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  )
} 