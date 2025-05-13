"use client"

import { Toaster as SonnerToaster } from "sonner"

export function SonnerToast() {
  return (
    <SonnerToaster 
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(15, 15, 15, 0.9)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
        },
      }}
      theme="dark"
      closeButton
    />
  )
} 