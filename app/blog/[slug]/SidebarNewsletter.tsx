"use client";

import { useState } from "react";
import { Loader2, Check, Mail } from "lucide-react";

export default function SidebarNewsletter() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            setError("Please enter a valid email.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json().catch(() => null);
                setError(data?.error || "Something went wrong.");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-lg border border-gray-200 p-5 text-center">
                <Check size={24} className="mx-auto text-green-500 mb-2" />
                <p className="text-sm font-medium text-text">Subscribed!</p>
                <p className="mt-1 text-xs text-gray-400">
                    Check your inbox.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-accent" />
                <h4 className="text-sm font-semibold text-text">
                    Newsletter
                </h4>
            </div>
            <p className="text-xs text-gray-500 mb-3">
                Get weekly marketing insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            Subscribing...
                        </>
                    ) : (
                        "Subscribe"
                    )}
                </button>
            </form>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>
    );
}
