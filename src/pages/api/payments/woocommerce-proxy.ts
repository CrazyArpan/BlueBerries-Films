import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { woocommerce } from "../../../lib/env";

// WordPress/WooCommerce configuration
const WORDPRESS_URL = process.env.WORDPRESS_URL || "http://localhost/wordpress";
const WOOCOMMERCE_CONSUMER_KEY = woocommerce.consumerKey;
const WOOCOMMERCE_CONSUMER_SECRET = woocommerce.consumerSecret;

interface PaymentRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  planName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: "cashfree" | "phonepe";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      orderId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      planName,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
    }: PaymentRequest = req.body;

    // Validate required fields
    if (!orderId || !amount || !customerName || !customerEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create order data for WooCommerce
    const orderData = {
      payment_method: paymentMethod === "cashfree" ? "cashfree" : "phonepe",
      payment_method_title:
        paymentMethod === "cashfree" ? "Cashfree UPI" : "PhonePe UPI",
      set_paid: false,
      billing: {
        first_name: customerName.split(" ")[0] || customerName,
        last_name: customerName.split(" ").slice(1).join(" ") || "",
        address_1: streetAddress,
        city: city,
        state: state,
        postcode: zipCode,
        country: country,
        email: customerEmail,
        phone: customerPhone,
      },
      shipping: {
        first_name: customerName.split(" ")[0] || customerName,
        last_name: customerName.split(" ").slice(1).join(" ") || "",
        address_1: streetAddress,
        city: city,
        state: state,
        postcode: zipCode,
        country: country,
      },
      line_items: [
        {
          product_id: getProductIdByPlan(planName),
          quantity: 1,
          total: (amount * 100).toString(), // WooCommerce expects amount in cents
        },
      ],
      meta_data: [
        {
          key: "_order_id",
          value: orderId,
        },
        {
          key: "_payment_method",
          value: paymentMethod,
        },
      ],
    };

    // Create order in WooCommerce
    const auth = Buffer.from(
      `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`,
    ).toString("base64");

    const orderResponse = await axios.post(
      `${WORDPRESS_URL}/wp-json/wc/v3/orders`,
      orderData,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (orderResponse.data.id) {
      const orderId = orderResponse.data.id;

      // Get payment URL from WooCommerce
      const paymentUrl = await getPaymentUrl(orderId, paymentMethod);

      return res.status(200).json({
        success: true,
        orderId: orderId,
        paymentUrl: paymentUrl,
        message: "Order created successfully in WooCommerce",
      });
    } else {
      throw new Error("Failed to create order in WooCommerce");
    }
  } catch (error: any) {
    console.error(
      "WooCommerce payment error:",
      error.response?.data || error.message,
    );
    // Add more detailed logging
    if (error.response) {
      console.error("Full WooCommerce Error Response:");
      console.error(`Status: ${error.response.status}`);
      console.error(
        "Headers:",
        JSON.stringify(error.response.headers, null, 2),
      );
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    }
    return res.status(500).json({
      error: "Payment processing failed",
      details: error.response?.data || error.message,
    });
  }
}

function getProductIdByPlan(planName: string): number {
  // Map plan names to WooCommerce product IDs
  const planMap: Record<string, number> = {
    "Red File": 123, // Replace with actual product ID for Red File
    "Red File Special": 123,
  };

  return planMap[planName] || 123; // Default to Red File product ID
}

async function getPaymentUrl(
  orderId: number,
  paymentMethod: string,
): Promise<string> {
  try {
    // This would typically call your WooCommerce payment gateway
    // For now, we'll return a placeholder URL
    if (paymentMethod === "cashfree") {
      return `${WORDPRESS_URL}/checkout/order-pay/${orderId}/?pay_for_order=true&key=wc_order_${orderId}`;
    } else {
      return `${WORDPRESS_URL}/checkout/order-pay/${orderId}/?pay_for_order=true&key=wc_order_${orderId}`;
    }
  } catch (error) {
    console.error("Error getting payment URL:", error);
    return `${WORDPRESS_URL}/checkout/order-pay/${orderId}/?pay_for_order=true&key=wc_order_${orderId}`;
  }
}
