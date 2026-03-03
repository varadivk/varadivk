import Link from "next/link";
import PartnerGrid from "@/components/PartnerGrid";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.18),transparent_55%),radial-gradient(circle_at_right,rgba(96,165,250,0.12),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-6 py-20 relative">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
              Agentic AI Enablement • Integration • Security-first Delivery
              <span className="ml-2 rounded-full bg-spark/15 px-2 py-0.5 text-spark">India → Global</span>
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight">
              Build AI systems that{" "}
              <span className="text-mint">act</span>,{" "}
              <span className="text-trust">learn</span>, and{" "}
              <span className="text-spark">deliver outcomes</span>.
            </h1>
            <p className="mt-6 text-lg text-muted">
              ThinkVerge.in partners with teams to design, build, and deploy <b>Agentic AI</b>—workflow agents, copilots,
              RAG systems, data platforms, and secure cloud architectures—built for production, not demos.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-xl bg-mint px-6 py-3 font-semibold text-bg shadow-glow hover:opacity-95">
                Book a discovery call
              </Link>
              <Link href="/case-studies" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:border-mint/40">
                See case studies
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { k: "2–6 weeks", v: "Typical MVP-to-production runway" },
                { k: "Secure-by-default", v: "OWASP, least privilege, audit trails" },
                { k: "Measured impact", v: "Latency, cost, quality, adoption KPIs" }
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-white/10 bg-panel p-5">
                  <div className="text-xl font-bold">{x.k}</div>
                  <div className="mt-2 text-sm text-muted">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold">What we deliver</h2>
            <p className="mt-2 text-muted">From strategy to production—end-to-end.</p>
          </div>
          <Link href="/services" className="text-trust hover:underline">View all</Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "Agentic AI Systems", d: "Autonomous workflow agents with guardrails, tool-use, and evaluation." },
            { t: "GenAI + RAG", d: "Retrieval, chunking, reranking, citations, and reliable answers for enterprises." },
            { t: "Data & Analytics", d: "Lakehouse pipelines, quality checks, BI enablement, metrics you can trust." },
            { t: "Cloud Transformation", d: "Modernize infra, cost controls, observability, scalable app architectures." },
            { t: "Custom Engineering", d: "Web platforms, APIs, internal tools, integration layers, automation." },
            { t: "Security & Compliance", d: "Threat modeling, secure SDLC, secrets, access controls, audit trails." }
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-panel p-6 hover:border-mint/30 transition">
              <div className="text-lg font-bold">{x.t}</div>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="border-y border-white/10 bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-extrabold">Partners</h2>
          <p className="mt-2 text-muted">Trusted collaborators across India and North America.</p>
          <div className="mt-8">
            <PartnerGrid />
          </div>
        </div>
      </section>

      {/* Thought-provoking CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(52,211,153,0.12),rgba(96,165,250,0.10),rgba(251,191,36,0.08))] p-10">
          <h3 className="text-3xl font-extrabold">AI shouldn’t be a feature. It should be a force multiplier.</h3>
          <p className="mt-3 text-muted max-w-2xl">
            We build AI that’s observable, secure, measurable, and integrated into how your business actually runs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-mint px-6 py-3 font-semibold text-bg shadow-glow">
              Start a project
            </Link>
            <Link href="/blog" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold">
              Read insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}