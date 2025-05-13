# CryptoGate - Ethereum Payment Gateway Demo

This project demonstrates a blockchain-based payment gateway for accepting Ethereum payments. It includes both a landing page and a complete demo shopping flow.

## Features

- Landing page showcasing the payment gateway features
- Product demo page with a sample product
- Shopping cart functionality
- Payment method selection (Cryptocurrency or Credit Card)
- Cryptocurrency payment page with QR code and address
- Order confirmation page

## Demo Flow

1. Visit the landing page
2. Click "View Demo" to see the product page
3. Add the product to your cart
4. Proceed to checkout
5. Select a payment method (Ethereum, Polygon, or Binance Coin)
6. View the payment screen with QR code and instructions
7. Complete the flow to see the confirmation page

## Technology Stack

- Next.js
- React
- Tailwind CSS
- Shadcn UI Components
- Vercel for deployment

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Deployment

This project is configured for deployment on Vercel. Simply push changes to the main branch, and the application will be automatically deployed.

## Environment Variables

The following environment variables need to be set up for the application to work correctly:

### Stripe Integration

- `STRIPE_SECRET_KEY` - Your Stripe secret key for backend API calls
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key for frontend components

### Setting Up Environment Variables

#### For Local Development:

1. Create a `.env.local` file in the root directory
2. Add the required environment variables:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add each environment variable with its corresponding value
4. Save the changes and redeploy your application

Vercel will automatically include these environment variables during the build process and when running your application.

## Important Notes

- This is a demo application. No real cryptocurrency transactions are processed.
- The payment addresses and QR codes are for demonstration purposes only.
- The application uses client-side components for interactive elements to ensure compatibility with Next.js server components.
