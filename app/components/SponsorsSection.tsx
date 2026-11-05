"use client";

import { useState } from "react";
import {
  Check,
  Crown,
  Award,
  Sparkles,
  Store,
  Handshake,
  MessageCircle,
  CheckCircle2,
  Copy,
  CheckCheck,
  ShieldCheck,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import { supabase } from "@/lib/supabase";

export const sponsorTiers = [
  {
    name: "Headline / Platinum Partner",
    price: "₦1,000,000",
    badge: "Exclusive — 2 Slots",
    Icon: Crown,
    featured: true,
    perks: [
      "Co-branding as 'Ibadan Business Roundtable Powered by [Your Brand]'",
      "15-Minute Keynote / Executive Product Spotlight on the main stage",
      "Prime double-sized Exhibition Booth at the main entrance",
      "Full logo placement on all backdrops, stage banners, tags & media PR",
      "Direct access to B2B Deal Room + 5 VIP Executive Lunch passes",
      "Dedicated email & WhatsApp spotlight to 500+ registered business owners",
    ],
  },
  {
    name: "Gold Partner",
    price: "₦500,000",
    badge: "High Impact — 4 Slots",
    Icon: Award,
    featured: false,
    perks: [
      "Seat on an Industry Panel or 7-minute Sponsor Pitch Session",
      "Premium Exhibition Booth in the Networking & Deal Room Hall",
      "Prominent logo placement on event website, backdrop & brochure",
      "Inclusion of branded promotional materials inside delegate folders",
      "3 VIP Executive Lunch passes with speakers & investors",
    ],
  },
  {
    name: "Silver Partner",
    price: "₦250,000",
    badge: "Growth Partner",
    Icon: Sparkles,
    featured: false,
    perks: [
      "2-minute Brand Recognition & Spotlight by the Host",
      "Standard Exhibition Table to showcase products or services",
      "Logo featured on event website, digital flyers & roll-up banners",
      "2 VIP Executive Lunch passes",
    ],
  },
  {
    name: "Exhibition Booth Partner",
    price: "₦100,000",
    badge: "SME Showcase",
    Icon: Store,
    featured: false,
    perks: [
      "Dedicated Exhibition Stand in the B2B Marketplace area",
      "Direct sales & lead generation with 300+ Ibadan business owners",
      "Brand listing in the official Ibadan Business Directory",
      "1 VIP Executive Pass included",
    ],
  },
];

const SPONSOR_BANK_DETAILS = {
  bankName: "Guaranty Trust Bank (GT BANK)",
  accountName: "TEC Ibadan Special Event Account",
  accountNumber: "0865130525",
};

export default function SponsorsSection() {
  const [selectedTier, setSelectedTier] = useState("Gold Partner (₦500,000)");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedSponsor, setSubmittedSponsor] = useState<null | {
    companyName: string;
    contactName: string;
    tier: string;
  }>(null);

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(SPONSOR_BANK_DETAILS.accountNumber);
    setCopied(true);
    addToast({
      title: "Account Number Copied!",
      description: `${SPONSOR_BANK_DETAILS.accountNumber} copied to clipboard.`,
      color: "success",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSelectTier = (tierName: string, price: string) => {
    setSelectedTier(`${tierName} (${price})`);
    const formEl = document.getElementById("sponsor-inquiry-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.companyName.trim() || !form.contactName.trim() || !form.phone.trim()) {
        addToast({
          title: "Missing details",
          description: "Please fill in your company name, contact person, and phone number.",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("sponsor_inquiries").insert([
        {
          company_name: form.companyName.trim(),
          contact_name: form.contactName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          tier: selectedTier,
          message: form.message.trim(),
          status: "new",
        },
      ]);

      if (error) {
        console.error("Sponsor inquiry error:", error);
      }

      addToast({
        title: "Sponsorship Application Received! 🤝",
        description: "Our partnerships team will reach out shortly. You can also fast-track via WhatsApp below.",
        color: "success",
      });

      setSubmittedSponsor({
        companyName: form.companyName.trim(),
        contactName: form.contactName.trim(),
        tier: selectedTier,
      });
    } catch (err) {
      console.error(err);
      setSubmittedSponsor({
        companyName: form.companyName.trim(),
        contactName: form.contactName.trim(),
        tier: selectedTier,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="sponsors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary-light border border-secondary/30 rounded-full px-4 py-1.5 mb-4">
            <Handshake size={15} className="text-secondary" />
            <span className="text-secondary-dark text-xs font-bold uppercase tracking-widest">
              Call for Sponsors & Ecosystem Partners
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
            Put Your Brand in Front of{" "}
            <span className="text-primary">Ibadan&apos;s Decision Makers</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Partner with Vantage Forum at the Ibadan Business Roundtable to position
            your bank, fintech, real estate firm, telecom, logistics company, or
            enterprise brand directly before 300+ verified business owners and CEOs.
          </p>
        </div>

        {/* Sponsorship Tiers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
                tier.featured
                  ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 lg:-translate-y-2"
                  : "bg-slate-50 text-slate-900 border-slate-200/80 hover:border-primary/40 hover:shadow-lg"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      tier.featured
                        ? "bg-secondary text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <tier.Icon size={22} />
                  </div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tier.featured
                        ? "bg-white/20 text-white"
                        : "bg-secondary-light text-secondary-dark"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3
                  className={`text-2xl mb-1 ${
                    tier.featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-3xl font-extrabold font-mono mb-6 ${
                    tier.featured ? "text-secondary-light" : "text-primary"
                  }`}
                >
                  {tier.price}
                </p>

                <div className="space-y-3 mb-8">
                  {tier.perks.map((perk) => (
                    <div key={perk} className="flex items-start gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          tier.featured
                            ? "bg-secondary text-white"
                            : "bg-primary text-white"
                        }`}
                      >
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span
                        className={`text-xs sm:text-sm leading-relaxed ${
                          tier.featured ? "text-white/90" : "text-slate-600"
                        }`}
                      >
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectTier(tier.name, tier.price)}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  tier.featured
                    ? "bg-secondary text-white hover:bg-secondary-dark shadow-md"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Select {tier.name.split(" ")[0]} Tier →
              </button>
            </div>
          ))}
        </div>

        {/* Sponsor Application & Fast-Track Box */}
        <div
          id="sponsor-inquiry-form"
          className="bg-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-xl"
        >
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest">
                Become an Official Partner
              </span>
              <h3 className="text-3xl sm:text-4xl text-white leading-tight">
                Ready to Sponsor or Exhibit at the Roundtable?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Fill out the sponsorship form or reach our partnerships desk directly. We also offer custom partnership packages for Financial Institutions, Government Agencies, Media Houses, and Tech Ecosystem Enablers.
              </p>

              <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Direct Partnerships Desk
                </p>
                <p className="text-sm text-slate-200">
                  Phone / WhatsApp: <strong>+234 810 080 1513</strong>
                </p>
                <p className="text-sm text-slate-200">
                  Email: <strong>roundtable@elevatehub.com</strong>
                </p>
              </div>
            </div>

            {/* Right Form or Confirmation */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8">
              {submittedSponsor ? (
                <div className="py-4 text-center space-y-5">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={34} className="text-primary" />
                  </div>
                  <h4 className="text-2xl text-slate-900">
                    Thank You, {submittedSponsor.companyName}! 🤝
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    We have recorded your interest in the{" "}
                    <strong className="text-primary">{submittedSponsor.tier}</strong> package.
                    You can proceed via bank transfer below or message our Sponsorship Desk on WhatsApp for your official invoice & sponsorship deck.
                  </p>

                  {/* Bank Details Box */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Official Sponsorship Account
                      </span>
                      <span className="bg-secondary-light text-secondary-dark text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {submittedSponsor.tier}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-slate-400">Bank Name</p>
                        <p className="font-bold text-slate-900 text-sm">
                          {SPONSOR_BANK_DETAILS.bankName}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">Account Name</p>
                        <p className="font-bold text-slate-900 text-sm">
                          {SPONSOR_BANK_DETAILS.accountName}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">Account Number</p>
                        <p className="font-mono text-lg font-bold text-primary">
                          {SPONSOR_BANK_DETAILS.accountNumber}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {copied ? <CheckCheck size={14} className="text-green-600" /> : <Copy size={14} />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">
                      <ShieldCheck size={14} className="inline mr-1 text-primary" />
                      Narration: <strong>IBR Sponsor - {submittedSponsor.companyName}</strong>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/2348100801513?text=${encodeURIComponent(
                        `Hello Vantage Forum Team! I just submitted a sponsorship inquiry for ${submittedSponsor.companyName} (${submittedSponsor.tier}). My name is ${submittedSponsor.contactName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition"
                    >
                      <MessageCircle size={18} />
                      Chat with Sponsorship Desk on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedSponsor(null)}
                      className="px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-2xl text-slate-900 mb-2">
                    Sponsor / Exhibitor Inquiry Form
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company / Brand Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        placeholder="e.g. CrestView Consulting Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Person & Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        placeholder="e.g. Kunle Adebayo (MD)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Official Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="partner@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+234 803 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Sponsorship / Exhibition Package
                    </label>
                    <select
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value="Headline / Platinum Partner (₦1,000,000)">
                        Headline / Platinum Partner (₦1,000,000)
                      </option>
                      <option value="Gold Partner (₦500,000)">
                        Gold Partner (₦500,000)
                      </option>
                      <option value="Silver Partner (₦250,000)">
                        Silver Partner (₦250,000)
                      </option>
                      <option value="Exhibition Booth Partner (₦100,000)">
                        Exhibition Booth Partner (₦100,000)
                      </option>
                      <option value="Custom / Media / Ecosystem Partnership">
                        Custom / Media / Ecosystem Partnership
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Notes or Specific Partnership Goals (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how you'd like to engage the 300+ business owners..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Submitting Application..." : "Submit Sponsorship Inquiry →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
