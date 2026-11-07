import {
  Handshake,
  Banknote,
  TrendingUp,
  Scale,
  Store,
  Users,
} from "lucide-react";

const perks = [
  {
    Icon: Handshake,
    title: "High-Level B2B Deal Room",
    description:
      "Connect directly with fellow business owners, suppliers, distributors, and corporate buyers across Ibadan to close real commercial partnerships.",
  },
  {
    Icon: Banknote,
    title: "Access to Capital & Grants",
    description:
      "Learn how to position your SME for low-interest BOI loans, angel investments, commercial credit lines, and regional development grants.",
  },
  {
    Icon: TrendingUp,
    title: "Scaling & Digital Systems",
    description:
      "Discover practical frameworks to automate operations, retain top talent in Ibadan, and expand customer acquisition beyond Oyo State.",
  },
  {
    Icon: Scale,
    title: "Tax, Policy & Regulatory Clarity",
    description:
      "Engage with tax consultants, legal experts, and public-private stakeholders on navigating Oyo State business regulations without friction.",
  },
  {
    Icon: Store,
    title: "Brand Exhibition & Spotlight",
    description:
      "Showcase your products and services to over 300 decision-makers, executives, and high-net-worth entrepreneurs in the room.",
  },
  {
    Icon: Users,
    title: "Ibadan Founders Network",
    description:
      "Connect with fellow entrepreneurs in the Ibadan Business Roundtable community for ongoing peer advisory, referrals, and commercial collaborations.",
  },
];

export default function PerksSection() {
  return (
    <section id="benefits" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            Why Attend?
          </span>
          <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight">
            Built for <span className="text-primary">Business Growth</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Every session at the Ibadan Business Roundtable is engineered to deliver measurable ROI for your enterprise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all group"
            >
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary-light transition-colors">
                <Icon size={22} className="text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
