"use client"

import Link from "next/link"
import { ArrowLeft, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"
import { EthereumIcon, PolygonIcon, BinanceIcon } from "@/components/crypto-icons"
import { StripePaymentForm } from "@/components/stripe-payment-form"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const { getCartTotal, setSelectedCrypto, getCartTotalInCrypto } = useCart()
  
  const cartTotal = getCartTotal()
  
  const handleSelectCrypto = (crypto: string) => {
    setSelectedCrypto(crypto)
    router.push("/payment/crypto")
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Link href="/cart" className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Select Payment Method</h1>
            <p className="text-muted-foreground">Choose how you'd like to pay for your order</p>
          </div>

          <Tabs defaultValue="crypto" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 mb-8 bg-black/30 border border-white/10">
              <TabsTrigger 
                value="crypto" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400/10 data-[state=active]:to-blue-500/10 data-[state=active]:text-white data-[state=active]:shadow py-3"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 10L12 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Cryptocurrency
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="card" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400/10 data-[state=active]:to-blue-500/10 data-[state=active]:text-white data-[state=active]:shadow py-3"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-teal-400" />
                  Credit Card
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="crypto" className="mt-0 p-0 border-none">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="relative overflow-hidden border border-white/10 bg-black/30 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 cursor-pointer group">
                  <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
                  
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-blue-500/10">
                      <EthereumIcon className="h-7 w-7 text-blue-400" />
                    </div>
                    <CardTitle>Ethereum</CardTitle>
                    <CardDescription>ETH</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-mono text-sm">1 ETH = $3917.39 USD</div>
                    <div className="font-mono text-sm mt-1">
                      Pay: {(cartTotal / 3917.39).toFixed(8)} ETH
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 hover:bg-white/5 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-blue-500 group-hover:text-black group-hover:border-transparent"
                      onClick={() => handleSelectCrypto('ETH')}
                    >
                      Pay with ETH
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="relative overflow-hidden border border-white/10 bg-black/30 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 cursor-pointer group">
                  <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-purple-500/5 rounded-full blur-3xl"></div>
                  
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-purple-500/10">
                      <PolygonIcon className="h-7 w-7 text-purple-400" />
                    </div>
                    <CardTitle>Polygon</CardTitle>
                    <CardDescription>MATIC</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-mono text-sm">1 MATIC = $0.40 USD</div>
                    <div className="font-mono text-sm mt-1">
                      Pay: {(cartTotal / 0.40).toFixed(2)} MATIC
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 hover:bg-white/5 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-purple-500 group-hover:text-black group-hover:border-transparent"
                      onClick={() => handleSelectCrypto('MATIC')}
                    >
                      Pay with MATIC
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="relative overflow-hidden border border-white/10 bg-black/30 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 cursor-pointer group">
                  <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-[10%] right-[5%] w-[25%] h-[25%] bg-amber-500/5 rounded-full blur-3xl"></div>
                  
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-amber-500/10">
                      <BinanceIcon className="h-7 w-7 text-amber-400" />
                    </div>
                    <CardTitle>Binance Coin</CardTitle>
                    <CardDescription>BNB</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-mono text-sm">1 BNB = $1036.47 USD</div>
                    <div className="font-mono text-sm mt-1">
                      Pay: {(cartTotal / 1036.47).toFixed(6)} BNB
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 hover:bg-white/5 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-black group-hover:border-transparent"
                      onClick={() => handleSelectCrypto('BNB')}
                    >
                      Pay with BNB
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="card" className="mt-0 p-0 border-none">
              <Card className="relative overflow-hidden border border-white/10 bg-black/30 shadow-lg">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400/5 rounded-full blur-3xl"></div>
                <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <CardHeader>
                  <CardTitle>Credit Card Payment (Stripe)</CardTitle>
                  <CardDescription>Pay securely with Stripe payment processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <StripePaymentForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
} 