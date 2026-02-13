"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { getPostImage } from "@/lib/images";
import type { PostMeta } from "@/lib/posts";

/* ─── Category Colors ─── */

const categoryColors: Record<string, { text: string; hover: string }> = {
    Sales: { text: "text-blue-600", hover: "hover:text-blue-600" },
    Marketing: { text: "text-orange-500", hover: "hover:text-orange-500" },
    Branding: { text: "text-purple-600", hover: "hover:text-purple-600" },
};

/* ─── Hero Slideshow Images ─── */

const heroImages = [
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
];

/* ─── Component ─── */

interface HomeClientProps {
    posts: PostMeta[];
}

export default function HomeClient({ posts }: HomeClientProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    const featured = posts[0];
    const secondary = posts.slice(1, 4);
    const salesPosts = posts.filter((p) => p.category === "Sales");
    const marketingPosts = posts.filter((p) => p.category === "Marketing");
    const brandingPosts = posts.filter((p) => p.category === "Branding");

    return (
        <>
            {/* ─── HERO — Magazine Cover with Slideshow ─── */}
            <section
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slideshow images */}
                {heroImages.map((img, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 hero-slide"
                        style={{ opacity: i === currentSlide ? 1 : 0 }}
                    >
                        <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                            priority={i === 0}
                            quality={85}
                            sizes="100vw"
                        />
                    </div>
                ))}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Hero content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                        Sales · Marketing · Branding
                    </p>

                    <h1 className="animate-fade-in-up-delay-1 mt-6 font-display text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-tight">
                        Insights That Drive Growth
                    </h1>

                    <p className="animate-fade-in-up-delay-2 mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        Expert strategies and actionable frameworks for modern marketers,
                        sales leaders, and brand builders.
                    </p>

                    <div className="animate-fade-in-up-delay-3 mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/blog"
                            className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
                        >
                            Explore Articles
                        </Link>
                        <a
                            href="#newsletter"
                            className="rounded-md border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                        >
                            Subscribe
                        </a>
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {heroImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? "bg-accent w-6" : "bg-white/40"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                        Scroll
                    </span>
                    <ChevronDown size={18} className="text-white/60 animate-bounce-down" />
                </div>
            </section>

            {/* ─── TICKER / Breaking News Bar (CNN style) ─── */}
            <div className="bg-accent h-10 flex items-center overflow-hidden">
                <div className="flex-none bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 mx-3 rounded-sm">
                    Latest
                </div>
                <div className="flex-1 overflow-hidden relative">
                    <div className="animate-marquee flex whitespace-nowrap">
                        {[...posts, ...posts].map((post, i) => (
                            <span key={i} className="inline-block text-sm text-white mx-8">
                                {post.title}
                                <span className="mx-4 text-white/40">|</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── FEATURED — Newspaper Layout ─── */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                <h2 className="font-display text-3xl font-bold text-text sm:text-4xl mb-12">
                    Latest Insights
                </h2>

                {/* Row 1 — Hero Post (full width) */}
                {featured && (
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="group grid lg:grid-cols-[3fr_2fr] gap-0 mb-12 overflow-hidden bg-white"
                    >
                        {/* Image */}
                        <div className="relative h-64 lg:h-96 overflow-hidden">
                            <Image
                                src={getPostImage(featured.category, featured.slug)}
                                alt={featured.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                quality={85}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
                            <span className={`text-xs font-semibold uppercase tracking-widest ${categoryColors[featured.category]?.text || "text-gray-500"}`}>
                                {featured.category}
                            </span>
                            <h3 className={`mt-3 font-display text-2xl lg:text-3xl font-bold text-text leading-tight transition-colors duration-200 ${categoryColors[featured.category]?.hover || "hover:text-gray-600"}`}>
                                {featured.title}
                            </h3>
                            <p className="mt-3 text-gray-600 line-clamp-3 leading-relaxed">
                                {featured.excerpt}
                            </p>
                            <div className="mt-5 flex items-center gap-3 text-sm text-gray-400">
                                <span className="font-medium text-gray-600">{featured.author}</span>
                                <span>·</span>
                                <time>{featured.date}</time>
                                <span>·</span>
                                <span>{featured.readTime}</span>
                            </div>
                            <span className={`mt-4 text-sm font-medium ${categoryColors[featured.category]?.text || "text-accent"}`}>
                                Read Article →
                            </span>
                        </div>
                    </Link>
                )}

                {/* Row 2 — Secondary Posts (3 columns) */}
                {secondary.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {secondary.map((post) => (
                            <BlogCardInline key={post.slug} post={post} />
                        ))}
                    </div>
                )}
            </section>

            {/* ─── STATS BAR ─── */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-4xl px-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:divide-x divide-gray-300">
                    {[
                        { number: "72+", label: "Articles Published" },
                        { number: "2,400+", label: "Subscribers" },
                        { number: "3", label: "Topics Covered" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center sm:px-12">
                            <span className="font-display text-4xl font-bold text-accent">
                                {stat.number}
                            </span>
                            <p className="mt-1 text-sm uppercase tracking-wider text-gray-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CATEGORY SECTIONS ─── */}
            {[
                { name: "Sales", posts: salesPosts },
                { name: "Marketing", posts: marketingPosts },
                { name: "Branding", posts: brandingPosts },
            ]
                .filter((s) => s.posts.length > 0)
                .map((section) => (
                    <section key={section.name} className="mx-auto max-w-7xl px-6 py-16">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-accent rounded-full" />
                                <h2 className="font-display text-2xl font-bold text-text">
                                    {section.name}
                                </h2>
                            </div>
                            <Link
                                href={`/blog?category=${section.name}`}
                                className="text-sm font-medium text-accent hover:underline"
                            >
                                See all {section.name.toLowerCase()} articles →
                            </Link>
                        </div>

                        {/* Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto scrollbar-hide">
                            {section.posts.slice(0, 3).map((post) => (
                                <BlogCardInline key={post.slug} post={post} />
                            ))}
                        </div>
                    </section>
                ))}
        </>
    );
}

/* ─── Inline BlogCard (used in homepage) ─── */

function BlogCardInline({ post }: { post: PostMeta }) {
    const colors = {
        Sales: { border: "border-t-blue-600", text: "text-blue-600", hover: "group-hover:text-blue-600" },
        Marketing: { border: "border-t-orange-500", text: "text-orange-500", hover: "group-hover:text-orange-500" },
        Branding: { border: "border-t-purple-600", text: "text-purple-600", hover: "group-hover:text-purple-600" },
    };
    const c = colors[post.category as keyof typeof colors] || {
        border: "border-t-gray-400",
        text: "text-gray-500",
        hover: "group-hover:text-gray-600",
    };
    const imageUrl = getPostImage(post.category, post.slug);

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`group flex flex-col bg-white overflow-hidden transition-all duration-200 hover:shadow-xl border-t-[3px] ${c.border}`}
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                />
            </div>
            <div className="flex flex-1 flex-col p-6">
                <span className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>
                    {post.category}
                </span>
                <h3 className={`mt-2 font-display text-lg font-bold leading-tight text-text line-clamp-2 transition-colors duration-200 ${c.hover}`}>
                    {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3 flex-1">
                    {post.excerpt}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-600">{post.author}</span>
                    <span className="text-xs text-gray-400">
                        {post.date} · {post.readTime}
                    </span>
                </div>
            </div>
        </Link>
    );
}
