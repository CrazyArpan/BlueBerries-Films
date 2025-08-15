"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export default function CartCheckoutPage() {
  const { items, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800 text-center"
          >
            <div className="mb-6">
              <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
              <p className="text-gray-300 text-lg mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            <Link
              href="/pricing"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg inline-flex items-center gap-3"
            >
              <FaArrowLeft className="text-xl" />
              Browse Plans
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // For now, redirect to the first item's checkout
    // In a real implementation, you'd create a combined order
    const firstItem = items[0];
    const checkoutUrl = `/checkout/${firstItem.planSlug}`;
    
    // Clear cart and redirect
    clearCart();
    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaShoppingCart className="text-red-500" />
              Shopping Cart ({items.length} items)
            </h1>
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeft className="text-xl" />
            </Link>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-6 bg-zinc-800 rounded-xl border border-zinc-700"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-red-500">
                    INR {item.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                    title="Remove from cart"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-zinc-700 pt-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">Total:</span>
              <span className="text-3xl font-bold text-red-500">
                INR {getCartTotal()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-zinc-700"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FaShoppingCart className="text-xl" />
                  Proceed to Checkout
                </>
              )}
            </button>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> You'll be redirected to checkout for the first item in your cart. 
              For multiple items, please checkout each item separately.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 