// This is a helper script to set environment variables for testing
// Run with: node set-env.js

const fs = require('fs');
const path = require('path');

// Create .env.local file with Stripe placeholder keys
const envContent = `
# Stripe API keys - Replace with your actual test keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Note: These are placeholder values for demonstration
# In a real application, you would use your actual Stripe API keys
# Never commit actual API keys to version control
`;

const envFilePath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envFilePath, envContent.trim());
  console.log('Created .env.local file with placeholder keys');
  console.log('Please replace the placeholder values with your actual Stripe API keys');
  console.log('Note: Never commit .env files with real API keys to version control!');
} catch (error) {
  console.error('Error creating .env.local file:', error);
} 