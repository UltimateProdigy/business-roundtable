"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Camera, X, MessageCircle, ArrowRight, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About the Event", href: "/about" },
  { label: "Speakers & Panelists", href: "/speakers" },
  { label: "Call for Sponsors", href: "/sponsors" },
  { label: "Register to Attend", href: "/register" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { Icon: Camera, label: "Instagram", href: "https://instagram.com/elevatehub" },
  { Icon: X, label: "Twitter / X", href: "https://twitter.com/elevatehub" },
  { Icon: MessageCircle, label: "WhatsApp (0810 500 8260)", href: "https://wa.me/2348105008260" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid md:grid-cols-3 gap-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/tec-ibadan-icon.png"
                alt="The Elevation Church Ibadan Logo"
                width={44}
                height={44}
                unoptimized
                className="drop-shadow-sm"
              />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Ibadan <span className="text-primary">Business</span>
                </span>
                <span className="flex items-center gap-1.5 mt-1">
                  <span className="w-3.5 h-[2px] rounded-full bg-secondary" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-secondary">
                    Roundtable
                  </span>
                </span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Hosted by <strong>The Elevation Church, Ibadan</strong>, the Ibadan Business Roundtable brings together business owners, founders, SME leaders, and investors in Ibadan and its environs — driving sustainable growth, wealth creation, and global opportunities.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Elevation+Church+Mobil+Ring+Road+Energy+Switch+Filling+Station+Ibadan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-xs text-neutral-400 hover:text-primary transition-colors mt-4"
            >
              <MapPin size={14} className="text-secondary flex-shrink-0 mt-0.5" />
              <span>
                PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan (Landmark: Energy Switch Filling Station)
              </span>
            </a>
            <p className="text-primary font-semibold text-sm mt-3 italic">
              Connect. Scale. Transform Ibadan.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & CTAs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Connect & Partner
            </h4>
            <div className="flex flex-col gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-neutral-300 hover:text-white text-sm transition-colors group"
                >
                  <div className="w-7 h-7 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={14} />
                  </div>
                  <span>{label}</span>
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors"
              >
                Register Seat <ArrowRight size={14} />
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-secondary-dark transition-colors"
              >
                Sponsor Event
              </Link>
            </div>
          </div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-xs">
          <p>© {new Date().getFullYear()} Ibadan Business Roundtable — The Elevation Church, Ibadan</p>
          <p>Built for Business Leaders & Entrepreneurs across Ibadan & Environs</p>
        </div>
      </div>
    </footer>
  );
}
