import { getContent, listContent } from "@/lib/content";

export async function generateStaticParams() {
  return (listContent("case-studies") as any[]).map((x) => ({ slug: x.slug }));
}

export default async function CaseStudy({ params }: { params: { slug: string } }) {
  const item = await getContent("case-studies", params.slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-extrabold">{item.title}</h1>
      <p className="mt-3 text-muted">{item.excerpt}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {item.client && (
          <div className="rounded-2xl border border-white/10 bg-panel p-5">
            <div className="text-xs text-muted">Client</div>
            <div className="mt-1 font-semibold">{item.client}</div>
          </div>
        )}
        {item.industry && (
          <div className="rounded-2xl border border-white/10 bg-panel p-5">
            <div className="text-xs text-muted">Industry</div>
            <div className="mt-1 font-semibold">{item.industry}</div>
          </div>
        )}
      </div>

      {item.outcomes?.length ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-panel p-6">
          <div className="font-bold">Key outcomes</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted space-y-2">
            {item.outcomes.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </div>
      ) : null}

      <article
        className="prose prose-invert mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: item.body }}
      />
    </div>
  );
}