"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
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
        className: "sonner-toast-custom",
        success: {
          style: {
            border: "1px solid rgba(56, 224, 188, 0.3)",
            background: "rgba(15, 15, 15, 0.9)",
          },
          icon: '✓',
        },
        error: {
          style: {
            border: "1px solid rgba(255, 107, 107, 0.3)",
            background: "rgba(15, 15, 15, 0.9)",
          },
          icon: '×',
        },
      }}
    />
  )
}
