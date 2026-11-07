import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Link from "next/link";
import { Target, Handshake, TrendingUp, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Ibadan Business Roundtable",
};

const pillars = [
  {
    Icon: Handshake,
    title: "Local B2B Synergy",
    desc: "Connecting Ibadan-based suppliers, service providers, and producers so value stays and circulates within our regional economy.",
  },
  {
    Icon: TrendingUp,
    title: "Capital & Credit Readiness",
    desc: "Demystifying institutional funding, BOI facilities, angel capital, and smart financial structuring for growing SMEs.",
  },
  {
    Icon: Target,
    title: "Operational Excellence",
    desc: "Equipping founders with modern digital tools, governance structures, and talent retention strategies that work in Ibadan.",
  },
  {
    Icon: ShieldCheck,
    title: "Policy & Tax Navigation",
    desc: "Creating a constructive bridge between business owners, financial advisors, and regulatory stakeholders in Oyo State.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="The Mandate"
        title="Unlocking Ibadan's"
        highlight="Commercial Power."
        subtitle="A curated boardroom gathering for business owners, founders, and investors across Ibadan and its environs."
        imageSrc="/ibadan-real-landscape.jpg"
        imageAlt="Real aerial view of Mapo Hall and Ibadan brown rooftops"
      />

      {/* Story & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
                Why Ibadan? Why Now?
              </span>
              <h2 className="text-3xl sm:text-4xl text-slate-900 mb-6">
                West Africa&apos;s Largest Indigenous City is Ready for{" "}
                <span className="text-primary">Exponential Scale</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  From the bustling commercial corridors of Dugbe, Ring Road, and Bodija
                  to the industrial estates of Oluyole and the emerging agrarian hubs of
                  Moniya, Ido, and Eleyele — Ibadan is home to thousands of resilient,
                  high-potential enterprises.
                </p>
                <p>
                  Yet many business owners operate in silos, missing out on local supply
                  chain partnerships, low-cost expansion capital, and digital systems that
                  could triple their output.
                </p>
                <p>
                  The <strong>Ibadan Business Roundtable</strong> hosted by{" "}
                  <strong>The Elevation Church, Ibadan</strong> was created to close that
                  gap — bringing 300+ decision-makers into one room for candid strategy,
                  B2B matchmaking, and actionable growth.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-light/60 via-white to-secondary-light/60 rounded-3xl p-8 border border-primary/20 space-y-5">
              <div className="bg-primary rounded-2xl p-6 text-white">
                <p className="text-secondary-light text-xs font-bold uppercase tracking-widest mb-2">
                  Our Mission
                </p>
                <p className="text-lg leading-relaxed">
                  To catalyze profitable collaborations, capital access, and sustainable
                  corporate governance among business owners across Ibadan and its
                  environs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                  Geographic Coverage
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Open to founders and enterprise leaders across Ibadan metropolis and
                  neighboring economic corridors:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Bodija",
                    "Dugbe & Jericho",
                    "Ring Road & Oluyole",
                    "Akobo & Iwo Road",
                    "Challenge & Felele",
                    "Moniya & Ojoo",
                    "Eleyele & Apata",
                    "Oyo, Iseyin & Environs",
                  ].map((zone) => (
                    <span
                      key={zone}
                      className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-700"
                    >
                      <MapPin size={11} className="text-secondary" />
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-3">
              Key Focus Areas
            </span>
            <h2 className="text-3xl sm:text-4xl text-slate-900">
              Four Pillars of the <span className="text-primary">Roundtable</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all group"
              >
                <div className="w-11 h-11 bg-primary-light rounded-xl flex items-center justify-center mb-4 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Attendees Walk Away With */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white">
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">
              Tangible Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl text-white mt-2 mb-6">
              What Every Business Owner Walks Away With
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Inclusion in the Digital Ibadan Business Directory (300+ verified companies)",
                "Actionable checklist for accessing BOI, development grants & commercial credit",
                "Direct introductions to B2B vendors, logistics partners, and wholesale buyers",
                "Practical tax & compliance templates tailored to Oyo State enterprises",
                "Networking and collaboration opportunities with fellow Oyo State entrepreneurs",
                "Priority invitations to quarterly executive breakfasts and investor pitch days",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/90 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all"
              >
                Register Now
              </Link>
              <Link
                href="/sponsors"
                className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary-dark transition-all"
              >
                Explore Sponsorship Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
