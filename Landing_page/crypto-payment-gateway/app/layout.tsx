import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CartProvider } from "@/components/cart-context"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoGate | Ethereum Payment Gateway",
  description: "Secure, HD wallet-based Ethereum payment gateway for merchants",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
              })()
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
