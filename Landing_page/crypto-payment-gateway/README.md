# Crypto Payment Gateway

A modern cryptocurrency payment gateway built with Next.js, featuring:

- HD wallet-based Ethereum payment processing
- Real-time transaction monitoring
- Multiple cryptocurrency support (ETH, MATIC, BNB)
- Secure checkout process
- Responsive design for all devices

## Getting Started

First, install the dependencies:

```bash
npm install --legacy-peer-deps
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new).

## Environment Variables

This project requires the following environment variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Features

- Modern UI with Tailwind CSS
- Fully responsive design
- Dark mode
- 3D Ethereum model visualization
- Shopping cart functionality
- Multiple payment methods
- QR code generation for crypto payments
- Real-time transaction monitoring 