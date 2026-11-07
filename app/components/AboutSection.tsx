import Link from "next/link";
import { TrendingUp, Handshake, ShieldCheck, Building2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
              About Vantage Forum
            </span>
            <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight mb-6">
              Shaping the Future of{" "}
              <span className="text-primary">Business in Ibadan.</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Hosted by <strong>Vantage Forum</strong>, the{" "}
                <strong>Ibadan Business Roundtable</strong> is a high-level interactive
                summit designed specifically for business owners, founders, merchants, and
                enterprise leaders operating in Ibadan and surrounding towns across Oyo
                State.
              </p>
              <p>
                From the commercial nerve centers of Dugbe, Bodija, and Ring Road to the
                industrial corridors of Oluyole and Challenge, this boardroom-style forum
                dissects real operational challenges — unlocking growth capital, tax
                clarity, digital transformation, and local B2B deals.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/register"
                className="bg-primary text-white px-7 py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Register Now
              </Link>
              <Link
                href="/sponsors"
                className="text-secondary border-2 border-secondary px-7 py-3.5 rounded-xl font-bold hover:bg-secondary-light transition-all"
              >
                Partner / Sponsor Us
              </Link>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-light/60 via-white to-secondary-light/60 rounded-3xl p-8 border border-primary/20 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    value: "B2B Deals",
                    label: "Strategic Matchmaking",
                    Icon: Handshake,
                  },
                  {
                    value: "Capital",
                    label: "Funding & Grants Access",
                    Icon: TrendingUp,
                  },
                  {
                    value: "Ibadan Hub",
                    label: "Local Market Mastery",
                    Icon: Building2,
                  },
                  {
                    value: "Resilience",
                    label: "Policy & Tax Clarity",
                    Icon: ShieldCheck,
                  },
                ].map(({ value, label, Icon }) => (
                  <div
                    key={label}
                    className="bg-white rounded-2xl p-5 border border-slate-100 text-center shadow-2xs"
                  >
                    <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-2.5 text-primary">
                      <Icon size={20} />
                    </div>
                    <p className="font-bold text-lg text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Quote block */}
              <div className="bg-primary rounded-2xl p-6 text-white shadow-md shadow-primary/20">
                <p className="text-sm sm:text-base italic leading-relaxed opacity-95">
                  &ldquo;When business owners in Ibadan sit at the same table to share
                  insights, pool resources, and patronize one another, the entire regional
                  economy rises.&rdquo;
                </p>
                <p className="text-xs font-bold mt-3 text-secondary-light uppercase tracking-wider">
                  — Vantage Forum · Ibadan Business Roundtable
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-secondary/35 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary-light -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
