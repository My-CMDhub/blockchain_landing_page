"use client"

import Link from "next/link"
import { ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

export function SiteHeader() {
  const { cartItems } = useCart()
  
  const totalItems = cartItems && cartItems.length > 0 
    ? cartItems.reduce((total, item) => item ? total + (item.quantity || 0) : total, 0) 
    : 0
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <Zap className="h-6 w-6 text-teal-400" />
            <div className="absolute -inset-1 rounded-full bg-teal-400/20 blur-sm -z-10"></div>
          </div>
          <span className="text-xl font-bold">CryptoGate</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="ghost" className="text-sm">
              Products
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative border-white/10 hover:bg-white/5">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-400 text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 