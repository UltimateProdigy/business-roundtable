import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import SponsorsSection from "../components/SponsorsSection";

export const metadata: Metadata = {
  title: "Call for Sponsors — Ibadan Business Roundtable",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        label="Call for Sponsors & Partners"
        title="Partner With"
        highlight="Ibadan's Finest."
        subtitle="Showcase your brand, financial products, or enterprise solutions directly to 300+ verified business owners and executives."
        imageSrc="/ibadan-landmarks.jpg"
        imageAlt="Sponsor the Ibadan Business Roundtable"
      />
      <SponsorsSection />
    </>
  );
}
