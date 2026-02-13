import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getPostImage } from "@/lib/images";
import BlogCard from "@/app/components/BlogCard";
import ReadingProgress from "@/app/components/ReadingProgress";
import ShareButtons from "./ShareButtons";
import SidebarNewsletter from "./SidebarNewsletter";
import type { Metadata } from "next";

/* ─── Static Params ─── */

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

/* ─── Dynamic Metadata ─── */

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://benelmarketinghub.com/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
        alternates: {
            canonical: `https://benelmarketinghub.com/blog/${post.slug}`,
        },
    };
}

/* ─── Heading helpers for ToC ─── */

interface Heading {
    id: string;
    text: string;
    level: number;
}

function extractHeadings(content: string): Heading[] {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const text = match[2].replace(/[*_`]/g, "").trim();
        headings.push({
            id: text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-"),
            text,
            level: match[1].length,
        });
    }

    return headings;
}

/* ─── Custom MDX components ─── */

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

const mdxComponents = {
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = slugify(String(children ?? ""));
        return (
            <h2 id={id} className="scroll-mt-24" {...props}>
                {children}
            </h2>
        );
    },
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = slugify(String(children ?? ""));
        return (
            <h3 id={id} className="scroll-mt-24" {...props}>
                {children}
            </h3>
        );
    },
};

/* ─── Category colors ─── */

const categoryColors: Record<string, string> = {
    Sales: "text-blue-600",
    Marketing: "text-orange-500",
    Branding: "text-purple-600",
};

/* ─── Page ─── */

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const headings = extractHeadings(post.content);
    const imageUrl = getPostImage(post.category, post.slug);
    const catColor = categoryColors[post.category] || "text-accent";

    // Related: same category, excluding current post, max 3
    const related = getAllPosts()
        .filter(
            (p) =>
                p.category === post.category && p.slug !== post.slug
        )
        .slice(0, 3);

    return (
        <>
            <ReadingProgress />
            <article className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
                {/* JSON-LD Article Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: post.title,
                            description: post.excerpt,
                            author: {
                                '@type': 'Person',
                                name: post.author,
                            },
                            datePublished: post.date,
                            dateModified: post.date,
                            publisher: {
                                '@type': 'Organization',
                                name: 'BenEl Marketing Hub',
                                url: 'https://benelmarketinghub.com',
                            },
                            mainEntityOfPage: {
                                '@type': 'WebPage',
                                '@id': `https://benelmarketinghub.com/blog/${post.slug}`,
                            },
                        }),
                    }}
                />

                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-6">
                    <Link href="/blog" className="hover:text-accent transition-colors">
                        Blog
                    </Link>
                    <span className="mx-2">/</span>
                    <span className={catColor}>{post.category}</span>
                </div>

                {/* Post Header */}
                <header className="max-w-3xl mb-10">
                    <span className={`text-xs font-semibold uppercase tracking-widest ${catColor}`}>
                        {post.category}
                    </span>

                    <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl leading-[1.15]">
                        {post.title}
                    </h1>

                    <p className="mt-4 text-xl text-gray-500 leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Author row */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Image
                            src={`https://i.pravatar.cc/40?u=${encodeURIComponent(post.author)}`}
                            alt={post.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                            <span className="font-semibold text-text">{post.author}</span>
                            <span className="text-gray-300">·</span>
                            <time className="text-gray-500">{post.date}</time>
                            <span className="text-gray-300">·</span>
                            <span className="text-gray-500">{post.readTime}</span>
                        </div>
                        <div className="ml-auto">
                            <ShareButtons title={post.title} slug={post.slug} />
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="relative w-full h-72 sm:h-96 md:h-[500px] rounded-xl overflow-hidden mb-12">
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        quality={85}
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                </div>

                {/* Two-column layout */}
                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
                    {/* Main Content */}
                    <div>
                        <div className="prose prose-lg prose-slate max-w-none prose-editorial prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent prose-blockquote:bg-orange-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-600 prose-img:rounded-xl prose-p:leading-relaxed">
                            <MDXRemote source={post.content} components={mdxComponents} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-8">
                            {/* Table of Contents */}
                            {headings.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                                        Table of Contents
                                    </h4>
                                    <nav className="flex flex-col gap-2.5 border-l border-gray-200 pl-4">
                                        {headings.map((h) => (
                                            <a
                                                key={h.id}
                                                href={`#${h.id}`}
                                                className={`text-sm transition-colors hover:text-accent ${h.level === 3
                                                        ? "pl-3 text-gray-400"
                                                        : "text-gray-600 font-medium"
                                                    }`}
                                            >
                                                {h.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Mini Newsletter */}
                            <SidebarNewsletter />

                            {/* Share */}
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                                    Share This Article
                                </h4>
                                <ShareButtons title={post.title} slug={post.slug} />
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Posts */}
                {related.length > 0 && (
                    <section className="mt-20 border-t border-gray-200 pt-16">
                        <h2 className="font-display text-2xl font-bold text-text mb-8">
                            You Might Also Like
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </>
    );
}
