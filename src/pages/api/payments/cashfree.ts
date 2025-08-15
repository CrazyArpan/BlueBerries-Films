import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import crypto from 'node:crypto';

// Cashfree configuration
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || 'TEST123456789';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'test_secret_key';
const CASHFREE_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.cashfree.com/pg' 
  : 'https://sandbox.cashfree.com/pg';

interface PaymentRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  planName: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, amount, customerName, customerEmail, customerPhone, planName }: PaymentRequest = req.body;

    // Validate required fields
    if (!orderId || !amount || !customerName || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate order ID if not provided
    const finalOrderId = orderId || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare payment payload for Cashfree
    const paymentPayload = {
      order_id: finalOrderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || "9999999999"
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payments/webhook/cashfree`,
        payment_methods: "upi"
      }
    };

    // Generate signature
    const signature = generateSignature(paymentPayload, CASHFREE_SECRET_KEY);

    // Make API call to Cashfree
    const response = await axios.post(
      `${CASHFREE_API_URL}/orders`,
      paymentPayload,
      {
        headers: {
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.payment_session_id) {
      return res.status(200).json({
        success: true,
        paymentSessionId: response.data.payment_session_id,
        orderId: finalOrderId,
        paymentUrl: response.data.payment_link,
        message: 'Payment session created successfully'
      });
    } else {
      return res.status(400).json({
        error: 'Failed to create payment session',
        details: response.data
      });
    }

  } catch (error: any) {
    console.error('Cashfree payment error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Payment processing failed',
      details: error.response?.data || error.message
    });
  }
}

function generateSignature(payload: any, secretKey: string): string {
  const data = JSON.stringify(payload);
  return crypto
    .createHmac('sha256', secretKey)
    .update(data)
    .digest('hex');
} 