"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"

export default function ProductsPage() {
  const { products } = useCart()
  
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Shop Products</h1>
            <p className="text-muted-foreground">Browse our selection of products - securely checkout with cryptocurrency.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} productId={product.id} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
} 