"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, X, Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b ${scrolled
            ? "border-gray-200 shadow-sm"
            : "border-gray-200"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-text">
              BenEl
            </span>
            <span className="h-5 w-px bg-gray-300" aria-hidden="true" />
            <span className="text-sm font-light text-text-muted">
              Marketing Hub
            </span>
          </Link>

          {/* Center Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link-hover text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Search + Subscribe */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/blog"
              className="p-2 text-text-muted hover:text-text transition-colors"
              aria-label="Search articles"
            >
              <Search size={18} />
            </Link>
            <a
              href="#newsletter"
              className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 cursor-pointer"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 cursor-pointer text-text-muted hover:text-text transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile dark overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-text-muted hover:text-text cursor-pointer transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center min-h-[48px] text-sm font-medium text-text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="mt-6">
            <a
              href="#newsletter"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md bg-accent px-5 py-3.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark cursor-pointer"
            >
              Subscribe
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
