"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, ChevronDown, ArrowRight, Loader2, Check } from "lucide-react";

/* ─── Types ─── */
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

interface TouchedFields {
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subjectOptions = [
    "General Inquiry",
    "Content Collaboration",
    "Guest Post Submission",
    "Advertising & Sponsorship",
    "Technical Issue",
    "Other",
];

const faqs = [
    {
        q: "Do you accept guest posts?",
        a: "Yes! We welcome expert contributions on sales, marketing, and branding. Submit your pitch via the form and we'll get back within 48 hours.",
    },
    {
        q: "Can I republish your articles?",
        a: "We allow syndication with proper attribution and a canonical link back to the original. Reach out and we'll share our guidelines.",
    },
    {
        q: "How do I advertise on BenEl Marketing Hub?",
        a: "We offer newsletter sponsorships and native content partnerships. Send us your details through the form for media kit & rates.",
    },
    {
        q: "I found an issue with an article — how do I report it?",
        a: 'We appreciate corrections! Use the form with subject "Technical Issue" and we\'ll review and update the article promptly.',
    },
];

/* ─── Validation helpers ─── */
function validateField(
    field: keyof FormData,
    value: string
): string | undefined {
    switch (field) {
        case "name":
            if (!value.trim()) return "Name is required.";
            if (value.trim().length < 2) return "Name must be at least 2 characters.";
            return undefined;
        case "email":
            if (!value.trim()) return "Email is required.";
            if (!EMAIL_REGEX.test(value.trim()))
                return "Please enter a valid email address.";
            return undefined;
        case "subject":
            if (!value) return "Please select a subject.";
            return undefined;
        case "message":
            if (!value.trim()) return "Message is required.";
            if (value.trim().length < 10)
                return "Message must be at least 10 characters.";
            return undefined;
    }
}

function validateAll(data: FormData): FormErrors {
    const errors: FormErrors = {};
    (Object.keys(data) as (keyof FormData)[]).forEach((field) => {
        const err = validateField(field, data[field]);
        if (err) errors[field] = err;
    });
    return errors;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<TouchedFields>({
        name: false,
        email: false,
        subject: false,
        message: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (
        field: keyof FormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (touched[field]) {
            const err = validateField(field, value);
            setErrors((prev) => ({ ...prev, [field]: err }));
        }
        setApiError("");
    };

    const handleBlur = (field: keyof FormData) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const err = validateField(field, formData[field]);
        setErrors((prev) => ({ ...prev, [field]: err }));
    };

    const hasErrors = Object.keys(validateAll(formData)).length > 0;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError("");

        setTouched({ name: true, email: true, subject: true, message: true });

        const validationErrors = validateAll(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                setApiError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setApiError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setTouched({ name: false, email: false, subject: false, message: false });
        setSuccess(false);
        setApiError("");
    };

    const inputBaseClass =
        "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400";
    const inputNormalClass = `${inputBaseClass} border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent/20`;
    const inputErrorClass = `${inputBaseClass} border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400`;

    return (
        <>
            {/* ─── HERO ─── */}
            <section className="bg-primary">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 text-center">
                    <h1 className="animate-fade-in-up font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                        Get In Touch
                    </h1>
                    <p className="animate-fade-in-up-delay-1 mx-auto mt-6 max-w-lg text-lg text-gray-400 leading-relaxed">
                        Have a question, collaboration idea, or just want to say hello?
                        We&apos;d love to hear from you.
                    </p>
                </div>
            </section>

            {/* ─── MAIN ─── */}
            <section className="bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
                        {/* ─── LEFT: Contact Info ─── */}
                        <div className="space-y-8">
                            {/* Contact Info Card */}
                            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                                <h2 className="font-display text-2xl font-bold text-gray-900">
                                    Contact Information
                                </h2>

                                <div className="mt-8 space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent flex-none">
                                            <Mail size={20} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email Us</p>
                                            <a
                                                href="mailto:hello@benelmarketinghub.com"
                                                className="text-sm font-semibold text-gray-900 hover:text-accent transition-colors"
                                            >
                                                hello@benelmarketinghub.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-4">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 flex-none">
                                            <MapPin size={20} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Based In</p>
                                            <p className="text-sm font-semibold text-gray-900">Available Worldwide</p>
                                        </div>
                                    </div>

                                    {/* Response Time */}
                                    <div className="flex items-start gap-4">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green/10 text-green flex-none">
                                            <Clock size={20} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Response Time</p>
                                            <p className="text-sm font-semibold text-gray-900">Within 24 hours</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="my-8 border-t border-gray-100" />

                                {/* Follow Us */}
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                                        Follow Us
                                    </h3>
                                    <div className="flex gap-3">
                                        {["Twitter / X", "LinkedIn", "Instagram"].map((label) => (
                                            <a
                                                key={label}
                                                href="#"
                                                className="flex h-10 items-center px-3 rounded-lg border border-gray-200 text-sm text-gray-600 transition-all hover:border-accent hover:text-accent hover:bg-accent/5"
                                                aria-label={label}
                                            >
                                                {label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Guest Writer CTA */}
                            <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-accent">
                                <h3 className="font-display text-lg font-bold text-gray-900">
                                    Want to write for us?
                                </h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    We welcome guest contributors. Share your expertise with our
                                    growing community.
                                </p>
                                <a
                                    href="#"
                                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                                >
                                    Learn more
                                    <ArrowRight size={14} />
                                </a>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h3 className="font-display text-lg font-bold text-gray-900 mb-5">
                                    Frequently Asked
                                </h3>
                                <div className="space-y-3">
                                    {faqs.map((faq) => (
                                        <details
                                            key={faq.q}
                                            className="group rounded-xl border border-gray-100 bg-white p-5 transition-all hover:shadow-sm"
                                        >
                                            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-gray-900 list-none">
                                                {faq.q}
                                                <ChevronDown
                                                    size={16}
                                                    className="text-gray-400 transition-transform group-open:rotate-180 flex-none ml-2"
                                                />
                                            </summary>
                                            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ─── RIGHT: Contact Form ─── */}
                        <div className="rounded-2xl bg-white p-8 lg:p-10 shadow-sm border border-gray-100 h-fit">
                            {success ? (
                                /* ─── Success State ─── */
                                <div className="text-center py-12">
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green/10 mb-6">
                                        <Check size={40} className="text-green" />
                                    </div>
                                    <h2 className="font-display text-3xl font-bold text-gray-900">
                                        Message Sent!
                                    </h2>
                                    <p className="mt-4 text-gray-500 max-w-sm mx-auto leading-relaxed">
                                        Thanks for reaching out! We&apos;ll get back to you within
                                        24 hours.
                                    </p>
                                    <button
                                        onClick={resetForm}
                                        className="mt-8 rounded-md bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark cursor-pointer"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                /* ─── Form ─── */
                                <>
                                    <h2 className="font-display text-2xl font-bold text-gray-900">
                                        Send Us a Message
                                    </h2>

                                    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="contact-name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                                onBlur={() => handleBlur("name")}
                                                placeholder="John Doe"
                                                className={
                                                    touched.name && errors.name
                                                        ? inputErrorClass
                                                        : inputNormalClass
                                                }
                                                disabled={isLoading}
                                            />
                                            {touched.name && errors.name && (
                                                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="contact-email"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange("email", e.target.value)}
                                                onBlur={() => handleBlur("email")}
                                                placeholder="john@example.com"
                                                className={
                                                    touched.email && errors.email
                                                        ? inputErrorClass
                                                        : inputNormalClass
                                                }
                                                disabled={isLoading}
                                            />
                                            {touched.email && errors.email && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label
                                                htmlFor="contact-subject"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Subject
                                            </label>
                                            <select
                                                id="contact-subject"
                                                value={formData.subject}
                                                onChange={(e) => handleChange("subject", e.target.value)}
                                                onBlur={() => handleBlur("subject")}
                                                className={`${touched.subject && errors.subject
                                                    ? inputErrorClass
                                                    : inputNormalClass
                                                    } appearance-none cursor-pointer`}
                                                disabled={isLoading}
                                            >
                                                <option value="">Select a topic…</option>
                                                {subjectOptions.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                            {touched.subject && errors.subject && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label
                                                htmlFor="contact-message"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Your Message
                                            </label>
                                            <textarea
                                                id="contact-message"
                                                value={formData.message}
                                                onChange={(e) => handleChange("message", e.target.value)}
                                                onBlur={() => handleBlur("message")}
                                                rows={5}
                                                placeholder="Tell us what's on your mind..."
                                                className={`${touched.message && errors.message
                                                    ? inputErrorClass
                                                    : inputNormalClass
                                                    } resize-none`}
                                                disabled={isLoading}
                                            />
                                            {touched.message && errors.message && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* API Error */}
                                        {apiError && (
                                            <div className="rounded-lg bg-red-500 px-4 py-3 text-sm text-white animate-fade-in">
                                                {apiError}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={isLoading || hasErrors}
                                            className="w-full rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <ArrowRight size={16} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
