import React from "react";
import "./globals.css";

export const metadata = {
  title: "CryptoGate - HD Wallet-Based Ethereum Payment Gateway",
  description: "Secure, private, and traceable Ethereum payments for your business with unique addresses for every transaction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
