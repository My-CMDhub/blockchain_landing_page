import Link from "next/link"
import { 
  ArrowRight, 
  CheckCircle, 
  CreditCard, 
  Database, 
  Globe, 
  Lock, 
  RefreshCcw, 
  Shield, 
  Wallet 
} from "../components/ui/icons"

import { BlockchainVisualization } from "../Landing_page/crypto-payment-gateway/components/blockchain-visualization"
import { EthereumLogo } from "../Landing_page/crypto-payment-gateway/components/ethereum-logo"
import { PaymentFlow } from "../Landing_page/crypto-payment-gateway/components/payment-flow"
import { SecurityShield } from "../Landing_page/crypto-payment-gateway/components/security-shield"
import { Button } from "../Landing_page/crypto-payment-gateway/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../Landing_page/crypto-payment-gateway/components/ui/card"

// This is a modified version of enhanced-page.tsx that uses our custom icons
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CryptoGate</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#security" className="text-sm font-medium hover:text-primary transition-colors">
              Security
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors hidden md:block">
              Contact
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Ethereum Payments
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    HD Wallet-Based Ethereum Payment Gateway
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Secure, private, and traceable Ethereum payments for your business with unique addresses for every
                    transaction.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="group">
                    Start Accepting ETH
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No KYC Required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Instant Setup</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Low Fees</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border bg-card p-2 shadow-xl">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
                  <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
                  <div className="relative rounded-md border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5">
                          <EthereumLogo className="absolute inset-0 w-full h-full" />
                        </div>
                        <span className="font-medium">Payment Request</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Transaction #38291</div>
                    </div>
                    <div className="py-4">
                      <div className="mb-4 text-center">
                        <div className="text-sm text-muted-foreground">Amount Due</div>
                        <div className="text-2xl font-bold">0.05 ETH</div>
                        <div className="text-sm text-muted-foreground">≈ $125.00 USD</div>
                      </div>
                      <div className="mx-auto mb-4 h-48 w-48 rounded-lg bg-muted p-2 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <EthereumLogo className="w-32 h-32" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-xs text-center text-muted-foreground bg-background/80 px-2 py-1 rounded">QR Code Placeholder</div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 rounded-md bg-muted p-2 text-center text-sm">
                        <span className="font-mono text-xs">0x7F1B543127F8c8bD92b5e3E80D9E5c3ed9b1eD75</span>
                      </div>
                      <div className="flex justify-center">
                        <Button className="w-full">Copy Address</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <RefreshCcw className="h-3 w-3 animate-spin" />
                        <span>Refreshing...</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Lock className="h-3 w-3" />
                        <span>Secure Connection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted py-20 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -bottom-[5%] -right-[5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Our HD wallet-based payment gateway offers powerful features for secure Ethereum transactions.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group overflow-hidden transition-all hover:shadow-lg border-secondary/50 bg-card hover:translate-y-[-5px] duration-300">
                <CardHeader className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <CardTitle>Unique Payment Addresses</CardTitle>
                  <CardDescription>
                    Generate a unique Ethereum address for each transaction using HD wallet technology, enhancing
                    privacy and traceability.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all hover:shadow-lg border-secondary/50 bg-card hover:translate-y-[-5px] duration-300">
                <CardHeader className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Lock className="h-6 w-6" />
                  </div>
                  <CardTitle>Encrypted Key Management</CardTitle>
                  <CardDescription>
                    Advanced encryption for private keys with multi-layer security protocols to protect your ETH funds.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all hover:shadow-lg border-secondary/50 bg-card hover:translate-y-[-5px] duration-300">
                <CardHeader className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <RefreshCcw className="h-6 w-6" />
                  </div>
                  <CardTitle>Real-Time Monitoring</CardTitle>
                  <CardDescription>
                    Monitor Ethereum transactions in real-time with instant notifications and detailed transaction
                    history.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all hover:shadow-lg border-secondary/50 bg-card hover:translate-y-[-5px] duration-300">
                <CardHeader className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <CardTitle>Merchant Dashboard</CardTitle>
                  <CardDescription>
                    Comprehensive dashboard for managing payments, viewing analytics, and releasing funds to your
                    Ethereum wallet.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all hover:shadow-lg border-secondary/50 bg-card hover:translate-y-[-5px] duration-300">
                <CardHeader className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Globe className="h-6 w-6" />
                  </div>
                  <CardTitle>Multiple RPC Providers</CardTitle>
                  <CardDescription>
                    Support for multiple Ethereum RPC providers ensures high availability and reliability for your
                    transactions.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all hover:shadow-lg border-secondary/50 bg-card hover:translate-y-[-5px] duration-300">
                <CardHeader className="p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle>Recovery Tools</CardTitle>
                  <CardDescription>
                    Robust wallet recovery tools, Ethereum address derivation fixes, and fund release testing
                    capabilities.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[30%] -left-[5%] w-[20%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Our payment gateway simplifies Ethereum transactions for both merchants and customers.
              </p>
            </div>
            
            <div className="mx-auto max-w-5xl mb-12">
              <PaymentFlow className="w-full h-[300px]" />
            </div>
            
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Integration</h3>
                <p className="text-muted-foreground">
                  Integrate our API through simple REST endpoints or use our Node.js, Python, or PHP SDKs.
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Unique Addresses</h3>
                <p className="text-muted-foreground">
                  Each customer receives a unique Ethereum payment address derived from your HD wallet.
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Automatic Confirmation</h3>
                <p className="text-muted-foreground">
                  Transactions are automatically verified on the blockchain and funds are credited to your account.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="bg-muted py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Security-First Approach
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Our HD wallet implementation uses industry-leading security practices to protect your funds and
                    customer data.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold">Cold Storage Private Keys</h3>
                      <p className="text-muted-foreground">
                        Master private keys are stored in cold storage with multi-signature protection.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold">No Single Point of Failure</h3>
                      <p className="text-muted-foreground">
                        Distributed architecture ensures high availability and protection against attacks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold">Encrypted Data Storage</h3>
                      <p className="text-muted-foreground">
                        All customer and transaction data is encrypted at rest and in transit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <SecurityShield className="w-full max-w-[500px]" />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Accept Ethereum Payments?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Start accepting Ethereum payments today with our secure, reliable, and easy-to-integrate payment
                gateway.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="group">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CryptoGate</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                API Docs
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Support
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 CryptoGate. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 