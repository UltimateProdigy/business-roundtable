"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Check,
  CheckCircle2,
  Copy,
  CheckCheck,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { addToast } from "@/app/components/ToastWrapper";
import { supabase } from "@/lib/supabase";

const industries = [
  "Retail, Wholesale & FMCG Commerce",
  "Agribusiness & Food Processing",
  "Tech, Software & Digital Agency",
  "Real Estate, Construction & Property",
  "Manufacturing & Industrial Production",
  "Hospitality, Events & Food Business",
  "Logistics, Transport & Supply Chain",
  "Finance, Banking, Tax & Consulting",
  "Healthcare, Pharmacy & Wellness",
  "Fashion, Beauty & Creative Enterprise",
  "Education & Training Institution",
  "Other Business Sector",
];

const sponsorPackages = [
  {
    label: "Gold Partner — ₦10,000 (Logo on backdrop)",
    value: "Gold Partner",
    amount: 10000,
    displayAmount: "₦10,000",
  },
  {
    label: "Silver Partner — ₦20,000 (Logo + Exhibition space)",
    value: "Silver Partner",
    amount: 20000,
    displayAmount: "₦20,000",
  },
  {
    label: "Platinum Partner — ₦50,000 (Logo + Exhibition + 3-min Video)",
    value: "Platinum Partner",
    amount: 50000,
    displayAmount: "₦50,000",
  },
  {
    label: "Diamond Partner — ₦100,000 (Bigger Logo + Exhibition + 5-min Presentation)",
    value: "Diamond Partner",
    amount: 100000,
    displayAmount: "₦100,000",
  },
];

const highlights = [
  "Free registration to attend the Ibadan Business Roundtable",
  "Access to Keynote Sessions, Industry Panels & Breakout Roundtables",
  "Direct networking with 300+ business owners, executives & investors in Ibadan",
  "Optional Partnership & Sponsorship packages available (₦10,000 – ₦100,000)",
];

const BANK_DETAILS = {
  bankName: "Guaranty Trust Bank (GT BANK)",
  accountName: "TEC Ibadan Special Event Account",
  accountNumber: "0865130525",
};

const WHATSAPP_NUMBER = "2348105008260";

function RegistrationSectionContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    name: string;
    businessName: string;
    isSponsor: boolean;
    tier: string;
    displayAmount: string;
  }>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    industry: "",
    isSponsor: false,
    tier: "Gold Partner",
  });

  useEffect(() => {
    const sponsorParam = searchParams.get("sponsor");
    const tierParam = searchParams.get("tier");
    if (sponsorParam === "true") {
      setForm((prev) => ({
        ...prev,
        isSponsor: true,
        tier: tierParam || prev.tier,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    addToast({
      title: "Account Number Copied!",
      description: `${BANK_DETAILS.accountNumber} copied to clipboard.`,
      color: "success",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const selectedPackage =
    sponsorPackages.find((p) => p.value === form.tier) || sponsorPackages[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.name.trim() || !form.email.trim()) {
        addToast({
          title: "Missing details",
          description: "Please enter your full name and email address.",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      // 1. If user checked Sponsor/Partner, record in sponsor_inquiries table
      if (form.isSponsor) {
        const { error: sponsorError } = await supabase
          .from("sponsor_inquiries")
          .insert([
            {
              company_name: form.businessName.trim() || form.name.trim(),
              contact_name: form.name.trim(),
              email: form.email.trim(),
              phone: form.phone.trim(),
              tier: `${selectedPackage.value} (${selectedPackage.displayAmount})`,
              message: `Industry: ${form.industry || "General Business"}`,
              status: "new",
            },
          ]);

        if (sponsorError) {
          console.error("Sponsor insert error:", sponsorError);
        }
      }

      // 2. Always record user in roundtable_registrations table
      const { error: regError } = await supabase
        .from("roundtable_registrations")
        .insert([
          {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            business_name: form.businessName.trim() || "Individual / Business",
            industry: form.industry || "General Business",
            business_role: "Business Owner / Representative",
            pass_type: form.isSponsor ? "vip" : "standard",
            amount: form.isSponsor ? selectedPackage.amount : 0,
            payment_status: form.isSponsor ? "pending" : "free",
            expectations: form.isSponsor
              ? `${selectedPackage.value} (${selectedPackage.displayAmount})`
              : "",
          },
        ]);

      if (regError) {
        console.error("Registration insert error:", regError);
      }

      addToast({
        title: form.isSponsor
          ? "Partnership Registration Started!"
          : "Registration Confirmed! 🎉",
        description: form.isSponsor
          ? "Please proceed with your partnership payment details below."
          : "Your seat for the Ibadan Business Roundtable has been reserved.",
        color: "success",
      });

      setSubmissionSuccess({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        isSponsor: form.isSponsor,
        tier: selectedPackage.value,
        displayAmount: selectedPackage.displayAmount,
      });
    } catch (err) {
      console.error(err);
      setSubmissionSuccess({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        isSponsor: form.isSponsor,
        tier: selectedPackage.value,
        displayAmount: selectedPackage.displayAmount,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
              Seat & Partnership Registration
            </span>
            <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
              Ready to Be <span className="text-primary">Global Ready?</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Register today for the Ibadan Business Roundtable. Whether you want to
              attend for free or showcase your brand as an official Sponsor & Partner,
              you&apos;re in the right place.
            </p>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form or Success Screen */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            {submissionSuccess ? (
              <div className="py-4 text-center">
                <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <CheckCircle2 size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl text-slate-900 mb-2">
                  Welcome, {submissionSuccess.name}! 🎉
                </h3>

                {submissionSuccess.isSponsor ? (
                  /* Partnership & Sponsorship Payment Instructions (ElevateHub style) */
                  <div className="mt-6 text-left space-y-6">
                    <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-secondary/40 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {submissionSuccess.tier} Payment Details
                        </span>
                        <span className="bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {submissionSuccess.displayAmount}
                        </span>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700">
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Bank Name</p>
                          <p className="font-semibold text-slate-900">
                            {BANK_DETAILS.bankName}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400 font-medium">Account Name</p>
                          <p className="font-semibold text-slate-900">
                            {BANK_DETAILS.accountName}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-400 font-medium">
                              Account Number
                            </p>
                            <p className="font-mono text-lg font-bold text-primary tracking-wider">
                              {BANK_DETAILS.accountNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyAccount}
                            className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                          >
                            {copied ? (
                              <CheckCheck size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                        <ShieldCheck size={14} className="inline mr-1 text-primary" />
                        Please use your <strong>full name or business name</strong> (
                        {submissionSuccess.businessName || submissionSuccess.name}) as the
                        payment narration so we can identify your transfer quickly.
                      </p>
                    </div>

                    {/* WhatsApp Proof Link */}
                    <div className="space-y-3">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hi Ibadan Business Roundtable! I just registered for the ${submissionSuccess.tier} (${submissionSuccess.displayAmount}) package and I'm ready to send my proof of payment. My name is ${submissionSuccess.name}${
                            submissionSuccess.businessName
                              ? ` (${submissionSuccess.businessName})`
                              : ""
                          }.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/20"
                      >
                        <MessageCircle size={18} />
                        Send Proof of Payment on WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={() => setSubmissionSuccess(null)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Register Another Representative
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Free Seat Confirmation */
                  <div className="mt-6 space-y-5">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Your seat for{" "}
                      <strong>
                        {submissionSuccess.businessName || submissionSuccess.name}
                      </strong>{" "}
                      is officially reserved for the{" "}
                      <strong>Ibadan Business Roundtable</strong>!
                    </p>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs sm:text-sm text-slate-600 space-y-1.5">
                      <p>
                        <strong className="text-slate-900">Date:</strong> Saturday, 5th
                        December 2026
                      </p>
                      <p>
                        <strong className="text-slate-900">Time:</strong> 10:00 AM
                      </p>
                      <p>
                        <strong className="text-slate-900">Venue:</strong> PISTIS HUB, The
                        Elevation Church, Mobil, Ring Road, Ibadan (Landmark: Energy Switch
                        Filling Station)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer"
                    >
                      Register Another Representative
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl text-slate-900 mb-6">
                  Register for Ibadan Business Roundtable
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Samuel Adeleke"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Business / Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="e.g. CrestView Enterprises"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    WhatsApp Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0810 500 8260"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Business Sector / Industry <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="industry"
                    required
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select your business sector...
                    </option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Partnership & Sponsorship Option Toggle (ElevateHub Bootcamp Toggle Style) */}
                <div className="bg-secondary-light/70 rounded-2xl p-4 border border-secondary/40 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="isSponsor"
                      name="isSponsor"
                      checked={form.isSponsor}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                    <span className="text-sm font-bold text-slate-900">
                      I want to register as a Sponsor / Partner (₦10,000 – ₦100,000)
                    </span>
                  </label>

                  {form.isSponsor && (
                    <div className="pt-2 border-t border-secondary/30">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                        Select Your Preferred Partnership Tier:
                      </label>
                      <select
                        name="tier"
                        value={form.tier}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition cursor-pointer"
                      >
                        {sponsorPackages.map((pkg) => (
                          <option key={pkg.value} value={pkg.value}>
                            {pkg.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 cursor-pointer mt-2"
                >
                  {loading
                    ? "Processing..."
                    : form.isSponsor
                    ? "Proceed to Partnership Payment Details →"
                    : "Complete Registration →"}
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  No spam. Strictly event updates & business resources.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RegistrationSection() {
  return (
    <Suspense
      fallback={
        <div className="py-24 bg-slate-50 text-center text-slate-400">
          Loading registration form...
        </div>
      }
    >
      <RegistrationSectionContent />
    </Suspense>
  );
}
