import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import SpeakersSection from "../components/SpeakersSection";

export const metadata: Metadata = {
  title: "Speakers — Ibadan Business Roundtable",
};

export default function SpeakersPage() {
  return (
    <>
      <PageHeader
        label="Featured Speakers"
        title="Meet Our"
        highlight="Speakers."
        subtitle="Meet the accomplished leaders, finance coaches, and enterprise builders speaking at the Ibadan Business Roundtable."
        imageSrc="/ibadan-real-landscape.jpg"
        imageAlt="Ibadan Business Roundtable Speakers"
      />
      <SpeakersSection />
    </>
  );
}
