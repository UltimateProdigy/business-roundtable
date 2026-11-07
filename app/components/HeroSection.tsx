import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  Handshake,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { speakersList } from "./SpeakersSection";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Elevation+Church+Mobil+Ring+Road+Energy+Switch+Filling+Station+Ibadan";

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
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/85 to-slate-950/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-36 lg:pt-40 md:pb-24 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: Event Title, Theme, Venue & CTAs */}
          <div className="lg:col-span-7">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/50 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-white text-xs sm:text-sm font-bold tracking-wider uppercase">
                The Elevation Church, Ibadan · Business Forum
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5 uppercase">
              Ibadan Business{" "}
              <span className="text-primary">Roundtable.</span>
            </h1>

            {/* Official Event Theme Banner */}
            <div className="bg-white/10 backdrop-blur-md border-l-4 border-secondary rounded-r-2xl p-4 sm:p-5 mb-6 max-w-2xl">
              <div className="flex items-center gap-2 text-secondary text-xs font-extrabold uppercase tracking-widest mb-1">
                <Sparkles size={14} />
                <span>Event Theme</span>
              </div>
              <p className="text-white font-extrabold text-lg sm:text-2xl tracking-tight leading-snug">
                GLOBAL READY:{" "}
                <span className="text-primary font-bold">
                  Scaling Businesses, Building Wealth, Expanding Opportunities
                </span>
              </p>
            </div>

            <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed mb-7">
              An executive forum hosted by <strong>Pastor Seun Afolayan</strong> bringing
              together business owners, SME founders, investors, and industry leaders across
              Ibadan and its environs for actionable strategy, wealth creation, and
              sustainable growth.
            </p>

            {/* Event Quick Info Pills */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 mb-8">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start sm:items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-xl px-4 py-3 text-white text-xs sm:text-sm transition-colors group"
              >
                <MapPin size={17} className="text-secondary flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  <strong>PISTIS HUB, The Elevation Church</strong>, Mobil, Ring Road, Ibadan{" "}
                  <span className="text-secondary-light font-semibold">
                    (Landmark: Energy Switch Filling Station)
                  </span>
                </span>
                <ExternalLink
                  size={14}
                  className="text-white/60 group-hover:text-secondary flex-shrink-0 mt-0.5 sm:mt-0"
                />
              </a>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-semibold">
                  <Calendar size={16} className="text-primary flex-shrink-0" />
                  <span>5th December 2026</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-semibold">
                  <Clock size={16} className="text-secondary flex-shrink-0" />
                  <span>10:00 AM</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Register Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-secondary-dark transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
              >
                <Handshake size={18} />
                Call for Sponsors & Partners
              </Link>
            </div>
          </div>

          {/* Right 5 Columns: Event Flier / Host & Speakers Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/85 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-3.5 mb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary block">
                    GLOBAL READY · 5TH DEC 2026
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    Host & Speakers Lineup
                  </h2>
                </div>
                <Link
                  href="/speakers"
                  className="text-xs font-bold text-primary hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  View All <ArrowRight size={13} />
                </Link>
              </div>

              {/* Featured Host Row */}
              {speakersList
                .filter((s) => s.isHost)
                .map((host) => (
                  <Link
                    key={host.slug}
                    href={`/speakers/${host.slug}`}
                    className="flex items-center gap-4 bg-gradient-to-r from-primary/25 to-secondary/20 border border-primary/40 rounded-2xl p-3.5 mb-4 hover:border-secondary transition-all group"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-secondary shadow-md">
                      <Image
                        src={host.image}
                        alt={host.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block bg-secondary text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                        Chief Host
                      </span>
                      <h3 className="text-white font-extrabold text-base sm:text-lg truncate group-hover:text-primary transition-colors">
                        {host.name}
                      </h3>
                      <p className="text-white/75 text-xs line-clamp-1">
                        Resident Pastor, The Elevation Church, Ibadan
                      </p>
                    </div>
                  </Link>
                ))}

              {/* Speakers Faces Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
                {speakersList
                  .filter((s) => !s.isHost)
                  .map((speaker) => (
                    <Link
                      key={speaker.slug}
                      href={`/speakers/${speaker.slug}`}
                      className="group text-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-primary/50 rounded-xl p-2 transition-all"
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-1.5 bg-slate-800 border border-white/15">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform"
                          sizes="100px"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {speaker.name.replace("Dr. ", "").replace("Mrs ", "").split(" ")[0]}{" "}
                        {speaker.name.replace("Dr. ", "").replace("Mrs ", "").split(" ").slice(-1)[0]}
                      </p>
                    </Link>
                  ))}

                {/* CTA Tile in the 8th grid slot */}
                <Link
                  href="/speakers"
                  className="flex flex-col items-center justify-center text-center bg-primary/20 hover:bg-primary/35 border border-primary/40 rounded-xl p-2 transition-all group"
                >
                  <span className="text-xs font-extrabold text-white group-hover:translate-x-0.5 transition-transform">
                    Full Profiles →
                  </span>
                  <span className="text-[10px] text-secondary-light mt-0.5">
                    Read Bios
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:justify-start">
          <a
            href="#speakers"
            className="inline-flex items-center gap-2 text-white/60 hover:text-secondary transition-colors"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">
              Explore Speakers & Details
            </span>
            <ChevronDown size={18} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
