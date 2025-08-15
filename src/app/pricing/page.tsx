export const metadata = {
  title: "Pricing Plans - BlueBerries Films"
};

import PricingCards from "./PricingCards";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 flex items-center justify-center py-12 px-2 mt-20">
        <PricingCards />
      </div>
    </div>
  );
} 