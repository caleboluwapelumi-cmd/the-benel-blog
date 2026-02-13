import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, BarChart3, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "About — BenEl Marketing Hub",
    description:
        "Meet the team behind BenEl Marketing Hub. We create expert strategies and actionable frameworks for modern marketers, sales leaders, and brand builders.",
};

const values = [
    {
        icon: Target,
        title: "Actionable Over Abstract",
        description:
            "Every article includes frameworks and steps you can implement today — not vague theory.",
    },
    {
        icon: BarChart3,
        title: "Data-Backed Insights",
        description:
            "Our strategies are grounded in real-world results, industry data, and tested methodologies.",
    },
    {
        icon: Users,
        title: "Community First",
        description:
            "We build for the professionals in the trenches — marketers, sellers, and brand builders who do the work.",
    },
    {
        icon: Zap,
        title: "Clarity Over Complexity",
        description:
            "We cut through the noise. No jargon, no fluff — just clear, useful knowledge.",
    },
];

const team = [
    {
        name: "Ben Eleazar",
        role: "Founder & Editor-in-Chief",
        bio: "10+ years in B2B marketing. Previously led growth at two SaaS startups.",
    },
    {
        name: "Amara Osei",
        role: "Head of Content",
        bio: "Former content strategist at HubSpot. Obsessed with funnel optimization.",
    },
    {
        name: "Marcus Chen",
        role: "Sales Strategy Editor",
        bio: "Closed $12M+ in enterprise deals. Now teaches others the playbook.",
    },
    {
        name: "Kira Patel",
        role: "Brand & Design Lead",
        bio: "Award-winning brand strategist. Believes great brands start with great stories.",
    },
];

export default function AboutPage() {
    return (
        <>
            {/* ─── HERO ─── */}
            <section className="bg-primary text-white">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <div className="max-w-3xl">
                        <span className="animate-fade-in inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-accent mb-6">
                            Our Story
                        </span>
                        <h1 className="animate-fade-in-up font-display text-4xl font-bold sm:text-5xl lg:text-6xl !leading-[1.1]">
                            Built for the Marketers{" "}
                            <span className="text-accent">Who Build</span>
                        </h1>
                        <p className="animate-fade-in-up-delay-1 mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
                            BenEl Marketing Hub started with a simple frustration: most
                            marketing content is either too theoretical to apply or too basic
                            to matter. We created a home for the in-between — expert-level
                            insights packaged for immediate action.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── MISSION ─── */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">
                            Why We Exist
                        </h2>
                        <p className="mt-6 text-text-muted leading-relaxed">
                            We noticed a gap in the marketing world. Enterprise blogs are too
                            corporate. Influencer content is too surface-level. Independent
                            professionals deserve a resource that respects their intelligence
                            and their time.
                        </p>
                        <p className="mt-4 text-text-muted leading-relaxed">
                            Every article on BenEl Marketing Hub is crafted with one goal:
                            give you something you can use <strong className="text-text">today</strong>.
                            Whether that&apos;s a new framework for your cold outreach, a fresh
                            approach to content strategy, or a branding exercise that
                            clarifies your positioning — we deliver value, not filler.
                        </p>
                        <div className="mt-10 flex items-center gap-6">
                            <div className="text-center">
                                <p className="font-display text-3xl font-bold text-accent">2,400+</p>
                                <p className="mt-1 text-sm text-text-muted">Subscribers</p>
                            </div>
                            <div className="h-10 w-px bg-border" />
                            <div className="text-center">
                                <p className="font-display text-3xl font-bold text-accent">50+</p>
                                <p className="mt-1 text-sm text-text-muted">Articles</p>
                            </div>
                            <div className="h-10 w-px bg-border" />
                            <div className="text-center">
                                <p className="font-display text-3xl font-bold text-accent">3</p>
                                <p className="mt-1 text-sm text-text-muted">Core Topics</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative card */}
                    <div className="relative hidden lg:block">
                        <div className="absolute -inset-6 bg-accent/10 rounded-3xl blur-2xl" />
                        <div className="relative bg-surface rounded-2xl border border-border p-10">
                            <blockquote className="font-display text-2xl font-bold text-text leading-snug">
                                &ldquo;The best marketing content doesn&apos;t just inform — it
                                equips.&rdquo;
                            </blockquote>
                            <p className="mt-6 text-sm text-text-muted">
                                — Ben Eleazar, Founder
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── VALUES ─── */}
            <section className="bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <h2 className="font-display text-3xl font-bold text-text sm:text-4xl text-center">
                        What We Stand For
                    </h2>
                    <p className="mt-4 text-center text-text-muted max-w-lg mx-auto">
                        Every piece of content we publish is filtered through these
                        principles.
                    </p>

                    <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={v.title}
                                    className="group bg-white border border-border rounded-2xl p-7 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                                        <Icon size={24} className="text-accent" />
                                    </div>
                                    <h3 className="mt-4 font-display text-lg font-bold text-text">
                                        {v.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                                        {v.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── TEAM ─── */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <h2 className="font-display text-3xl font-bold text-text sm:text-4xl text-center">
                    Meet the Team
                </h2>
                <p className="mt-4 text-center text-text-muted max-w-lg mx-auto">
                    A small team of operators and practitioners who&apos;ve been in the
                    trenches.
                </p>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="group text-center bg-white border border-border rounded-2xl p-7 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                        >
                            <Image
                                src={`https://i.pravatar.cc/80?u=${encodeURIComponent(member.name)}`}
                                alt={member.name}
                                width={64}
                                height={64}
                                className="mx-auto rounded-full"
                            />
                            <h3 className="mt-5 font-display text-lg font-bold text-text">
                                {member.name}
                            </h3>
                            <p className="mt-1 text-sm font-medium text-accent">
                                {member.role}
                            </p>
                            <p className="mt-3 text-sm text-text-muted leading-relaxed">
                                {member.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="bg-primary">
                <div className="mx-auto max-w-7xl px-6 py-20 text-center">
                    <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                        Want to Contribute?
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-gray-400">
                        We&apos;re always looking for expert voices. If you have knowledge worth
                        sharing, we&apos;d love to hear from you.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            href="/contact"
                            className="rounded-md bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark hover:shadow-xl"
                        >
                            Get in Touch
                        </Link>
                        <Link
                            href="/blog"
                            className="rounded-md border-2 border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                        >
                            Read Our Work
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
