"use client"

import { Ethereum3DModel } from "@/components/ethereum-3d-model"

export function EthereumShowcase({ className = "", enableZoom = true, autoRotate = true }: { className?: string, enableZoom?: boolean, autoRotate?: boolean }) {
  return (
    <div className={`eth-3d-horror w-[300px] h-[300px] mx-auto my-8 ${className}`}>
      <Ethereum3DModel autoRotate={autoRotate} enableZoom={enableZoom} />
    </div>
  )
}
