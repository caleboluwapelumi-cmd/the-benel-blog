import { getAllPosts } from "@/lib/posts";
import BlogListClient from "./BlogListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blog',
    description:
        'Actionable articles on sales, marketing, and branding — written by practitioners, not theorists.',
    openGraph: {
        title: 'The BenEl Blog — Sales, Marketing & Branding Insights',
        description:
            'Actionable articles written by practitioners, not theorists.',
        url: 'https://benelmarketinghub.com/blog',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div>
            {/* Clean white hero */}
            <section className="pt-20 pb-16 px-6 text-center bg-white">
                <h1 className="font-display text-4xl font-bold text-text sm:text-5xl">
                    The BenEl Blog
                </h1>
                <div className="mt-4 w-16 h-1 bg-accent mx-auto rounded-full" />
                <p className="mt-4 text-gray-500 max-w-md mx-auto">
                    Actionable articles on sales, marketing, and branding — written by
                    practitioners, not theorists.
                </p>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-7xl px-6 pb-20">
                <BlogListClient posts={posts} />
            </section>
        </div>
    );
}
