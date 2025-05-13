"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

export function StripePaymentForm() {
  const router = useRouter()
  const { getCartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    
    // Basic formatting for card number (spaces every 4 digits)
    if (id === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      setCardDetails({ ...cardDetails, [id]: formatted })
      return
    }
    
    // Basic formatting for expiry (add slash after month)
    if (id === 'expiry' && value.length === 2 && cardDetails.expiry.length === 1) {
      setCardDetails({ ...cardDetails, [id]: value + '/' })
      return
    }
    
    setCardDetails({ ...cardDetails, [id]: value })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // In a real app, we would process the payment with Stripe API here
    setTimeout(() => {
      // Simulate payment processing
      setLoading(false)
      clearCart()
      router.push('/payment/confirmation')
    }, 1500)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
          value={cardDetails.cardNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="expiry">Expiry Date</label>
          <input
            id="expiry"
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            type="text"
            placeholder="123"
            maxLength={3}
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">Cardholder Name</label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
          value={cardDetails.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      {error && (
        <div className="text-sm text-red-400">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Secure Connection</span>
        </div>
        
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 border-none"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)} USD`}
        </Button>
      </div>
    </form>
  )
} 