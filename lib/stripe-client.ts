"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";

// Store the Stripe promise in a variable to avoid recreating it
let stripePromise: Promise<Stripe | null>;

// Function to get the Stripe instance
export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error("Stripe publishable key is missing!");
      return null;
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
}; 