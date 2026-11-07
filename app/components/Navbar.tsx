"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Handshake } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Speakers", href: "/speakers" },
  { label: "Call for Sponsors", href: "/sponsors" },
  { label: "Register", href: "/register" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.65);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  if (isAdmin) {
    return null;
  }

  const isGlass = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isGlass
          ? "bg-transparent border-none shadow-none"
          : "bg-white border-b border-slate-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">
          {/* ── Logo (left) ── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <Image
              src="/logo-icon-clean.png"
              alt="The Elevation Church — Ibadan Round Table Logo"
              width={36}
              height={36}
              unoptimized
              className="group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className={`text-lg tracking-tight transition-colors duration-300 font-semibold ${
                isGlass ? "text-white" : "text-slate-800"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ibadan
              <span className={isGlass ? "text-secondary" : "text-primary"}>·</span>
              <span className={isGlass ? "text-secondary" : "text-primary"}>
                round table
              </span>
            </span>
          </Link>

          {/* ── Nav Links (center) ── */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 group ${
                    isGlass
                      ? isActive
                        ? "text-secondary"
                        : "text-white/85 hover:text-white"
                      : isActive
                      ? "text-primary font-semibold"
                      : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-secondary opacity-100"
                        : "bg-secondary opacity-0 group-hover:opacity-50"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Right: Sponsor + Register CTA ── */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0 ml-auto">
            <Link
              href="/sponsors"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 inline-flex items-center gap-1.5 border ${
                isGlass
                  ? "border-white/35 text-white hover:bg-white/10"
                  : "border-secondary/40 text-secondary hover:bg-secondary-light"
              }`}
            >
              <Handshake size={14} />
              Sponsor
            </Link>
            <Link
              href="/register"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                isGlass
                  ? "bg-secondary text-white hover:bg-secondary-dark shadow-lg shadow-secondary/25"
                  : "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/25"
              }`}
            >
              Register Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ml-auto p-2 rounded-lg transition-colors ${
              isGlass ? "text-white/85 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className={`md:hidden border-t py-3 flex flex-col gap-0.5 ${
              isGlass
                ? "border-white/10 bg-slate-900/95 backdrop-blur-xl"
                : "border-slate-100 bg-white"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? isGlass
                        ? "text-secondary bg-white/5"
                        : "text-primary bg-primary-light"
                      : isGlass
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                </Link>
              );
            })}
            <div className="px-4 pt-2 pb-1 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primary text-white py-2.5 rounded-full text-sm font-bold hover:bg-primary-dark transition-colors"
              >
                Register to Attend
              </Link>
              <Link
                href="/sponsors"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-secondary text-white py-2.5 rounded-full text-sm font-bold hover:bg-secondary-dark transition-colors"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
