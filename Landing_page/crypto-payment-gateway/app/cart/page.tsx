"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-context"
import { CartItem } from "@/components/cart-item"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CartPage() {
  const { cartItems, getCartTotal, isCartLoaded } = useCart()
  
  const cartTotal = getCartTotal()
  
  // Add safety check for cartItems
  const totalItems = cartItems && cartItems.length > 0
    ? cartItems.reduce((total, item) => item ? total + (item.quantity || 0) : total, 0)
    : 0
  
  // Show loading state if cart isn't loaded yet
  if (!isCartLoaded) {
    return (
      <div className="flex min-h-screen flex-col bg-grid-pattern">
        <SiteHeader />
        
        <main className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 mx-auto animate-spin text-teal-400 mb-4" />
            <p>Loading your cart...</p>
          </div>
        </main>
        
        <SiteFooter />
      </div>
    )
  }
  
  const isEmpty = !cartItems || cartItems.length === 0
  
  if (isEmpty) {
    return (
      <div className="flex min-h-screen flex-col bg-grid-pattern">
        <SiteHeader />
        
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <Link href="/products" className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 rounded-full bg-black/30 p-6 border border-white/10">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-6 max-w-md">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 border-none">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <SiteFooter />
      </div>
    )
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Link href="/products" className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                item && item.product ? 
                <CartItem key={item.product.id} itemId={item.product.id} /> : 
                null
              ))}
            </div>
            
            <div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 shadow-lg">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="font-bold">${cartTotal.toFixed(2)} AUD</span>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="flex justify-between items-end">
                    <span className="text-muted-foreground">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                        ${cartTotal.toFixed(2)} AUD
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/payment">
                    <Button className="w-full mt-4 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 border-none group">
                      Secure Payment
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
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