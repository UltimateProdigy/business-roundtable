import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Ibadan Business Roundtable",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Organizing Secretariat"
        title="Get In"
        highlight="Touch."
        subtitle="Have inquiries about attendance, corporate tables, exhibition booths, or sponsorship? We'd love to hear from you."
        imageSrc="/ibadan-landmarks.jpg"
        imageAlt="Contact Ibadan Business Roundtable Secretariat"
      />
      <ContactSection />
    </>
  );
}
