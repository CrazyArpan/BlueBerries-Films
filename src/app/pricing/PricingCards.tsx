"use client";

import { FaCheck, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Red File",
    price: "INR 49",
    period: "/ Lifetime",
    features: [
      { label: "Ads free movies and shows", included: true },
      { label: "Watch on TV or Laptop", included: true },
      { label: "Streamit special", included: true },
      { label: "Max video quality", included: false },
    ],
    button: "Checkout",
    highlight: false,
    oldPrice: null,
    save: null,
    slug: "redfile",
  },
];

export default function PricingCards() {
  const router = useRouter();

  const renderPlanCard = (plan: any) => (
    <div
      key={plan.name}
      className={`relative flex flex-col w-full max-w-sm rounded-xl shadow-lg border border-neutral-800 bg-zinc-900 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 hover:border-red-500/50 ${plan.highlight ? "ring-2 ring-red-600" : ""}`}
    >
      {plan.save && (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center py-2 font-semibold text-sm z-10">
          {plan.save}
        </div>
      )}
      <div
        className={`flex-1 flex flex-col items-center justify-center p-8 pt-${plan.save ? "16" : "8"} transition-all duration-300 hover:bg-zinc-800/50`}
      >
        <h2 className="text-xl font-semibold mb-4 transition-all duration-300 hover:text-red-400">
          {plan.name}
        </h2>
        <div className="flex items-end gap-2 mb-2">
          {plan.oldPrice && (
            <span className="text-2xl text-red-400 line-through transition-all duration-300">
              {plan.oldPrice}
            </span>
          )}
          <span className="text-4xl font-bold transition-all duration-300 hover:text-red-400">
            {plan.price}
          </span>
          <span className="text-lg text-gray-300 font-normal transition-all duration-300">
            {plan.period}
          </span>
        </div>
        {plan.highlight && (
          <div className="text-gray-300 text-center text-sm mb-4 transition-all duration-300 hover:text-yellow-400">
            Enjoy all the benefits of Streamit
          </div>
        )}
      </div>
      <div className="bg-neutral-900 px-8 py-6 flex flex-col gap-3 border-t border-neutral-800 transition-all duration-300 hover:bg-neutral-800">
        <ul className="flex flex-col gap-3 mb-6">
          {plan.features.map((feature: any, i: number) => (
            <li
              key={i}
              className="flex items-center gap-3 text-base transition-all duration-300 hover:translate-x-2"
            >
              {feature.included ? (
                <FaCheck className="text-green-500 transition-all duration-300 hover:scale-110" />
              ) : (
                <FaTimes className="text-red-500 transition-all duration-300 hover:scale-110" />
              )}
              <span className="transition-all duration-300 hover:text-gray-200">
                {feature.label}
                {feature.code && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-bold tracking-wider">
                    {feature.code}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 animate-pulse"
          onClick={() => router.push(`/checkout/${plan.slug}`)}
        >
          {plan.button}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 items-center justify-center">
      {plans.map(renderPlanCard)}
    </div>
  );
}
