import { getAllPosts } from "@/lib/posts";
import HomeClient from "./components/HomeClient";
import NewsletterSignup from "./components/NewsletterSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Your source for sales, marketing, and branding insights. Expert strategies and actionable frameworks to elevate your business.',
  openGraph: {
    title: 'BenEl Marketing Hub — Insights That Drive Growth',
    description:
      'Expert strategies for modern marketers, sales leaders, and brand builders.',
    url: 'https://benelmarketinghub.com',
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <HomeClient posts={posts} />

      {/* ─── NEWSLETTER ─── */}
      <NewsletterSignup />
    </>
  );
}
