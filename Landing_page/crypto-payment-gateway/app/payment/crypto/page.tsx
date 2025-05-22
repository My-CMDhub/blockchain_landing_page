"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, ExternalLink, Info, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"
import { useState, useEffect } from "react"
import { CountdownTimer } from "@/components/countdown-timer"
import { EthereumIcon, PolygonIcon, BinanceIcon } from "@/components/crypto-icons"

// Define the crypto types for type safety
type CryptoType = 'ETH' | 'MATIC' | 'BNB'

export default function CryptoPaymentPage() {
  const router = useRouter()
  const { selectedCrypto, getCartTotal, clearCart } = useCart()
  const [paymentAddress, setPaymentAddress] = useState("")
  const [paymentGenerated, setPaymentGenerated] = useState(false)
  
  const cartTotal = getCartTotal()
  
  // Mock addresses for different cryptocurrencies
  const cryptoAddresses: Record<CryptoType, string> = {
    ETH: "0x4c41514075ae8829E0066510bb59a9A786fB2e34",
    MATIC: "0x7F9A82C32B828d8Dc131e9c783F873CEe9e9069d",
    BNB: "0x8c2f9F9813Cd94Bbd843e6aE8c659A6F8eCd970A"
  }
  
  // Mock prices for different cryptocurrencies
  const cryptoPrices: Record<CryptoType, number> = {
    ETH: 3917.39,
    MATIC: 0.40,
    BNB: 1036.47
  }
  
  // Networks for different cryptocurrencies
  const cryptoNetworks: Record<CryptoType, string> = {
    ETH: "Sepolia Test Network",
    MATIC: "Mumbai Test Network",
    BNB: "BSC Test Network"
  }
  
  // Faucet URLs for different cryptocurrencies
  const cryptoFaucets: Record<CryptoType, string> = {
    ETH: "https://sepoliafaucet.com/",
    MATIC: "https://mumbaifaucet.com/",
    BNB: "https://testnet.bnbchain.org/faucet-smart"
  }
  
  useEffect(() => {
    // If no crypto is selected, redirect to payment method selection
    if (!selectedCrypto) {
      router.push("/payment")
      return
    }
    
    // Simulate generating a payment address
    const timer = setTimeout(() => {
      // Type assertion since we've validated selectedCrypto is not null above
      const crypto = selectedCrypto as CryptoType
      setPaymentAddress(cryptoAddresses[crypto])
      setPaymentGenerated(true)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [selectedCrypto, router])
  
  // Get crypto amount to pay
  const getCryptoAmount = () => {
    if (!selectedCrypto) return "0"
    // Type assertion since we check for null above
    const crypto = selectedCrypto as CryptoType
    const price = cryptoPrices[crypto]
    return (cartTotal / price).toFixed(crypto === 'MATIC' ? 2 : 8)
  }
  
  // Generate crypto icon based on selected crypto
  const CryptoIcon = () => {
    switch (selectedCrypto) {
      case 'ETH':
        return <EthereumIcon className="h-7 w-7 text-blue-400" />
      case 'MATIC':
        return <PolygonIcon className="h-7 w-7 text-purple-400" />
      case 'BNB':
        return <BinanceIcon className="h-7 w-7 text-amber-400" />
      default:
        return <EthereumIcon className="h-7 w-7 text-blue-400" />
    }
  }
  
  // Simulate payment completion
  const handleCompleteDemoPayment = () => {
    clearCart()
    router.push("/payment/confirmation")
  }

  // Default to ETH if no crypto is selected
  const activeCrypto = selectedCrypto as CryptoType || 'ETH'
  
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Link href="/payment" className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Payment Methods
          </Link>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Cryptocurrency Payment</h1>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  activeCrypto === 'MATIC' 
                    ? 'bg-purple-400/20 text-purple-400' 
                    : activeCrypto === 'BNB' 
                      ? 'bg-amber-400/20 text-amber-400' 
                      : 'bg-teal-400/20 text-teal-400'
                }`}>
                  {activeCrypto}
                </span>
              </div>
              <p className="text-muted-foreground">Order ID: ORD-MALQYH7A</p>
            </div>
            <div className="text-right">
              <CountdownTimer minutes={30} onExpire={() => router.push("/payment")} />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 shadow-lg">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <div className="mb-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-mono font-bold">{getCryptoAmount()} {activeCrypto}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AUD Value:</span>
                    <span className="font-mono font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="bg-white/10 mb-6" />
                
                <div className="mb-6 space-y-4">
                  <div className="text-center">
                    <div className="text-sm font-medium mb-2">Scan QR Code or Copy Address</div>
                    <div className="mx-auto w-44 h-44 relative mb-4 flex items-center justify-center">
                      {paymentGenerated ? (
                        <QRCodeGenerator 
                          value={paymentAddress}
                          size={175}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="animate-spin w-8 h-8 border-2 border-teal-400 rounded-full border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm font-medium mb-1">Payment Address:</div>
                    <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg border border-white/10">
                      <div className="font-mono text-xs overflow-hidden overflow-ellipsis flex-1">
                        {paymentGenerated ? paymentAddress : "Generating address..."}
                      </div>
                      {paymentGenerated && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-teal-400 hover:text-teal-300 hover:bg-white/5"
                          onClick={() => navigator.clipboard.writeText(paymentAddress)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Payment Instructions</h3>
                <div className="space-y-4">
                  <Alert className="border border-white/10 bg-black/30">
                    <Info className="h-4 w-4 text-teal-400" />
                    <AlertDescription className="text-sm ml-2">
                      Please send exactly {getCryptoAmount()} {activeCrypto}. Sending a different amount may result in payment processing issues.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border border-white/10 bg-black/30">
                    <Info className="h-4 w-4 text-teal-400" />
                    <AlertDescription className="text-sm ml-2">
                      The payment address will expire in 30 minutes. Please complete the payment before the countdown timer reaches zero.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border border-white/10 bg-black/30">
                    <ShieldCheck className="h-4 w-4 text-teal-400" />
                    <AlertDescription className="text-sm ml-2">
                      Make sure you're sending the payment on the <span className="font-medium text-teal-400">{cryptoNetworks[activeCrypto]}</span>. Transactions on other networks will not be detected.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border border-white/10 bg-black/30">
                    <Info className="h-4 w-4 text-teal-400" />
                    <AlertDescription className="text-sm ml-2">
                      Double-check the payment address before sending. Cryptocurrency transactions cannot be reversed once confirmed.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6 shadow-lg">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
                <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <h3 className="text-lg font-medium mb-6">How to Pay with {activeCrypto}</h3>
                
                <ol className="space-y-8">
                  <li className="flex gap-4">
                    <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-teal-400/20 text-teal-400 font-medium">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Open your cryptocurrency wallet (e.g., MetaMask) and ensure you're connected to the {cryptoNetworks[activeCrypto]}.</h4>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-teal-400/20 text-teal-400 font-medium">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Copy the payment address or scan the QR code with your wallet app.</h4>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-teal-400/20 text-teal-400 font-medium">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Enter exactly {getCryptoAmount()} {activeCrypto} and confirm the transaction in your wallet.</h4>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-teal-400/20 text-teal-400 font-medium">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Wait for the transaction to be confirmed. The status will update automatically once payment is detected.</h4>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className={`${
                activeCrypto === 'MATIC' 
                  ? 'bg-purple-400/10 border-purple-400/20' 
                  : activeCrypto === 'BNB' 
                    ? 'bg-amber-400/10 border-amber-400/20' 
                    : 'bg-amber-400/10 border-amber-400/20'
              } border rounded-xl p-4`}>
                <div className="flex items-center gap-2">
                  <div className={`flex-none flex items-center justify-center w-8 h-8 rounded-full ${
                    activeCrypto === 'MATIC' 
                      ? 'bg-purple-400/20 text-purple-400' 
                      : activeCrypto === 'BNB' 
                        ? 'bg-amber-400/20 text-amber-400' 
                        : 'bg-amber-400/20 text-amber-400'
                  }`}>
                    <Info className="h-4 w-4" />
                  </div>
                  <h3 className={`font-medium ${
                    activeCrypto === 'MATIC' 
                      ? 'text-purple-400' 
                      : activeCrypto === 'BNB' 
                        ? 'text-amber-400' 
                        : 'text-amber-400'
                  }`}>Need Test {activeCrypto}?</h3>
                </div>
                <p className="mt-2 text-sm pl-10">
                  This is a test environment using the {cryptoNetworks[activeCrypto]}. You can get test {activeCrypto} from the 
                  <Link href={cryptoFaucets[activeCrypto]} target="_blank" className={`${
                    activeCrypto === 'MATIC' 
                      ? 'text-purple-400' 
                      : activeCrypto === 'BNB' 
                        ? 'text-amber-400' 
                        : 'text-amber-400'
                  } hover:underline mx-1`}>
                    {activeCrypto} Faucet
                    <ExternalLink className="inline h-3 w-3 ml-0.5" />
                  </Link>.
                </p>
              </div>
              
              <div className={`${
                activeCrypto === 'MATIC' 
                  ? 'bg-purple-400/10 border-purple-400/20' 
                  : activeCrypto === 'BNB' 
                    ? 'bg-amber-400/10 border-amber-400/20' 
                    : 'bg-teal-400/10 border-teal-400/20'
              } border rounded-xl p-4`}>
                <div className="flex items-start gap-2">
                  <div className={`flex-none flex items-center justify-center w-8 h-8 mt-1 rounded-full ${
                    activeCrypto === 'MATIC' 
                      ? 'bg-purple-400/20 text-purple-400' 
                      : activeCrypto === 'BNB' 
                        ? 'bg-amber-400/20 text-amber-400' 
                        : 'bg-teal-400/20 text-teal-400'
                  } animate-pulse`}>
                    <div className={`h-2 w-2 rounded-full ${
                      activeCrypto === 'MATIC' 
                        ? 'bg-purple-400' 
                        : activeCrypto === 'BNB' 
                          ? 'bg-amber-400' 
                          : 'bg-teal-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      activeCrypto === 'MATIC' 
                        ? 'text-purple-400' 
                        : activeCrypto === 'BNB' 
                          ? 'text-amber-400' 
                          : 'text-teal-400'
                    }`}>
                      {paymentGenerated 
                        ? 'Waiting for Payment...' 
                        : 'Generating Payment Address...'}
                    </h3>
                    <p className="mt-1 text-sm">
                      {paymentGenerated 
                        ? `Send ${getCryptoAmount()} ${activeCrypto} to the address shown.` 
                        : 'Please wait while we generate your payment address.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* For demo purposes, add a button to simulate payment completion */}
              <Button 
                className={`w-full ${
                  activeCrypto === 'MATIC' 
                    ? 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700' 
                    : activeCrypto === 'BNB' 
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700' 
                      : 'bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600'
                } border-none`}
                onClick={handleCompleteDemoPayment}
              >
                Simulate Payment Completion (Demo)
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
            <Link href="/payment" className="text-muted-foreground hover:text-teal-400 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Payment Methods</span>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
} 