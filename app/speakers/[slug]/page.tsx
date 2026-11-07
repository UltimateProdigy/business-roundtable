import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Mic, MapPin } from "lucide-react";
import { speakersList } from "../../components/SpeakersSection";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Elevation+Church+Mobil+Ring+Road+Energy+Switch+Filling+Station+Ibadan";

export function generateStaticParams() {
  return speakersList.map((speaker) => ({
    slug: speaker.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = speakersList.find((s) => s.slug === slug);
  if (!speaker) {
    return { title: "Speaker Not Found — Ibadan Business Roundtable" };
  }
  return {
    title: `${speaker.name} — Speaker Profile | Ibadan Business Roundtable`,
    description: speaker.shortBio,
  };
}

export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = speakersList.find((s) => s.slug === slug);

  if (!speaker) {
    notFound();
  }

  const otherSpeakers = speakersList.filter((s) => s.slug !== speaker.slug);

  return (
    <>
      {/* Top Dark Banner so Navbar is visible */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-slate-900 overflow-hidden">
        <Image
          src="/ibadan-real-landscape.jpg"
          alt="Ibadan Business Roundtable"
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-secondary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to All Speakers
          </Link>

          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-3.5 py-1 mb-3 ml-4">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-white text-xs font-semibold uppercase tracking-widest">
              {speaker.isHost ? "Chief Host Profile" : "Speaker Profile"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl text-white leading-tight">
            {speaker.name}
          </h1>
          <p className="text-secondary font-bold text-sm sm:text-base uppercase tracking-wider mt-2 max-w-2xl">
            {speaker.role}
          </p>
        </div>
      </section>

      {/* Main Speaker Bio Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 Columns: Portrait & Quick Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
                <div className="relative w-full aspect-[4/4.5] bg-slate-200">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </div>
                <div className="p-6 sm:p-7 bg-white">
                  <h2 className="text-2xl text-slate-900 mb-1">{speaker.name}</h2>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-5">
                    {speaker.role}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                    <CheckCircle2 size={15} className="text-secondary flex-shrink-0" />
                    <span>
                      {speaker.isHost ? "Chief Host" : "Featured Speaker"} · Ibadan Business Roundtable 2026
                    </span>
                  </div>
                  <Link
                    href="/register"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-6 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
                  >
                    Register Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Talk Title + Full Biography */}
            <div className="lg:col-span-7">
              {/* First Line Above Profile: Title of Their Talk at the Event */}
              {speaker.talkTitle && (
                <div className="bg-gradient-to-r from-primary-light/80 to-secondary-light/60 border-l-4 border-primary rounded-r-2xl p-5 sm:p-6 mb-8">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-secondary-dark mb-1.5">
                    <Mic size={14} className="text-secondary" />
                    <span>Session / Talk Title at the Event</span>
                  </div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    &ldquo;{speaker.talkTitle}&rdquo;
                  </p>
                </div>
              )}

              <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest mb-3">
                Biography & Background
              </span>
              <h2 className="text-3xl sm:text-4xl text-slate-900 mb-6">
                About <span className="text-primary">{speaker.name}</span>
              </h2>

              <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                {speaker.fullBio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Event CTA Box */}
              <div className="mt-12 bg-slate-50 rounded-3xl p-7 sm:p-8 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                    GLOBAL READY · 5th December 2026 · 10:00 AM
                  </span>
                  <h3 className="text-2xl text-slate-900 mt-1">
                    Connect with {speaker.name.split(" ")[0]} at the Roundtable
                  </h3>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary mt-1.5 font-medium"
                  >
                    <MapPin size={15} className="text-secondary flex-shrink-0" />
                    <span>
                      PISTIS HUB, The Elevation Church, Mobil, Ring Road, Ibadan (Landmark: Energy Switch Filling Station)
                    </span>
                  </a>
                </div>
                <Link
                  href="/register"
                  className="bg-secondary text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-secondary-dark transition-all flex-shrink-0"
                >
                  Register Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Speakers Section */}
      {otherSpeakers.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl text-slate-900">
                Other <span className="text-primary">Speakers</span>
              </h2>
              <Link
                href="/speakers"
                className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherSpeakers.slice(0, 3).map((other) => (
                <Link
                  key={other.slug}
                  href={`/speakers/${other.slug}`}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-primary/40 hover:shadow-lg transition-all flex items-center gap-4 group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                    <Image
                      src={other.image}
                      alt={other.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg text-slate-900 truncate group-hover:text-primary transition-colors">
                      {other.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 line-clamp-2 mt-0.5">
                      {other.role}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary mt-1.5">
                      View Profile <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
