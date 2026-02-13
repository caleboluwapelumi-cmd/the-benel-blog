import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0F1117]">
            {/* Admin header */}
            <header className="border-b border-gray-800 px-6 py-4">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                    <span className="text-sm text-gray-500">BenEl Admin</span>
                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Site
                    </Link>
                </div>
            </header>
            {children}
        </div>
    );
}
