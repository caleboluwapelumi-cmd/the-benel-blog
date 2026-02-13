"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
            <div className="text-center max-w-md mx-auto">
                {/* Warning icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
                    <AlertTriangle size={40} className="text-accent" />
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    Something Went Wrong
                </h1>

                <p className="mt-4 text-gray-400 text-base leading-relaxed">
                    We hit an unexpected error. Don&apos;t worry, it&apos;s not you —
                    it&apos;s us.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="rounded-md bg-accent px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 cursor-pointer inline-flex items-center gap-2"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="rounded-md border-2 border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/40 cursor-pointer inline-flex items-center gap-2"
                    >
                        <Home size={16} />
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
