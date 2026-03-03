import Link from "next/link";
import { listContent } from "@/lib/content";

export default function BlogPage() {
  const posts = listContent("blog") as any[];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-extrabold">Insights</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Practical writing on agentic systems, RAG, evaluation, governance, and secure AI delivery.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-white/10 bg-panel p-6 hover:border-trust/40">
            <div className="text-xl font-bold">{p.title}</div>
            <div className="mt-2 text-sm text-muted">{p.excerpt}</div>
            <div className="mt-4 text-xs text-muted">{p.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}