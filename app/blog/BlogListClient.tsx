"use client";

import { useState } from "react";
import { Search, FileText } from "lucide-react";
import BlogCard from "@/app/components/BlogCard";
import type { PostMeta } from "@/lib/posts";

const categories = ["All", "Sales", "Marketing", "Branding"];

interface BlogListClientProps {
    posts: PostMeta[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = posts.filter((post) => {
        const matchCat = activeCategory === "All" || post.category === activeCategory;
        const q = search.toLowerCase();
        const matchSearch =
            q === "" ||
            post.title.toLowerCase().includes(q) ||
            post.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchCat && matchSearch;
    });

    return (
        <>
            {/* Search bar */}
            <div className="relative mb-8 max-w-xl mx-auto">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3.5 pl-12 pr-6 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
            </div>

            {/* Category underline tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`pb-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${activeCategory === cat
                                ? "text-text border-b-2 border-accent"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Post count */}
            <p className="text-sm text-text-muted mb-8">
                {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                {activeCategory !== "All" && (
                    <> in <span className="font-medium text-text">{activeCategory}</span></>
                )}
                {search && (
                    <> matching &ldquo;<span className="font-medium text-text">{search}</span>&rdquo;</>
                )}
            </p>

            {/* Grid — first post spans 2 columns */}
            {filtered.length > 0 ? (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-20">
                    {filtered.map((post, i) => (
                        <div
                            key={post.slug}
                            className={i === 0 ? "sm:col-span-2" : ""}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center animate-fade-in">
                    <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="font-display text-2xl font-bold text-text">
                        No articles found
                    </h3>
                    <p className="mt-3 text-base text-text-muted max-w-sm mx-auto">
                        Try a different search term or browse all categories
                    </p>
                    <button
                        onClick={() => { setActiveCategory("All"); setSearch(""); }}
                        className="mt-6 rounded-md bg-accent px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark hover:shadow-lg cursor-pointer"
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </>
    );
}
