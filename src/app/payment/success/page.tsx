"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaDownload, FaPlay } from "react-icons/fa";
import Link from "next/link";
import BackToHomeButton from "../../components/BackToHomeButton";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <FaCheckCircle className="text-white text-4xl" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 text-lg mb-6"
          >
            Thank you for your purchase. Your order has been confirmed and you
            now have access to premium content.
          </motion.p>

          {/* Order Details */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-zinc-800 rounded-xl p-6 mb-8"
            >
              <h3 className="text-white font-semibold mb-3">Order Details</h3>
              <div className="text-gray-300">
                <p>
                  <span className="text-gray-400">Order ID:</span> {orderId}
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  <span className="text-green-400">Confirmed</span>
                </p>
                <p>
                  <span className="text-gray-400">Plan:</span> Red File -
                  Lifetime Access
                </p>
                <p>
                  <span className="text-gray-400">Amount:</span> INR 49
                </p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="space-y-4"
          >
            <Link
              href="/movies/the-red-files"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg flex items-center justify-center gap-3"
            >
              <FaPlay className="text-xl" />
              Start Watching The Red Files
            </Link>

            <BackToHomeButton
              href="/home"
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-zinc-700 text-lg flex items-center justify-center gap-3"
            />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 pt-6 border-t border-zinc-700"
          >
            <p className="text-gray-400 text-sm">
              A confirmation email has been sent to your registered email
              address. If you have any questions, please contact our support
              team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
