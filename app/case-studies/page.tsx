import Link from "next/link";
import { listContent } from "@/lib/content";

export default function CaseStudiesPage() {
  const items = listContent("case-studies") as any[];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-extrabold">Case Studies</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Outcomes-first work across agentic automation, GenAI, data platforms, cloud, and security.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((x) => (
          <Link key={x.slug} href={`/case-studies/${x.slug}`} className="rounded-2xl border border-white/10 bg-panel p-6 hover:border-mint/30">
            <div className="text-xl font-bold">{x.title}</div>
            <div className="mt-2 text-sm text-muted">{x.excerpt}</div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {(x.tags || []).slice(0, 4).map((t: string) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-muted">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}