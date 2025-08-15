import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import crypto from 'node:crypto';

// PhonePe configuration
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT';
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const PHONEPE_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.phonepe.com/apis/hermes' 
  : 'https://api-preprod.phonepe.com/apis/hermes';

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

    // Prepare payment payload for PhonePe
    const paymentPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: finalOrderId,
      merchantUserId: `user_${Date.now()}`,
      amount: amount * 100, // PhonePe expects amount in paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?order_id=${finalOrderId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payments/webhook/phonepe`,
      mobileNumber: customerPhone || "9999999999",
      paymentInstrument: {
        type: "UPI_INTENT",
        targetApp: "PHONEPE"
      }
    };

    // Convert payload to base64
    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');

    // Generate checksum
    const checksum = generateChecksum(base64Payload, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX);

    // Make API call to PhonePe
    const response = await axios.post(
      `${PHONEPE_API_URL}/pg/v1/pay`,
      {
        request: base64Payload
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum
        }
      }
    );

    if (response.data.success && response.data.data.instrumentResponse.redirectInfo.url) {
      return res.status(200).json({
        success: true,
        orderId: finalOrderId,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
        message: 'Payment session created successfully'
      });
    } else {
      return res.status(400).json({
        error: 'Failed to create payment session',
        details: response.data
      });
    }

  } catch (error: any) {
    console.error('PhonePe payment error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Payment processing failed',
      details: error.response?.data || error.message
    });
  }
}

function generateChecksum(payload: string, saltKey: string, saltIndex: string): string {
  const string = payload + '/pg/v1/pay' + saltKey;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + '###' + saltIndex;
} 