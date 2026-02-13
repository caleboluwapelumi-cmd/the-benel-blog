import Link from "next/link";
import { PenTool } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-20">
            <h1 className="font-display text-3xl font-bold text-white">
                Admin Dashboard
            </h1>

            {/* Content Studio card */}
            <Link
                href="/admin/generate"
                className="mt-10 flex items-center gap-6 rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900 group"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <PenTool size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-white">
                        Content Studio
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Generate and manage blog posts
                    </p>
                </div>
                <span className="text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Open Studio →
                </span>
            </Link>

            <p className="mt-12 text-center text-xs text-gray-600">
                Access this page at <code className="text-gray-500">/admin</code>
            </p>
        </div>
    );
}
