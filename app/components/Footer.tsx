"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

const quickLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const categories = [
    { href: "/blog?category=Marketing", label: "Marketing" },
    { href: "/blog?category=Sales", label: "Sales" },
    { href: "/blog?category=Branding", label: "Branding" },
];

const socials = [
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-[#0F1117] text-white">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <span className="font-display text-xl font-bold text-white">BenEl</span>
                            <span className="h-5 w-px bg-gray-700" aria-hidden="true" />
                            <span className="text-sm font-light text-gray-400">Marketing Hub</span>
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-xs">
                            Expert strategies and actionable frameworks for modern marketers, sales leaders, and brand builders.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-sm text-gray-300 transition-all duration-200 hover:text-white hover:translate-x-1 inline-block">{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Categories</h4>
                        <ul className="space-y-3">
                            {categories.map((l) => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-sm text-gray-300 transition-all duration-200 hover:text-white hover:translate-x-1 inline-block">{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Connect</h4>
                        <ul className="space-y-3">
                            {socials.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 transition-all duration-200 hover:text-white hover:translate-x-1 inline-block">{l.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} BenEl Marketing Hub. All rights reserved.</p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                        Back to top
                        <ArrowUp size={14} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
