import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* ─── Types ─── */

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: "Sales" | "Marketing" | "Branding";
    tags: string[];
    author: string;
    coverImage: string;
    readTime: string;
    content: string;
}

export type PostMeta = Omit<Post, "content">;

/* ─── Paths ─── */

const postsDirectory = path.join(process.cwd(), "content/posts");

/* ─── Helpers ─── */

function parsePost(slug: string, fileContents: string): Post {
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "Marketing",
        tags: data.tags ?? [],
        author: data.author ?? "BenEl Team",
        coverImage: data.coverImage ?? "",
        readTime: data.readTime ?? "5 min read",
        content,
    };
}

/* ─── Public API ─── */

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .filter((name) => name.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const post = parsePost(slug, fileContents);

            // Strip content for listing — only keep metadata
            const { content: _, ...meta } = post;
            return meta;
        });

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        return parsePost(slug, fileContents);
    } catch {
        return null;
    }
}

export function getPostsByCategory(category: string): PostMeta[] {
    return getAllPosts().filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

export function getAllCategories(): string[] {
    const posts = getAllPosts();
    return Array.from(new Set(posts.map((p) => p.category)));
}
