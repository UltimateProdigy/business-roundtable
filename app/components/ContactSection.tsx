import { Mail, MessageCircle, Camera, MapPin } from "lucide-react";

const contacts = [
  {
    Icon: Mail,
    label: "Partnerships & Inquiries",
    value: "roundtable@elevatehub.com",
    href: "mailto:roundtable@elevatehub.com",
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp Secretariat",
    value: "+234 810 080 1513",
    href: "https://wa.me/2348100801513",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    Icon: Camera,
    label: "Instagram Updates",
    value: "@elevatehub",
    href: "https://instagram.com/elevatehub",
    iconBg: "bg-secondary-light",
    iconColor: "text-secondary",
  },
  {
    Icon: MapPin,
    label: "Event Venue",
    value: "PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan",
    href: "#register",
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            Secretariat & Support
          </span>
          <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Have questions about seat registration, group corporate tables, or sponsorship tiers? Reach out to our organizing committee.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {contacts.map(({ Icon, label, value, href, iconBg, iconColor }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all group"
            >
              <div
                className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon size={22} className={iconColor} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className="text-slate-800 font-semibold text-sm group-hover:text-primary transition-colors">
                {value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
