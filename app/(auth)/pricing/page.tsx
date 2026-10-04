// app/(auth)/pricing/page.tsx (Server Component)

import React from "react";
import { Metadata } from "next";
import PricingClient from "./PricingClient";
import { buildPageMetadata } from "@/lib/og/buildMetadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Trooper Pricing — $25 per human",
  description:
    "One seat per person, $25 a month. Unlimited messaging, calls, and research. Bring your own Claude, ChatGPT, or API keys. Model usage stays on your account.",
  canonical: "https://trooper.so/pricing",
  ogKind: "page",
  ogSlug: "pricing",
});

export default function PricingPage() {
  return <PricingClient />;
}
