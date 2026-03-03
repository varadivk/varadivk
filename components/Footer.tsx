import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="text-2xl font-extrabold">
            Think<span className="text-mint">Verge</span>
          </div>
          <p className="mt-4 text-sm text-muted max-w-sm">
            Agentic AI enabler & integrator helping organizations build secure, reliable, and scalable AI systems—
            from strategy to production.
          </p>
          <a className="mt-6 inline-flex rounded-xl border border-mint/40 bg-mint/10 px-4 py-3 text-mint" href="mailto:info@thinkverge.in">
            info@thinkverge.in
          </a>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-200">Services</div>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>AI & Machine Learning</li>
            <li>Data Engineering & Analytics</li>
            <li>Cloud Transformation</li>
            <li>Generative AI Solutions</li>
            <li>Custom Software Development</li>
            <li>Cyber Security Solutions</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-200">Company</div>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li><Link className="hover:text-trust" href="/company">Who we are</Link></li>
            <li><Link className="hover:text-trust" href="/careers">Careers</Link></li>
            <li><Link className="hover:text-trust" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-trust" href="/terms">Terms of Service</Link></li>
            <li><Link className="hover:text-trust" href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} ThinkVerge.in — Built in India. Secure by design.
      </div>
    </footer>
  );
}