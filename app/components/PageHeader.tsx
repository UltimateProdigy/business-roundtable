import Image from "next/image";

interface PageHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function PageHeader({
  label,
  title,
  highlight,
  subtitle,
  imageSrc,
  imageAlt,
}: PageHeaderProps) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 min-h-[50vh] flex items-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      )}

      {/* Subtle dark gradient overlay allowing the image to shine through vividly */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-900/35" />

      {/* Decorative ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/25 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-widest">
              {label}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-wide mb-6">
            {title}{" "}
            {highlight && <span className="text-secondary">{highlight}</span>}
          </h1>

          {subtitle && (
            <p className="text-white/80 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light">
              {subtitle}
            </p>
          )}

          <div className="mt-8 flex items-center gap-2">
            <div className="h-1.5 w-16 bg-primary rounded-full" />
            <div className="h-1.5 w-3 bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
