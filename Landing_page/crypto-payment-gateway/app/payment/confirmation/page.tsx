"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

// Create a client component that uses useSearchParams
function ConfirmationContent() {
  const { selectedCrypto, clearCart } = useCart()
  const [orderDate, setOrderDate] = useState("")
  const [transactionHash, setTransactionHash] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [stripeTransactionId, setStripeTransactionId] = useState("")
  const searchParams = useSearchParams()
  
  // Generate mock transaction hash and set payment method
  useEffect(() => {
    const hash = "0x" + Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')
    
    setTransactionHash(hash)
    
    // Check if payment was made with Stripe
    const method = searchParams.get('method')
    setPaymentMethod(method === 'stripe' ? 'stripe' : selectedCrypto || 'ETH')
    
    // Check if we have a session ID from Stripe
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      setStripeTransactionId(sessionId)
      console.log("Stripe session ID:", sessionId)
    } else {
      // Generate a mock Stripe transaction ID
      const stripeId = "ch_" + Math.random().toString(36).substring(2, 10) + 
                      Math.random().toString(36).substring(2, 10)
      setStripeTransactionId(stripeId)
    }
    
    // Set current date and time
    const now = new Date()
    setOrderDate(now.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }))
    
    // Handle return from Stripe checkout
    const stripeSuccess = searchParams.get('stripe_success')
    if (stripeSuccess === 'true') {
      // Clear the cart on successful payment
      clearCart()
      toast.success("Payment completed successfully!")
    }
    
  }, [searchParams, selectedCrypto, clearCart])
  
  // Get explorer URL based on selected crypto
  const getExplorerUrl = () => {
    switch(selectedCrypto) {
      case 'ETH':
        return `https://sepolia.etherscan.io/tx/${transactionHash}`
      case 'MATIC':
        return `https://mumbai.polygonscan.com/tx/${transactionHash}`
      case 'BNB':
        return `https://testnet.bscscan.com/tx/${transactionHash}`
      default:
        return `https://sepolia.etherscan.io/tx/${transactionHash}`
    }
  }
  
  // Get payment method name
  const getPaymentMethodName = () => {
    if (paymentMethod === 'stripe') {
      return "Credit Card (Stripe)"
    }
    
    switch(paymentMethod) {
      case 'ETH':
        return "Ethereum (ETH)"
      case 'MATIC':
        return "Polygon (MATIC)"
      case 'BNB':
        return "Binance Coin (BNB)"
      default:
        return "Cryptocurrency"
    }
  }
  
  // Get payment method icon
  const renderPaymentMethodIcon = () => {
    if (paymentMethod === 'stripe') {
      return (
        <svg className="h-4 w-4 mr-1 text-teal-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 9V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V9C20 8.44772 19.5523 8 19 8H5C4.44772 8 4 8.44772 4 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 11H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
    
    return (
      <svg className="h-4 w-4 mr-1 text-teal-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6V12L12 16L20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12V18L12 22L20 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12L19.2 7.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.8 7.2L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  
  return (
    <>
      <div className="mb-12 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500">
          <CheckCircle className="h-10 w-10 text-black" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground max-w-md">
          Your payment has been processed successfully. Thank you for your purchase.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 shadow-lg mb-8">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="mb-6 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <span className="text-sm text-muted-foreground">Order ID: ORD-MALQYH7A</span>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-md bg-black/30 border border-white/10 flex items-center justify-center">
                  <svg className="h-8 w-8 text-teal-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Purchase Completed</h3>
                  <p className="text-sm text-muted-foreground">All items in your cart</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">$19.99 USD</div>
                <div className="text-xs text-muted-foreground">Order complete</div>
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$19.99 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>$0.00 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>$0.00 USD</span>
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div className="flex justify-between">
              <span className="text-lg font-medium">Total</span>
              <div className="text-right">
                <div className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  $19.99 USD
                </div>
                <div className="text-xs text-muted-foreground">Paid with {getPaymentMethodName()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 shadow-lg mb-8">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <div className="flex items-center">
              {renderPaymentMethodIcon()}
              <span>{getPaymentMethodName()}</span>
            </div>
          </div>
          
          {paymentMethod !== 'stripe' && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Hash</span>
              <Link href={getExplorerUrl()} target="_blank" className="flex items-center text-teal-400 hover:underline">
                <span className="font-mono text-xs">{`${transactionHash.substring(0, 6)}...${transactionHash.substring(62)}`}</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          )}
          
          {paymentMethod === 'stripe' && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-xs">{stripeTransactionId}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date & Time</span>
            <span>{orderDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
              <span className="text-teal-400 font-medium">Confirmed</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-teal-400/10 border border-teal-400/20 rounded-xl p-5 mb-8 text-center">
        <h3 className="font-medium text-teal-400 mb-2">What's Next?</h3>
        <p className="text-sm max-w-lg mx-auto">
          A confirmation email has been sent to your email address with details of your purchase. 
          You will be notified when your order ships.
        </p>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Link href="/">
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/products">
          <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 border-none">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </>
  )
}

// Create a loading component for the suspense fallback
function ConfirmationLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-teal-400 border-t-transparent mb-4"></div>
      <h2 className="text-xl font-medium">Processing your payment...</h2>
      <p className="text-muted-foreground">Please wait while we confirm your transaction.</p>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Suspense fallback={<ConfirmationLoading />}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
} 