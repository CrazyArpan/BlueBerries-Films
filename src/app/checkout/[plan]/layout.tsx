import React from 'react';

interface GenerateMetadataProps {
  params: Promise<{ plan: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { plan } = await params;
  const planNames: Record<string, string> = {
    basic: "Basic Plan",
    premium: "Premium Plan",
    standard: "Standard Plan",
    yearly: "Yearly Membership",
    redfile: "Red File"
  };
  const planName = planNames[plan] || "Checkout";
  return {
    title: `${planName} Checkout - BlueBerries Films`
  };
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
} 