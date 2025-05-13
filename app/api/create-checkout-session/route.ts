import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Log the state of the Stripe secret key for debugging
console.log("Stripe secret key available:", !!process.env.STRIPE_SECRET_KEY);

// Initialize Stripe with the secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable. Please set this in your .env.local file or Vercel environment variables.')
}

// Create Stripe instance
const stripe = new Stripe(stripeSecretKey, {
  typescript: true,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Please provide items to checkout' },
        { status: 400 }
      )
    }

    // Get the origin for success and cancel URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    console.log("Origin for redirect URLs:", origin);

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || '',
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    console.log("Creating Stripe checkout session...");
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/payment/confirmation?method=stripe&stripe_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?canceled=true`,
    })

    console.log("Stripe session created:", session.id);
    return NextResponse.json({ id: session.id })
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    // Check for specific Stripe errors
    if (error.type && error.type.startsWith('Stripe')) {
      console.error('Stripe API error:', {
        type: error.type,
        code: error.code,
        message: error.message
      });
    }
    
    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    )
  }
} 