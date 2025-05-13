import { Zap } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-teal-400" />
            <span className="text-lg font-semibold">CryptoGate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2023 CryptoGate - Blockchain Payment Gateway. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 