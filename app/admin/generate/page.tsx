"use client";

import { useState } from "react";
import { Wand2, Loader2, FileText, RefreshCw, Download, Copy, Check } from "lucide-react";

/* ─── Helpers ─── */

function parseFrontmatter(content: string) {
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return null;
    const data: Record<string, string> = {};
    for (const line of m[1].split("\n")) {
        const idx = line.indexOf(":");
        if (idx > 0) {
            const key = line.slice(0, idx).trim();
            const val = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
            data[key] = val;
        }
    }
    return data;
}

function inlineFmt(text: string) {
    const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*|`[^`]+?`)/g);
    return parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
            return <strong key={i} className="text-white font-semibold">{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*"))
            return <em key={i}>{p.slice(1, -1)}</em>;
        if (p.startsWith("`") && p.endsWith("`"))
            return <code key={i} className="bg-gray-800 px-1 py-0.5 rounded text-sm text-accent">{p.slice(1, -1)}</code>;
        return p;
    });
}

function RenderedBody({ body }: { body: string }) {
    const lines = body.split("\n");
    const els: React.ReactNode[] = [];
    let i = 0, k = 0;

    while (i < lines.length) {
        const ln = lines[i];
        if (ln.startsWith("### ")) {
            els.push(<h3 key={k++} className="font-display text-lg font-bold text-white mt-6 mb-2">{inlineFmt(ln.slice(4))}</h3>);
            i++;
        } else if (ln.startsWith("## ")) {
            els.push(<h2 key={k++} className="font-display text-xl font-bold text-white mt-8 mb-3">{inlineFmt(ln.slice(3))}</h2>);
            i++;
        } else if (ln.startsWith("> ")) {
            els.push(<blockquote key={k++} className="border-l-4 border-accent pl-4 py-1 my-4 text-gray-300 italic">{inlineFmt(ln.slice(2))}</blockquote>);
            i++;
        } else if (ln.startsWith("- ") || ln.startsWith("* ")) {
            const items: React.ReactNode[] = [];
            while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
                items.push(<li key={k++}>{inlineFmt(lines[i].slice(2))}</li>);
                i++;
            }
            els.push(<ul key={k++} className="list-disc pl-5 my-3 space-y-1 text-gray-300">{items}</ul>);
        } else if (/^\d+\.\s/.test(ln)) {
            const items: React.ReactNode[] = [];
            while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
                items.push(<li key={k++}>{inlineFmt(lines[i].replace(/^\d+\.\s/, ""))}</li>);
                i++;
            }
            els.push(<ol key={k++} className="list-decimal pl-5 my-3 space-y-1 text-gray-300">{items}</ol>);
        } else if (ln.trim() === "") {
            i++;
        } else {
            els.push(<p key={k++} className="my-2 text-gray-300 leading-relaxed">{inlineFmt(ln)}</p>);
            i++;
        }
    }
    return <>{els}</>;
}

/* ─── Category colors ─── */

const catColors: Record<string, string> = {
    Sales: "bg-accent-2", Marketing: "bg-accent", Branding: "bg-purple",
};

const catDots: Record<string, string> = {
    Sales: "bg-[#3B82F6]", Marketing: "bg-[#FF6B35]", Branding: "bg-[#8B5CF6]",
};

/* ─── Page ─── */

export default function GeneratePage() {
    const [topic, setTopic] = useState("");
    const [category, setCategory] = useState("Sales");
    const [tone, setTone] = useState("Authoritative");
    const [keywords, setKeywords] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");
    const [activeTab, setActiveTab] = useState<"preview" | "source">("preview");
    const [copied, setCopied] = useState(false);

    const hasContent = generatedContent.length > 0;

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        setGeneratedContent("");
        setActiveTab("preview");

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, category, tone, keywords }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                const errMsg = errData?.error || "Generation failed";
                throw new Error(errMsg);
            }

            const reader = res.body!.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value, { stream: true });
                setGeneratedContent((prev) => prev + text);
            }
        } catch (err) {
            console.error(err);
            const message = err instanceof Error ? err.message : "Generation failed";
            setGeneratedContent(`Error: ${message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyMDX = async () => {
        await navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadMDX = () => {
        const blob = new Blob([generatedContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const titleMatch = generatedContent.match(/title:\s*['"](.+?)['"]/);
        const slug = titleMatch
            ? titleMatch[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            : "generated-post";
        a.href = url;
        a.download = `${slug}.mdx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const frontmatter = hasContent ? parseFrontmatter(generatedContent) : null;
    const mdxBody = hasContent ? generatedContent.replace(/^---[\s\S]*?---\n*/, "") : "";

    const inputClass = "w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-3 text-sm outline-none transition-all focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] placeholder:text-gray-500";
    const labelClass = "block text-gray-400 text-sm font-medium mb-1.5";

    return (
        <div>
            {/* Header */}
            <section className="pt-12 pb-10 px-6 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-400 mb-6">
                    <Wand2 size={12} />
                    Content Generator
                </span>
                <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
                    Content Studio
                </h1>
                <p className="mt-3 text-gray-400 max-w-md mx-auto">
                    Generate publish-ready blog posts with ease
                </p>
            </section>

            {/* Main */}
            <div className="mx-auto max-w-7xl px-6 pb-20">
                <div className="grid lg:grid-cols-[2fr_3fr] gap-8 items-start">
                    {/* LEFT: Generate Panel */}
                    <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/30">
                        <h2 className="font-display text-lg font-bold text-white mb-6">Content Brief</h2>

                        <div className="mb-5">
                            <label className={labelClass}>What do you want to write about?</label>
                            <textarea rows={3} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. How to build a cold email sequence that converts..." className={`${inputClass} resize-none`} />
                        </div>

                        <div className="mb-5">
                            <label className={labelClass}>Category</label>
                            <div className="relative">
                                <span className={`absolute left-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full ${catDots[category]}`} />
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} pl-8 appearance-none cursor-pointer`}>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Branding">Branding</option>
                                </select>
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className={labelClass}>Tone of Voice</label>
                            <div className="relative">
                                <select value={tone} onChange={(e) => setTone(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                                    <option value="Authoritative">Authoritative — Expert, data-backed</option>
                                    <option value="Conversational">Conversational — Friendly, story-driven</option>
                                    <option value="Data-Driven">Data-Driven — Analytical, precise</option>
                                    <option value="Motivational">Motivational — Inspiring, action-oriented</option>
                                </select>
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className={labelClass}>Target Keywords (optional)</label>
                            <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. cold outreach, email marketing, B2B" className={inputClass} />
                        </div>

                        <button onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="w-full rounded-lg bg-[#FF6B35] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#E85A2A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
                            {isGenerating ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Writing your post...
                                </>
                            ) : (
                                <>
                                    <Wand2 size={16} />
                                    Generate Post
                                </>
                            )}
                        </button>

                        <p className="mt-3 text-center text-xs text-gray-500">Approximately 15 seconds</p>
                        <p className="mt-2 text-center text-xs text-gray-600">
                            Be specific with your topic for better results
                        </p>
                    </div>

                    {/* RIGHT: Preview Panel */}
                    <div className={`border rounded-2xl p-6 bg-gray-900/30 transition-all ${isGenerating ? "border-accent/40" : "border-gray-800"}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display text-lg font-bold text-white">Live Preview</h2>
                            {hasContent && !isGenerating && (
                                <div className="flex rounded-lg bg-gray-900 p-0.5">
                                    {(["preview", "source"] as const).map((tab) => (
                                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === tab ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                                            {tab === "preview" ? "Preview" : "MDX Source"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!hasContent && !isGenerating && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <FileText size={48} className="text-gray-600 mb-4" />
                                <p className="text-gray-300 font-medium">Your generated post will appear here</p>
                                <p className="mt-1 text-sm text-gray-500">Fill in the brief and click Generate</p>
                            </div>
                        )}

                        {isGenerating && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Loader2 size={14} className="animate-spin text-accent" />
                                    <span className="text-sm font-medium text-accent">Writing...</span>
                                </div>
                                <div className="bg-gray-900/50 rounded-xl p-5 max-h-[60vh] overflow-y-auto">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans leading-relaxed">
                                        {generatedContent}
                                        <span className="inline-block w-0.5 h-4 bg-accent animate-pulse ml-0.5 align-text-bottom" />
                                    </pre>
                                </div>
                            </div>
                        )}

                        {hasContent && !isGenerating && (
                            <>
                                {activeTab === "preview" ? (
                                    <div className="max-h-[65vh] overflow-y-auto pr-2">
                                        {frontmatter && (
                                            <div className="mb-6 p-5 bg-gray-900/50 rounded-xl border border-gray-800">
                                                <h3 className="font-display text-xl font-bold text-white leading-snug">{frontmatter.title}</h3>
                                                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                                                    {frontmatter.category && <span className={`${catColors[frontmatter.category] || "bg-gray-600"} text-white text-xs px-2.5 py-0.5 rounded-full font-medium`}>{frontmatter.category}</span>}
                                                    {frontmatter.readTime && <span className="text-gray-500">{frontmatter.readTime}</span>}
                                                    {frontmatter.date && <span className="text-gray-500">{frontmatter.date}</span>}
                                                </div>
                                            </div>
                                        )}
                                        <RenderedBody body={mdxBody} />
                                    </div>
                                ) : (
                                    <div className="relative max-h-[65vh] overflow-y-auto">
                                        <button onClick={copyMDX} className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors z-10 cursor-pointer">
                                            {copied ? "Copied!" : "Copy MDX"}
                                        </button>
                                        <pre className="bg-gray-900 rounded-xl p-5 text-sm text-green-400 leading-relaxed overflow-x-auto"><code>{generatedContent}</code></pre>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-gray-800">
                                    <button onClick={() => { setGeneratedContent(""); handleGenerate(); }} className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
                                        <RefreshCw size={14} />
                                        Regenerate
                                    </button>
                                    <button onClick={copyMDX} className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
                                        {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy MDX</>}
                                    </button>
                                    <button onClick={downloadMDX} className="rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E85A2A] transition-all ml-auto flex items-center gap-2 cursor-pointer">
                                        <Download size={14} />
                                        Download .mdx
                                    </button>
                                </div>
                                <p className="mt-3 text-xs text-gray-600 text-center">Save the .mdx file to <code className="text-gray-500">content/posts/</code> to publish</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
