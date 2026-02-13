"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setAlreadySubscribed(false);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else if (res.status === 409) {
                setAlreadySubscribed(true);
            } else {
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <section id="newsletter" className="bg-primary">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 text-center">
                    <div className="mx-auto max-w-md">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/20 mb-6">
                            <CheckCircle size={32} className="text-green" />
                        </div>
                        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                            Welcome to BenEl Marketing Hub
                        </h2>
                        <p className="mt-4 text-text-light">
                            Check your inbox for a confirmation
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="newsletter" className="bg-primary">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 text-center">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                    Stay Ahead of the Curve
                </h2>
                <p className="mx-auto mt-4 max-w-md text-text-light">
                    Get weekly insights on sales, marketing, and branding delivered
                    straight to your inbox.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                            setAlreadySubscribed(false);
                        }}
                        placeholder="you@company.com"
                        className="flex-1 rounded-md bg-white/10 border border-white/15 px-6 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Subscribing...
                            </>
                        ) : (
                            "Subscribe"
                        )}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-sm text-red-400 animate-fade-in">{error}</p>
                )}

                {alreadySubscribed && (
                    <p className="mt-4 text-sm text-orange-400 animate-fade-in">
                        You&apos;re already subscribed. Thank you for your support!
                    </p>
                )}

                {!error && !alreadySubscribed && (
                    <p className="mt-4 text-xs text-text-light">
                        No spam. Unsubscribe anytime.
                    </p>
                )}
            </div>
        </section>
    );
}
