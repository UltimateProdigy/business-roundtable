import { CheckCircle2 } from "lucide-react";

const items = [
  "SME Owners, Retailers, and Merchants operating in Ibadan & environs",
  "Agribusiness, Food Processing & Manufacturing Entrepreneurs across Oyo State",
  "Tech Startup Founders, Agency Owners & Digital Service Providers",
  "Real Estate Developers, Hospitality Leaders & Logistics Operators",
  "Financial Institutions, Microfinance Banks, Investors & Business Consultants",
  "Aspiring Entrepreneurs ready to launch sustainable ventures in Ibadan",
];

export default function AudienceSection() {
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-secondary-light text-sm font-bold uppercase tracking-widest mb-4">
              Who Should Be in the Room?
            </span>
            <h2 className="text-4xl sm:text-5xl text-white leading-tight">
              This Roundtable is for You If…
            </h2>
            <p className="text-white/85 text-lg mt-4 leading-relaxed">
              Whether you run a fast-growing retail chain in Dugbe, a tech agency in
              Bodija, an agro-processing plant in Oluyole, or a hospitality brand in Ring
              Road — your seat at the table awaits.
            </p>
            <div className="mt-6 h-1.5 w-16 rounded-full bg-secondary" />
          </div>

          {/* Right: Checklist */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <CheckCircle2 size={20} className="text-secondary-light flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm sm:text-base leading-relaxed font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
