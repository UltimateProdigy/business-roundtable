import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import RegistrationSection from "../components/RegistrationSection";

export const metadata: Metadata = {
  title: "Register — Ibadan Business Roundtable",
};

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        label="Seat Registration"
        title="Reserve Your"
        highlight="Seat."
        subtitle="Register your business below to attend the Ibadan Business Roundtable and connect with 300+ founders, executives, and investors."
        imageSrc="/ibadan-real-landscape.jpg"
        imageAlt="Register for Ibadan Business Roundtable"
      />
      <RegistrationSection />
    </>
  );
}
