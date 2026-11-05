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
  Sparkles,
} from "lucide-react";
import { addToast } from "@heroui/toast";
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

const businessRoles = [
  "Founder / CEO / Managing Director",
  "Co-Founder / Business Partner",
  "General Manager / Operations Lead",
  "Investor / Financier / Ecosystem Enabler",
  "Aspiring Business Owner",
];

const highlights = [
  "Free Standard Business Pass for verified Ibadan business owners",
  "Access to Keynote Sessions, Industry Panels & Breakout Roundtables",
  "Join the official Ibadan Business Owners WhatsApp Network",
  "Optional VIP Executive & Exhibition Pass (₦25,000) with Deal Room & VIP Lunch",
];

const BANK_DETAILS = {
  bankName: "Guaranty Trust Bank (GT BANK)",
  accountName: "TEC Ibadan Special Event Account",
  accountNumber: "0865130525",
  amount: "₦25,000",
};

const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/LM57lwiFGkY5dFvQUqdr2Z?mode=gi_t";

function RegistrationSectionContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    name: string;
    businessName: string;
    isVip: boolean;
    vipOption?: string;
  }>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    industry: "",
    businessRole: "Founder / CEO / Managing Director",
    isVip: false,
    vipOption: "VIP Executive Lunch + Deal Room Access",
    expectations: "",
  });

  useEffect(() => {
    if (searchParams.get("vip") === "true") {
      setForm((prev) => ({ ...prev, isVip: true }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.name.trim() || !form.email.trim() || !form.businessName.trim()) {
        addToast({
          title: "Missing details",
          description: "Please enter your full name, email, and business name.",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("roundtable_registrations").insert([
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          business_name: form.businessName.trim(),
          industry: form.industry || "General Business",
          business_role: form.businessRole,
          pass_type: form.isVip ? "vip" : "standard",
          amount: form.isVip ? 25000 : 0,
          payment_status: form.isVip ? "pending" : "free",
          expectations: form.expectations.trim() || (form.isVip ? form.vipOption : ""),
        },
      ]);

      if (error) {
        console.error("Registration insert error:", error);
      }

      addToast({
        title: form.isVip
          ? "VIP Registration Initiated! 🌟"
          : "Seat Reserved at the Roundtable! 🎉",
        description: form.isVip
          ? "Please complete your VIP / Exhibition pass transfer below."
          : "Join our official Ibadan Business Owners WhatsApp community below.",
        color: "success",
      });

      setSubmissionSuccess({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        isVip: form.isVip,
        vipOption: form.vipOption,
      });
    } catch (err) {
      console.error(err);
      setSubmissionSuccess({
        name: form.name.trim(),
        businessName: form.businessName.trim(),
        isVip: form.isVip,
        vipOption: form.vipOption,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="lg:sticky lg:top-28">
            <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
              Seat Registration
            </span>
            <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
              Take Your Seat at the{" "}
              <span className="text-primary">Roundtable.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Register your business for the upcoming Ibadan Business Roundtable.
              Whether you are attending with our complimentary Standard Business Pass
              or upgrading to the VIP Executive & Deal Room Pass, you&apos;ll be in the
              room with Oyo State&apos;s most driven entrepreneurs.
            </p>

            <div className="space-y-4 mb-8">
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

            <div className="bg-primary rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 text-secondary-light text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles size={14} />
                <span>Why Register Early?</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                Registered businesses are listed in our digital{" "}
                <strong>Ibadan Business Roundtable Matchmaking Directory</strong> shared
                with all attendees, speakers, and sponsors before event day.
              </p>
            </div>
          </div>

          {/* Right Column: Form or Success Screen */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            {submissionSuccess ? (
              <div className="py-4 text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <CheckCircle2 size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl text-slate-900 mb-1">
                  Welcome, {submissionSuccess.name}! 🎉
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">
                  Representing {submissionSuccess.businessName}
                </p>

                {submissionSuccess.isVip ? (
                  /* VIP Payment Instructions */
                  <div className="mt-6 text-left space-y-6">
                    <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-secondary/40 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          VIP Executive Pass Payment
                        </span>
                        <span className="bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {BANK_DETAILS.amount}
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
                            className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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
                        Please use <strong>IBR - {submissionSuccess.businessName}</strong> as
                        your transfer narration for instant verification.
                      </p>
                    </div>

                    {/* WhatsApp Proof & Community Links */}
                    <div className="space-y-3">
                      <a
                        href={`https://wa.me/2348100801513?text=${encodeURIComponent(
                          `Hello Vantage Forum! I just registered for the VIP Executive Pass (${submissionSuccess.vipOption}) for my business "${submissionSuccess.businessName}". My name is ${submissionSuccess.name} and I'm sending my proof of payment.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/20"
                      >
                        <MessageCircle size={18} />
                        Send Proof of Payment on WhatsApp
                      </a>

                      <a
                        href={WHATSAPP_GROUP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-secondary text-white hover:bg-secondary-dark font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                      >
                        Join Ibadan Business Owners WhatsApp Group{" "}
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Standard Free Pass Confirmation */
                  <div className="mt-6 space-y-4">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Your seat for <strong>{submissionSuccess.businessName}</strong> is
                      confirmed for the Ibadan Business Roundtable! Join our official
                      WhatsApp network below to connect with fellow Ibadan business owners
                      and receive venue updates & speaker materials.
                    </p>
                    <a
                      href={WHATSAPP_GROUP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md shadow-green-600/20"
                    >
                      <MessageCircle size={20} />
                      Join Business Owners WhatsApp Network
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      className="text-xs font-semibold text-slate-400 hover:text-primary underline cursor-pointer mt-2"
                    >
                      Register another business representative
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl sm:text-3xl text-slate-900 mb-6">
                  Register for Ibadan Business Roundtable
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
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
                      placeholder="e.g. Adesola Ogunlana"
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
                      placeholder="e.g. Bodija Mart & Logistics"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
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
                      placeholder="founder@yourbusiness.com"
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
                      placeholder="+234 803 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Business Sector / Industry <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="industry"
                      required
                      value={form.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition cursor-pointer"
                    >
                      <option value="" disabled>
                        Select your sector...
                      </option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Your Role in the Business <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="businessRole"
                      required
                      value={form.businessRole}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition cursor-pointer"
                    >
                      {businessRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Key Business Goal / Question for the Panel (Optional)
                  </label>
                  <input
                    type="text"
                    name="expectations"
                    value={form.expectations}
                    onChange={handleChange}
                    placeholder="e.g. Accessing SME expansion credit, B2B distribution in Oyo State..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* VIP & Exhibition Upgrade Option Toggle */}
                <div className="bg-secondary-light rounded-2xl p-4 border border-secondary/40 space-y-3">
                  <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="isVip"
                      name="isVip"
                      checked={form.isVip}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary rounded cursor-pointer mt-1 sm:mt-0"
                    />
                    <span className="text-sm font-bold text-slate-900">
                      Upgrade to VIP Executive / Product Showcase Pass (₦25,000)
                    </span>
                  </label>

                  {form.isVip && (
                    <div className="pt-2 border-t border-secondary/30">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-primary-dark mb-1.5">
                        Select VIP Preference:
                      </label>
                      <select
                        name="vipOption"
                        value={form.vipOption}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition cursor-pointer"
                      >
                        <option value="VIP Executive Lunch + Deal Room Access">
                          VIP Executive Lunch + Front-Row Seating + Deal Room Access
                        </option>
                        <option value="Mini Product Display Table + VIP Pass">
                          Mini Product / Service Display Table + VIP Executive Pass
                        </option>
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
                    ? "Registering Your Business..."
                    : form.isVip
                    ? "Proceed to VIP Pass Payment Details →"
                    : "Complete Free Registration & Join Network →"}
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  Strictly for business owners, founders, and enterprise professionals in Ibadan & environs.
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
