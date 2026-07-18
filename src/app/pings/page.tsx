import type { Metadata } from "next";
import PingPolicyClient from "./PingPolicyClient";

export const metadata: Metadata = {
  title: "Ping Policy",
  description: "arshnah's contact preferences and availability rules.",
  openGraph: {
    title: "Ping Policy · arshnah",
    description: "arshnah's contact preferences and availability rules.",
    url: "https://arshnah.in/pings",
    type: "website",
  },
  twitter: {
    title: "Ping Policy · arshnah",
    description: "arshnah's contact preferences and availability rules.",
  }
};

export default function PingsPage() {
  return <PingPolicyClient />;
}
