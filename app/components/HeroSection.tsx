import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  Handshake,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Real photograph of Ibadan (Mapo Hall & Ibadan brown rooftops) covering the entire hero */}
      <Image
        src="/ibadan-real-landscape.jpg"
        alt="Real aerial view of Ibadan — Mapo Hall and the historic brown rooftops of Ibadan"
        fill
        priority
        quality={95}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay so the full-bleed Ibadan photograph shines through while keeping text legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/35" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/50 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">
            Vantage Forum · Ibadan & Environs
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl text-white leading-tight tracking-wide mb-6 max-w-4xl">
          Ibadan Business{" "}
          <span className="text-primary">Roundtable.</span>{" "}
          <span className="block text-4xl sm:text-5xl md:text-6xl text-white/95 mt-2">
            Connect.{" "}
            <span className="text-secondary">Scale.</span>{" "}
            <span className="relative inline-block">
              Thrive.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-secondary rounded-full" />
            </span>
          </span>
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
          An exclusive executive forum bringing together business owners, SME founders,
          investors, and industry leaders across Ibadan and its environs for actionable
          strategy, B2B deal-making, capital access, and sustainable growth.
        </p>

        {/* Event Quick Info Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm">
            <MapPin size={16} className="text-secondary flex-shrink-0" />
            <span>PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm">
            <Calendar size={16} className="text-primary flex-shrink-0" />
            <span>5th December 2026</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm">
            <Clock size={16} className="text-secondary flex-shrink-0" />
            <span>10:00 AM</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            Register Your Business <ArrowRight size={18} />
          </Link>
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-secondary-dark transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
          >
            <Handshake size={18} />
            Call for Sponsors & Partners
          </Link>
        </div>

        <p className="text-sm text-white/65 max-w-lg leading-relaxed">
          Open to SME owners, retail leaders, agribusiness executives, tech founders,
          manufacturers, real estate developers, and investors across Oyo State.
        </p>

        <div className="mt-14">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-white/50 hover:text-secondary transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Explore
            </span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
