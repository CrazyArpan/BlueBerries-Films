import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'node:crypto';

const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'test_secret_key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-webhook-signature'] as string;
    const payload = JSON.stringify(req.body);
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', CASHFREE_SECRET_KEY)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { orderId, orderAmount, referenceId, txStatus, txMsg, paymentMode, txTime } = req.body;

    console.log('Cashfree webhook received:', {
      orderId,
      orderAmount,
      referenceId,
      txStatus,
      txMsg,
      paymentMode,
      txTime
    });

    // Handle payment status
    if (txStatus === 'SUCCESS') {
      // Payment successful - update your database
      console.log(`Payment successful for order: ${orderId}`);
      
      // Here you would typically:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Grant access to content
      // 4. Log the transaction
      
    } else if (txStatus === 'FAILED') {
      // Payment failed
      console.log(`Payment failed for order: ${orderId}`);
      
      // Here you would typically:
      // 1. Update order status to failed
      // 2. Send failure notification
      // 3. Log the failure
      
    } else if (txStatus === 'PENDING') {
      // Payment pending
      console.log(`Payment pending for order: ${orderId}`);
    }

    // Always respond with 200 to acknowledge receipt
    return res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });

  } catch (error: any) {
    console.error('Cashfree webhook error:', error);
    return res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error.message 
    });
  }
} 