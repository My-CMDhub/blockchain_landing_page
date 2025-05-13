"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { toast } from "sonner"
import { getStripe } from "@/lib/stripe-client"

export function StripePaymentForm() {
  const router = useRouter()
  const { getCartTotal, cartItems } = useCart()
  const [loading, setLoading] = useState(false)
  const [stripeReady, setStripeReady] = useState(false)
  
  useEffect(() => {
    // Check if the Stripe publishable key is available
    // We check simply if we can load the Stripe instance
    const checkStripe = async () => {
      const stripePromise = await getStripe();
      setStripeReady(!!stripePromise);
    };
    
    checkStripe();
  }, [])
  
  const handleStripePayment = async () => {
    setLoading(true)
    
    try {
      // Create a checkout session on the server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            description: item.product.description,
          })),
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Invalid response' }))
        throw new Error(errorData.error || 'Network response was not ok')
      }
      
      const session = await response.json()
      console.log("Checkout session created:", session.id);
      
      // Get Stripe instance
      const stripePromise = getStripe()
      if (!stripePromise) {
        throw new Error('Failed to initialize Stripe')
      }
      
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Failed to load Stripe')
      }
      
      console.log("Redirecting to Stripe checkout...");
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })
      
      if (error) {
        console.error("Stripe redirect error:", error);
        toast.error(error.message || "Payment failed. Please try again.")
        setLoading(false)
      }
      
    } catch (error: any) {
      console.error('Error creating checkout session:', error)
      toast.error(error.message || "Payment failed. Please try again.")
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-5 w-5 text-teal-400" />
          <p className="font-medium">Secure payment powered by Stripe</p>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          You will be redirected to Stripe's secure payment page to complete your purchase.
          After payment, you'll be returned to our site.
        </p>
        
        {!stripeReady && (
          <div className="bg-red-500/20 border border-red-500/50 rounded p-3 mb-4 text-sm">
            <p className="font-medium mb-1">Stripe configuration missing</p>
            <p>The Stripe publishable key is not set. Please check your environment variables.</p>
          </div>
        )}
        
        <Button 
          onClick={handleStripePayment} 
          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 border-none py-6 text-base font-medium"
          disabled={loading || !stripeReady}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Redirecting to Stripe...
            </>
          ) : (
            `Pay $${getCartTotal().toFixed(2)} with Stripe`
          )}
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Payments are secure and encrypted</span>
      </div>
      
      <div className="text-center text-xs text-muted-foreground">
        <p>This is a demo. No actual payment will be processed.</p>
        <p>You can use Stripe test card: 4242 4242 4242 4242</p>
        <p>Any future date, any 3 digits for CVC, and any postal code.</p>
      </div>
    </div>
  )
} 