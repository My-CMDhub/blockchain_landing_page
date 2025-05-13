"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";

// Store the Stripe promise in a variable to avoid recreating it
let stripePromise: Promise<Stripe | null>;

// Function to get the Stripe instance
export const getStripe = () => {
  if (!stripePromise) {
    // In Next.js client components, we need to use NEXT_PUBLIC_ prefixed env variables
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error("Stripe publishable key is missing! Make sure it's properly set in your environment variables with the NEXT_PUBLIC_ prefix.");
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
}; 