import { Mail, MessageCircle, Camera, MapPin, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Elevation+Church+Mobil+Ring+Road+Energy+Switch+Filling+Station+Ibadan";

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
    label: "Event Venue & Google Map Pin",
    value: "PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan (Landmark: Energy Switch Filling Station)",
    href: GOOGLE_MAPS_URL,
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
            Secretariat & Venue Map
          </span>
          <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Have questions about seat registration, sponsorship tiers, or directions to the venue? Reach out to our organizing committee.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-12">
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

        {/* Google Map Embed & Landmark Card */}
        <div className="max-w-6xl mx-auto bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/70">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 bg-secondary-light rounded-xl flex items-center justify-center text-secondary flex-shrink-0 mt-0.5">
                <MapPin size={22} />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">
                  Official Event Venue · 5th December 2026 · 10:00 AM
                </span>
                <h3 className="text-xl sm:text-2xl text-slate-900 mt-0.5">
                  PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan
                </h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  Landmark: Energy Switch Filling Station
                </p>
              </div>
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all self-start md:self-auto flex-shrink-0"
            >
              Open in Google Maps <ExternalLink size={15} />
            </a>
          </div>
          <div className="w-full h-72 sm:h-80 bg-slate-200">
            <iframe
              title="PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan (Landmark: Energy Switch Filling Station)"
              src="https://www.google.com/maps?q=The+Elevation+Church+Mobil+Ring+Road+Ibadan&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
