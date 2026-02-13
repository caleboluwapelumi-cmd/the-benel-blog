import Link from "next/link";
import Image from "next/image";
import { getPostImage } from "@/lib/images";
import type { PostMeta } from "@/lib/posts";

const categoryColors: Record<string, { border: string; text: string; hover: string }> = {
    Sales: { border: "border-t-blue-600", text: "text-blue-600", hover: "group-hover:text-blue-600" },
    Marketing: { border: "border-t-orange-500", text: "text-orange-500", hover: "group-hover:text-orange-500" },
    Branding: { border: "border-t-purple-600", text: "text-purple-600", hover: "group-hover:text-purple-600" },
};

interface BlogCardProps {
    post: PostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
    const colors = categoryColors[post.category] || {
        border: "border-t-gray-400",
        text: "text-gray-500",
        hover: "group-hover:text-gray-600",
    };
    const imageUrl = getPostImage(post.category, post.slug);

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`group flex flex-col bg-white overflow-hidden transition-all duration-200 hover:shadow-xl border-t-[3px] ${colors.border}`}
        >
            {/* Cover image */}
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

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
                {/* Category label */}
                <span
                    className={`text-xs font-semibold uppercase tracking-widest ${colors.text}`}
                >
                    {post.category}
                </span>

                {/* Title */}
                <h3
                    className={`mt-2 font-display text-lg font-bold leading-tight text-text line-clamp-2 transition-colors duration-200 ${colors.hover}`}
                >
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3 flex-1">
                    {post.excerpt}
                </p>

                {/* Bottom row */}
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
