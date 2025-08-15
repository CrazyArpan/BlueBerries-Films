import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'node:crypto';

const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { merchantId, merchantTransactionId, amount, state, responseCode, checksum } = req.body;
    
    // Verify checksum
    const expectedChecksum = generateChecksum(req.body, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX);

    if (checksum !== expectedChecksum) {
      console.error('Invalid PhonePe checksum');
      return res.status(401).json({ error: 'Invalid checksum' });
    }

    console.log('PhonePe webhook received:', {
      merchantId,
      merchantTransactionId,
      amount,
      state,
      responseCode
    });

    // Handle payment status
    if (state === 'COMPLETED' && responseCode === 'PAYMENT_SUCCESS') {
      // Payment successful
      console.log(`Payment successful for transaction: ${merchantTransactionId}`);
      
      // Here you would typically:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Grant access to content
      // 4. Log the transaction
      
    } else if (state === 'FAILED') {
      // Payment failed
      console.log(`Payment failed for transaction: ${merchantTransactionId}`);
      
      // Here you would typically:
      // 1. Update order status to failed
      // 2. Send failure notification
      // 3. Log the failure
      
    } else if (state === 'PENDING') {
      // Payment pending
      console.log(`Payment pending for transaction: ${merchantTransactionId}`);
    }

    // Always respond with 200 to acknowledge receipt
    return res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });

  } catch (error: any) {
    console.error('PhonePe webhook error:', error);
    return res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error.message 
    });
  }
}

function generateChecksum(payload: any, saltKey: string, saltIndex: string): string {
  const string = JSON.stringify(payload) + '/pg/v1/status' + saltKey;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + '###' + saltIndex;
} 