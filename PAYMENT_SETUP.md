# Payment Gateway Setup Guide

This guide explains how to set up Cashfree and PhonePe payment gateways for the INR 49 Red File plan using your existing WordPress/WooCommerce integration.

## Prerequisites

1. Install the required dependencies:
```bash
npm install axios
```

2. Create a `.env.local` file in the root directory with the following variables:

```env
# WordPress/WooCommerce Configuration
WORDPRESS_URL=https://blueberriesfilms.com
WOOCOMMERCE_CONSUMER_KEY=your_woocommerce_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_woocommerce_consumer_secret

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## WooCommerce Integration Setup

### WordPress/WooCommerce Setup

1. **Get WooCommerce API Credentials:**
   - Go to your WordPress admin panel
   - Navigate to WooCommerce → Settings → Advanced → REST API
   - Click "Add Key"
   - Set permissions to "Read/Write"
   - Copy the Consumer Key and Consumer Secret

2. **Update Product IDs:**
   - In `src/pages/api/payments/woocommerce-proxy.ts`
   - Update the `getProductIdByPlan` function with your actual WooCommerce product IDs
   - Replace the placeholder IDs (123, 124, etc.) with your real product IDs

3. **Configure Payment Gateways:**
   - Ensure Cashfree and PhonePe are properly configured in your WooCommerce
   - The proxy will use your existing payment gateway setup

## Features Implemented

### For Red File Plan (INR 49):
- ✅ UPI payment options only (Cashfree and PhonePe)
- ✅ Removed card payment option
- ✅ Complete form with personal info and billing address
- ✅ Privacy policy text display
- ✅ Terms & conditions checkbox with modal popup
- ✅ WooCommerce integration for payment processing
- ✅ Payment processing with proper error handling
- ✅ Success page with order confirmation

### For Other Plans:
- ⏳ Card payment coming soon (currently disabled)

## API Endpoints Created

1. **POST /api/payments/woocommerce-proxy** - Creates order in WooCommerce and redirects to payment
2. **POST /api/payments/cashfree** - Direct Cashfree payment (backup)
3. **POST /api/payments/phonepe** - Direct PhonePe payment (backup)
4. **POST /api/payments/webhook/cashfree** - Handles Cashfree webhooks
5. **POST /api/payments/webhook/phonepe** - Handles PhonePe webhooks

## Testing

1. Use test credentials provided by Cashfree and PhonePe for development
2. Test the payment flow with small amounts
3. Verify webhook handling for payment status updates

## Production Deployment

1. Update environment variables with production credentials
2. Ensure webhook URLs are accessible from payment gateways
3. Set up proper SSL certificates for secure communication
4. Monitor payment logs and webhook responses

## Security Considerations

- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement proper signature verification for webhooks
- Validate all payment data before processing
- Log payment activities for audit purposes 