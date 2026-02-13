import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { topic, category, tone, keywords } = await request.json();

        if (!topic) {
            return NextResponse.json({ error: "Topic is required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const today = new Date().toISOString().split("T")[0];

        const prompt = `You are an expert content writer for BenEl Marketing Hub, a professional blog covering sales, marketing, and branding. Write a complete, publish-ready MDX blog post.

Topic: ${topic}
Category: ${category}
Tone: ${tone}
Keywords to include: ${keywords || "none specified"}

Requirements:
- Length: 800-1200 words
- Include proper MDX frontmatter:
  title, date (${today}), excerpt, category, tags (array), author: 'BenEl Team', readTime (e.g. '5 min read')
- Structure:
  · Compelling introduction that hooks the reader
  · 3-5 main sections with ## headings
  · Practical actionable takeaways
  · Strong conclusion with a CTA
  · Use **bold** for key terms
  · Include at least one > blockquote for a key insight
- Tone style:
  · Authoritative: expert, data-backed, confident
  · Conversational: friendly, relatable, story-driven
  · Data-Driven: stats-heavy, analytical, precise
  · Motivational: energetic, inspiring, action-oriented

Return ONLY the MDX content starting with ---, nothing else.`;

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const result = await model.generateContentStream(prompt);

                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error: unknown) {
        console.error("Gemini API error:", error);
        const msg = error instanceof Error ? error.message : "Failed to generate content";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
