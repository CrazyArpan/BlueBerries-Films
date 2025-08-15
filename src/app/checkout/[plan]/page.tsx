"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGift,
  FaCheck,
  FaTimes,
  FaUser,
  FaMobile,
  FaCreditCard,
  FaLock,
  FaPhone,
  FaQrcode,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

const planDetails: Record<
  string,
  {
    name: string;
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
  }
> = {
  redfile: {
    name: "Red File",
    description: "Everything except max video quality. Lifetime access.",
    price: "INR 49",
    originalPrice: "INR 49",
  },
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  planName: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface FloatingLabelProps {
  field: keyof FormData;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  getFieldStatus: (field: keyof FormData) => string;
  getBorderColor: (field: keyof FormData) => string;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  showErrors: boolean;
}

const FloatingLabel = ({
  field,
  label,
  type = "text",
  placeholder = "",
  options,
  formData,
  handleInputChange,
  getFieldStatus,
  getBorderColor,
  errors,
  touched,
  showErrors,
}: FloatingLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue =
    typeof formData[field] === "string"
      ? formData[field].trim() !== ""
      : formData[field] === true;
  const shouldFloat = isFocused || hasValue;
  const status = getFieldStatus(field);

  return (
    <div className="relative mb-2">
      {options ? (
        <select
          id={field}
          value={typeof formData[field] === "string" ? formData[field] : ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-zinc-800 border text-white px-4 py-4 rounded-xl focus:outline-none transition-all duration-300 appearance-none ${getBorderColor(field)} ${shouldFloat ? "pt-6 pb-2" : "py-4"}`}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field}
          type={type}
          value={typeof formData[field] === "string" ? formData[field] : ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-zinc-800 border text-white px-4 py-4 rounded-xl focus:outline-none transition-all duration-300 ${getBorderColor(field)} ${shouldFloat ? "pt-6 pb-2" : "py-4"}`}
          placeholder={shouldFloat ? placeholder : ""}
        />
      )}
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${shouldFloat ? "top-2 text-xs text-gray-400" : "top-1/2 -translate-y-1/2 text-base text-gray-300"}`}
      >
        {label} <span className="text-red-500">*</span>
      </label>
      {status === "error" && (
        <FaTimes className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" />
      )}
      {/* Error message below field */}
      {errors[field] && (touched[field] || showErrors) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 ml-1"
        >
          {errors[field]}
        </motion.div>
      )}
    </div>
  );
};

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan: planSlug } = use(params);
  const plan = planDetails[planSlug] || planDetails.redfile;
  const { addToCart } = useCart();
  const router = useRouter();
  console.log("Plan slug:", planSlug, "Plan details:", plan);
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cashfree" | "phonepe" | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    planName: plan.name,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showErrors, setShowErrors] = useState(false);

  const handleCouponSubmit = () => {
    if (couponCode.trim()) {
      // Simulate coupon validation
      const validCoupons = ["WELCOME10", "SAVE20", "BLUEBERRIES50"];
      if (validCoupons.includes(couponCode.toUpperCase())) {
        setCouponApplied(true);
        const discount =
          couponCode.toUpperCase() === "WELCOME10"
            ? 10
            : couponCode.toUpperCase() === "SAVE20"
              ? 20
              : 50;
        setDiscountAmount(discount);
      }
    }
  };

  const calculateFinalPrice = () => {
    const basePrice = parseInt(plan.price.replace("INR ", ""));
    if (couponApplied) {
      return basePrice - (basePrice * discountAmount) / 100;
    }
    return basePrice;
  };

  // Per-field validation
  const validateField = (
    field: keyof FormData,
    value: string | boolean,
  ): string => {
    switch (field) {
      case "fullName":
        if (typeof value === "string" && !value.trim())
          return "Full name is required";
        return "";
      case "email":
        if (typeof value === "string" && !value.trim())
          return "Email is required";
        if (typeof value === "string" && !/\S+@\S+\.\S+/.test(value))
          return "Please enter a valid email";
        return "";
      case "phone":
        if (typeof value === "string" && !value.trim())
          return "Phone number is required";
        if (
          typeof value === "string" &&
          !/^\d{10}$/.test(value.replace(/\s/g, ""))
        )
          return "Please enter a valid 10-digit phone number";
        return "";
      case "streetAddress":
        if (typeof value === "string" && !value.trim())
          return "Street address is required";
        return "";
      case "city":
        if (typeof value === "string" && !value.trim())
          return "City is required";
        return "";
      case "state":
        if (typeof value === "string" && !value.trim())
          return "State is required";
        return "";
      case "zipCode":
        if (typeof value === "string" && !value.trim())
          return "ZIP code is required";
        if (typeof value === "string" && value.length < 4)
          return "ZIP code is too short";
        return "";
      case "country":
        if (typeof value === "string" && !value.trim())
          return "Country is required";
        return "";
      case "agreeToTerms":
        if (!value) return "You must agree to the terms and conditions";
        return "";
      case "planName":
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Validate field on change
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (paymentMethod: "cashfree" | "phonepe") => {
    setShowErrors(true);

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const amount = calculateFinalPrice();

      const paymentData = {
        orderId,
        amount,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        planName: formData.planName,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod,
      };

      // Use WooCommerce proxy instead of direct payment gateways
      const response = await axios.post(
        "/api/payments/woocommerce-proxy",
        paymentData,
      );

      if (response.data.success && response.data.paymentUrl) {
        // Redirect to WooCommerce payment page
        window.location.href = response.data.paymentUrl;
      } else {
        throw new Error("Failed to create payment session");
      }
    } catch (error: any) {
      console.error(
        "Payment error:",
        error.response ? error.response.data : error.message,
      );
      alert(
        "Payment processing failed. Please check the console for more details.",
      );
      // Add to cart when payment fails
      addCurrentPlanToCart();
    } finally {
      setIsProcessing(false);
    }
  };

  const getFieldStatus = (field: keyof FormData) => {
    const value = formData[field];
    const error = validateField(field, value);
    if (touched[field] || showErrors) {
      if (error) return "error";
      if (value && !error) return "success";
    }
    return "default";
  };

  const getBorderColor = (field: keyof FormData) => {
    const status = getFieldStatus(field);
    switch (status) {
      case "error":
        return "border-red-500 focus:border-red-500 focus:ring-red-500";
      case "success":
        return "border-green-500 focus:border-green-500 focus:ring-green-500";
      default:
        return "border-zinc-700 focus:border-red-500 focus:ring-red-500";
    }
  };

  // Function to add current plan to cart
  const addCurrentPlanToCart = () => {
    const planPrice = calculateFinalPrice();
    addToCart({
      id: `plan_${planSlug}`,
      name: plan.name,
      price: planPrice,
      planSlug: planSlug,
    });
  };

  // Handle page exit - add to cart if user leaves without completing payment
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isProcessing) {
        addCurrentPlanToCart();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !isProcessing) {
        addCurrentPlanToCart();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isProcessing, planSlug, plan.name, calculateFinalPrice, addToCart]);

  // Show card payment for all plans except redfile
  const showCardPayment = planSlug !== "redfile";

  const countryOptions = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "Brazil",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-black w-full">
      <div className="w-full px-6 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full px-0"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-gray-300 text-lg">
              You're just a few steps away from enjoying premium content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 items-stretch">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-full lg:col-span-1 pl-0"
            >
              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl min-h-fit flex flex-col gap-8 w-full h-full">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-4">
                  <FaGift className="text-red-500 text-3xl" />
                  Order Summary
                </h2>
                {/* Plan Details */}
                <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700 flex flex-col gap-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {plan.name}
                    </h3>
                    {plan.discount && (
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-base font-bold shadow-lg animate-pulse">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-base mb-2 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex items-center gap-3">
                    {plan.originalPrice &&
                      plan.originalPrice !== plan.price && (
                        <span className="text-xl text-gray-400 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    <span className="text-4xl font-bold text-red-500">
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="mb-2">
                  <motion.div
                    initial={false}
                    animate={{ height: showCouponInput ? "auto" : "auto" }}
                    className="overflow-hidden"
                  >
                    {!showCouponInput ? (
                      <motion.button
                        whileHover={{}}
                        whileTap={{}}
                        onClick={() => setShowCouponInput(true)}
                        className="w-full relative overflow-hidden text-white font-semibold py-4 px-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-500 group"
                        style={{
                          background:
                            "linear-gradient(90deg, #dc2626 0%, #b91c1c 50%, #dc2626 100%)",
                        }}
                      >
                        <span
                          className="absolute inset-0 z-0 transition-all duration-500 bg-gradient-to-r from-red-900 via-red-800 to-red-900 opacity-0 group-hover:opacity-100"
                          style={{ pointerEvents: "none" }}
                        />
                        <span className="relative z-10 flex items-center gap-3">
                          <FaGift className="text-xl animate-pulse" />
                          <span className="text-center">
                            Have a coupon? Click here to enter your code
                          </span>
                        </span>
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex gap-2 w-full">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 min-w-0 bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 placeholder-gray-400"
                          />
                          <motion.button
                            whileHover={{}}
                            whileTap={{}}
                            onClick={handleCouponSubmit}
                            className="flex-shrink-0 relative overflow-hidden text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-500 group"
                            style={{
                              background:
                                "linear-gradient(90deg, #dc2626 0%, #b91c1c 50%, #dc2626 100%)",
                            }}
                          >
                            <span
                              className="absolute inset-0 z-0 transition-all duration-500 bg-gradient-to-r from-red-900 via-red-800 to-red-900 opacity-0 group-hover:opacity-100"
                              style={{ pointerEvents: "none" }}
                            />
                            <span className="relative z-10">Apply</span>
                          </motion.button>
                        </div>
                        {couponApplied && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-r from-red-700/20 to-red-500/20 border border-red-500/40 rounded-xl p-4 flex items-center gap-3 shadow-lg"
                          >
                            <div className="bg-red-500 rounded-full p-1">
                              <FaCheck className="text-white text-sm" />
                            </div>
                            <div>
                              <span className="text-red-400 font-bold text-sm">
                                Coupon Applied!
                              </span>
                              <div className="text-red-300 text-xs">
                                {discountAmount}% discount
                              </div>
                            </div>
                          </motion.div>
                        )}
                        <button
                          onClick={() => {
                            setShowCouponInput(false);
                            setCouponCode("");
                            setCouponApplied(false);
                            setDiscountAmount(0);
                          }}
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300 underline"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 border-t border-zinc-700 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Subtotal:</span>
                    <span className="text-white font-semibold">
                      {plan.price}
                    </span>
                  </div>
                  {couponApplied && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-red-400 font-medium">
                        Discount ({discountAmount}%):
                      </span>
                      <span className="text-red-400 font-bold">
                        -INR{" "}
                        {Math.round(
                          (parseInt(plan.price.replace("INR ", "")) *
                            discountAmount) /
                            100,
                        )}
                      </span>
                    </motion.div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t border-zinc-700">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-2xl font-bold text-red-500">
                      INR {calculateFinalPrice()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full h-full lg:col-span-2 pr-0 flex justify-end"
            >
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 shadow-xl w-full h-full">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-8"
                >
                  {/* Personal Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaUser className="text-red-400" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FloatingLabel
                        field="fullName"
                        label="Full Name"
                        formData={formData}
                        handleInputChange={handleInputChange}
                        getFieldStatus={getFieldStatus}
                        getBorderColor={getBorderColor}
                        errors={errors}
                        touched={touched}
                        showErrors={showErrors}
                      />
                      <FloatingLabel
                        field="email"
                        label="Email Address"
                        type="email"
                        formData={formData}
                        handleInputChange={handleInputChange}
                        getFieldStatus={getFieldStatus}
                        getBorderColor={getBorderColor}
                        errors={errors}
                        touched={touched}
                        showErrors={showErrors}
                      />
                      <div className="md:col-span-2">
                        <FloatingLabel
                          field="phone"
                          label="Phone Number"
                          type="tel"
                          placeholder="10-digit mobile number"
                          formData={formData}
                          handleInputChange={handleInputChange}
                          getFieldStatus={getFieldStatus}
                          getBorderColor={getBorderColor}
                          errors={errors}
                          touched={touched}
                          showErrors={showErrors}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Billing Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaMapMarkerAlt className="text-red-400" />
                      Billing Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <FloatingLabel
                          field="streetAddress"
                          label="Street Address"
                          formData={formData}
                          handleInputChange={handleInputChange}
                          getFieldStatus={getFieldStatus}
                          getBorderColor={getBorderColor}
                          errors={errors}
                          touched={touched}
                          showErrors={showErrors}
                        />
                      </div>
                      <FloatingLabel
                        field="city"
                        label="City"
                        formData={formData}
                        handleInputChange={handleInputChange}
                        getFieldStatus={getFieldStatus}
                        getBorderColor={getBorderColor}
                        errors={errors}
                        touched={touched}
                        showErrors={showErrors}
                      />
                      <FloatingLabel
                        field="state"
                        label="State"
                        formData={formData}
                        handleInputChange={handleInputChange}
                        getFieldStatus={getFieldStatus}
                        getBorderColor={getBorderColor}
                        errors={errors}
                        touched={touched}
                        showErrors={showErrors}
                      />
                      <FloatingLabel
                        field="zipCode"
                        label="ZIP Code"
                        formData={formData}
                        handleInputChange={handleInputChange}
                        getFieldStatus={getFieldStatus}
                        getBorderColor={getBorderColor}
                        errors={errors}
                        touched={touched}
                        showErrors={showErrors}
                      />
                      <FloatingLabel
                        field="country"
                        label="Country / Region"
                        options={countryOptions}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        getFieldStatus={getFieldStatus}
                        getBorderColor={getBorderColor}
                        errors={errors}
                        touched={touched}
                        showErrors={showErrors}
                      />
                    </div>
                  </motion.div>

                  {/* Privacy Policy and Terms */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="space-y-4">
                      {/* Privacy Policy Text */}
                      <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Your personal data will be used to process your order,
                          support your experience throughout this website, and
                          for other purposes described in our{" "}
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 underline font-semibold"
                          >
                            privacy policy
                          </a>
                          .
                        </p>
                      </div>

                      {/* Terms and Conditions Checkbox */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={(e) =>
                            handleInputChange("agreeToTerms", e.target.checked)
                          }
                          className="mt-1 w-5 h-5 text-red-600 bg-zinc-800 border-zinc-700 rounded focus:ring-red-500 focus:ring-2"
                        />
                        <label
                          htmlFor="agreeToTerms"
                          className="text-gray-300 text-sm leading-relaxed"
                        >
                          I have read and agree to the website{" "}
                          <button
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="text-red-400 hover:text-red-300 underline font-semibold"
                          >
                            terms and conditions *
                          </button>
                        </label>
                      </div>
                      {errors.agreeToTerms &&
                        (touched.agreeToTerms || showErrors) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs ml-8"
                          >
                            {errors.agreeToTerms}
                          </motion.div>
                        )}
                    </div>
                  </motion.div>

                  {/* Payment Methods */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaCreditCard className="text-red-400" />
                      Payment Method
                    </h3>

                    {showCardPayment ? (
                      // Card Payment for other plans
                      <div className="space-y-4">
                        <div className="text-gray-300 mb-4">
                          <p className="text-sm">
                            Credit/Debit card payment will be available soon.
                          </p>
                        </div>
                        <div className="p-6 rounded-xl border-2 border-zinc-700 bg-zinc-800 opacity-50">
                          <div className="flex items-center gap-4">
                            <div className="bg-zinc-700 p-3 rounded-full">
                              <FaCreditCard className="text-white text-xl" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="text-white font-semibold text-lg">
                                Credit/Debit Card
                              </h4>
                              <p className="text-gray-400 text-sm">
                                Coming soon
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // UPI Payment Options for Red File
                      <div className="space-y-4">
                        <div className="text-gray-300 mb-4">
                          <p className="text-sm">
                            For the Red File plan, we accept UPI payments only:
                          </p>
                        </div>

                        {/* Cashfree Option */}
                        <motion.button
                          type="button"
                          onClick={() => setSelectedPaymentMethod("cashfree")}
                          className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                            selectedPaymentMethod === "cashfree"
                              ? "border-red-500 bg-red-500/10"
                              : "border-zinc-700 hover:border-zinc-600 bg-zinc-800"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-zinc-700 p-3 rounded-full">
                              <FaQrcode className="text-white text-xl" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="text-white font-semibold text-lg">
                                Cashfree UPI
                              </h4>
                              <p className="text-gray-400 text-sm">
                                Pay using any UPI app
                              </p>
                            </div>
                            {selectedPaymentMethod === "cashfree" && (
                              <FaCheck className="text-red-500 text-xl" />
                            )}
                          </div>
                        </motion.button>

                        {/* PhonePe Option */}
                        <motion.button
                          type="button"
                          onClick={() => setSelectedPaymentMethod("phonepe")}
                          className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                            selectedPaymentMethod === "phonepe"
                              ? "border-red-500 bg-red-500/10"
                              : "border-zinc-700 hover:border-zinc-600 bg-zinc-800"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-zinc-700 p-3 rounded-full">
                              <FaPhone className="text-white text-xl" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="text-white font-semibold text-lg">
                                PhonePe
                              </h4>
                              <p className="text-gray-400 text-sm">
                                Pay using PhonePe app
                              </p>
                            </div>
                            {selectedPaymentMethod === "phonepe" && (
                              <FaCheck className="text-red-500 text-xl" />
                            )}
                          </div>
                        </motion.button>
                      </div>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  {planSlug === "redfile" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handlePayment(selectedPaymentMethod!)}
                      disabled={!selectedPaymentMethod || isProcessing}
                      className={`w-full font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg flex items-center justify-center gap-3 ${
                        selectedPaymentMethod && !isProcessing
                          ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                          : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaLock className="text-xl" />
                          Pay INR {calculateFinalPrice()} via{" "}
                          {selectedPaymentMethod === "cashfree"
                            ? "Cashfree"
                            : selectedPaymentMethod === "phonepe"
                              ? "PhonePe"
                              : "UPI"}
                        </>
                      )}
                    </motion.button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTermsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Terms & Conditions
                </h2>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
                <p className="text-gray-400 mb-6">
                  Last updated on July 18th, 2025
                </p>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    1. Acceptance of Terms
                  </h3>
                  <p>
                    By using blueberriesfilms.com ("Service"), you agree to be
                    bound by these Terms and Conditions. If you do not agree,
                    please do not use our platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    2. Account Registration
                  </h3>
                  <p>
                    To access premium content, you must create an account. You
                    are responsible for maintaining the confidentiality of your
                    login credentials.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    3. Subscription and Payments
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Paid content requires a subscription.</li>
                    <li>
                      Prices and billing cycles are displayed at checkout.
                    </li>
                    <li>
                      You authorize us to charge your selected payment method.
                    </li>
                    <li>
                      Cancellation can be done anytime before the renewal date.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    4. Content Usage
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      All content on our platform is protected by copyright.
                    </li>
                    <li>
                      You may only stream for personal, non-commercial use.
                    </li>
                    <li>
                      Downloading, copying, or redistributing content is
                      prohibited.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    5. User Conduct
                  </h3>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Share your account with others.</li>
                    <li>Upload or distribute malware or illegal content.</li>
                    <li>
                      Attempt to bypass our content protections or
                      geo-restrictions.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    6. Termination
                  </h3>
                  <p>
                    We reserve the right to suspend or terminate your account
                    for violating these terms or misuse of the platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    7. Limitation of Liability
                  </h3>
                  <p>We are not liable for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Interruptions or technical issues.</li>
                    <li>Content accuracy or availability.</li>
                    <li>Third-party actions or services.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    8. Modifications to Service
                  </h3>
                  <p>
                    We may change or remove content, features, or prices at any
                    time without notice.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    9. Governing Law
                  </h3>
                  <p>These Terms are governed by the laws of India</p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    10. Contact Us
                  </h3>
                  <p>
                    For any issues or questions, reach us at:{" "}
                    <a
                      href="mailto:customer@blueberriesfilms.com"
                      className="text-red-400 hover:text-red-300"
                    >
                      customer@blueberriesfilms.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-700">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
