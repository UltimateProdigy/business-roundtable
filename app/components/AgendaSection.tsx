import Link from "next/link";
import { Clock, Coffee, Mic, Users, Handshake, Sparkles, MapPin, Calendar } from "lucide-react";

const schedule = [
  {
    time: "08:30 AM – 09:30 AM",
    title: "Accreditation, Executive Breakfast & Red Carpet Networking",
    description:
      "Arrival of business owners, founder introductions, exhibition booth tours, and curated B2B speed-networking over coffee.",
    Icon: Coffee,
    badge: "Networking",
    color: "bg-primary-light/60 border-primary/20",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    time: "09:30 AM – 10:30 AM",
    title: "Opening Keynote: Building Resilient & Scalable Enterprises in Ibadan",
    description:
      "Unpacking macroeconomic realities, digital transformation, and untapped market opportunities across Oyo State's commercial corridors.",
    Icon: Mic,
    badge: "Keynote Session",
    color: "bg-secondary-light border-secondary/30",
    iconBg: "bg-secondary-muted",
    iconColor: "text-secondary-dark",
  },
  {
    time: "10:30 AM – 12:00 PM",
    title: "Executive Panel: Access to Capital, Tax Governance & Supply Chain Mastery",
    description:
      "Interactive panel with commercial bankers, tax partners, agro-industrialists, and retail leaders answering live questions from business owners.",
    Icon: Users,
    badge: "Panel Discussion",
    color: "bg-primary-light/60 border-primary/20",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    time: "12:00 PM – 01:30 PM",
    title: "Industry Breakout Roundtables & Problem-Solving Clinic",
    description:
      "Attendees split into sector-specific roundtables (Retail & Commerce, Agribusiness & Manufacturing, Tech & Services, Real Estate & Hospitality) for peer problem-solving.",
    Icon: Sparkles,
    badge: "Roundtable Clinic",
    color: "bg-secondary-light border-secondary/30",
    iconBg: "bg-secondary-muted",
    iconColor: "text-secondary-dark",
  },
  {
    time: "01:30 PM – 03:00 PM",
    title: "Sponsors Showcase, B2B Deal Room & VIP Executive Lunch",
    description:
      "Partner pitches, product exhibitions, signing of local B2B Memoranda of Understanding (MoUs), and exclusive VIP networking lunch.",
    Icon: Handshake,
    badge: "Deal Room & Exhibition",
    color: "bg-primary-light/60 border-primary/20",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
  },
];

const eventDetails = [
  { Icon: Calendar, label: "Date", value: "Saturday, November 28, 2026" },
  { Icon: Clock, label: "Time", value: "8:30 AM – 3:00 PM WAT" },
  { Icon: MapPin, label: "Venue", value: "Ibadan Civic & Business Hub, Bodija, Ibadan" },
  { Icon: Users, label: "Attendance", value: "Standard Pass (Free) · VIP & Exhibition Pass (₦25,000)" },
];

export default function AgendaSection() {
  return (
    <section id="agenda" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            Programme & Format
          </span>
          <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
            Roundtable <span className="text-primary">Agenda</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Six hours of focused strategy, boardroom clinics, and high-value B2B deal-making for Ibadan business owners.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Event Logistics Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs sticky top-24">
            <h3 className="text-2xl text-slate-900 mb-6">Event Snapshot</h3>
            <div className="space-y-4">
              {eventDetails.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100"
                >
                  <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={17} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-slate-800 font-semibold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-primary text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary-light mb-1">
                Exhibitor & VIP Upgrade
              </p>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Want to display your products/services at an exhibition table or join the VIP Executive Lunch with speakers and investors?
              </p>
              <Link
                href="/register?vip=true"
                className="block text-center bg-secondary text-white py-3 rounded-xl font-bold text-sm hover:bg-secondary-dark transition-all"
              >
                Book VIP / Exhibition Pass (₦25,000)
              </Link>
            </div>

            <div className="mt-4">
              <Link
                href="/register"
                className="block text-center bg-primary-light text-primary-dark py-3.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Register Free Standard Business Pass
              </Link>
            </div>
          </div>

          {/* Right 7 Cols: Schedule Steps */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl text-slate-900 mb-6">Order of Programme</h3>
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div
                  key={item.title}
                  className={`rounded-2xl p-6 border ${item.color} relative transition-all hover:shadow-md`}
                >
                  {i < schedule.length - 1 && (
                    <div className="absolute left-9 -bottom-4 w-0.5 h-4 bg-slate-300 z-10" />
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <item.Icon size={20} className={item.iconColor} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-primary-dark uppercase tracking-wider">
                          {item.time}
                        </span>
                        <span className="bg-white/90 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-xl text-slate-900 mb-1.5">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
