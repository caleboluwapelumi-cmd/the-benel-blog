"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

export default function ShareButtons({
    title,
    slug,
}: {
    title: string;
    slug: string;
}) {
    const [copied, setCopied] = useState(false);
    const url =
        typeof window !== "undefined"
            ? `${window.location.origin}/blog/${slug}`
            : `/blog/${slug}`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* fallback: do nothing */
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Twitter / X */}
            <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-accent hover:text-accent"
            >
                <Twitter size={14} />
            </a>

            {/* LinkedIn */}
            <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-accent hover:text-accent"
            >
                <Linkedin size={14} />
            </a>

            {/* Copy Link */}
            <button
                onClick={copyLink}
                aria-label="Copy link"
                className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-all cursor-pointer ${copied
                        ? "border-green-300 bg-green-50 text-green-600"
                        : "border-gray-200 text-gray-400 hover:border-accent hover:text-accent"
                    }`}
            >
                {copied ? (
                    <>
                        <Check size={14} />
                        Copied!
                    </>
                ) : (
                    <>
                        <Link2 size={14} />
                        Copy link
                    </>
                )}
            </button>
        </div>
    );
}
