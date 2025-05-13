"use client"

import Link from "next/link"
import { ArrowLeft, ShoppingCart, Shield, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FallbackImage } from "@/components/fallback-image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"
import { useParams, useRouter } from "next/navigation"
import { QuantitySelector } from "@/components/quantity-selector"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function SingleProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = typeof params?.id === 'string' ? params.id : ''
  
  const { products, addToCart, cartItems, isCartLoaded } = useCart()
  const product = products.find(p => p.id === productId)
  
  const [quantity, setQuantity] = useState(1)
  const [isInCart, setIsInCart] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  // Safely check if the product is in the cart
  useEffect(() => {
    if (isCartLoaded && cartItems && cartItems.length > 0) {
      const found = cartItems.some(item => 
        item && item.product && item.product.id === productId
      )
      setIsInCart(found)
    }
  }, [cartItems, productId, isCartLoaded])
  
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-grid-pattern">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  const handleAddToCart = () => {
    if (!product) return
    
    setIsAddingToCart(true)
    
    try {
      // Add the product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      
      // Show success toast
      toast.success(
        isInCart 
          ? "Cart updated successfully" 
          : "Added to cart successfully",
        { duration: 2000 }
      )
      
      // Navigate to cart
      setTimeout(() => {
        router.push("/cart")
      }, 500)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add product to cart")
    } finally {
      setIsAddingToCart(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Link href="/products" className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl"></div>
              <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
              <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
              
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-teal-400/80 text-black hover:bg-teal-400">{product.category}</Badge>
              </div>
              
              <FallbackImage
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-12 z-0"
                fallbackSrc="https://placehold.co/600x600/1e293b/e2e8f0?text=Product+Image"
              />
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">${product.price.toFixed(2)} USD</span>
                  <span className="text-sm text-muted-foreground">≈ {product.ethPrice.toFixed(8)} ETH</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {product.description}
                </p>

                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity(prev => prev + 1)}
                    onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                  />
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 border-none"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !isCartLoaded}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {isInCart ? 'Update Cart' : 'Add to Cart'}
                    </>
                  )}
                </Button>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure crypto payment available at checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
} 