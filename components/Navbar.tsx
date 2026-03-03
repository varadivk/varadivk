import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-bg/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">Think</span>
          <span className="text-2xl font-extrabold tracking-tight text-mint">Verge</span>
          <span className="ml-2 rounded-full bg-mint/10 px-2 py-0.5 text-xs text-mint">.in</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex text-sm text-gray-200">
          <Link href="/services" className="hover:text-mint">Services</Link>
          <Link href="/case-studies" className="hover:text-mint">Case Studies</Link>
          <Link href="/blog" className="hover:text-mint">Insights</Link>
          <Link href="/company" className="hover:text-mint">Company</Link>
          <Link href="/contact" className="rounded-lg bg-mint px-4 py-2 font-semibold text-bg hover:opacity-95 shadow-glow">
            Talk to us
          </Link>
        </nav>

        <Link href="/contact" className="md:hidden rounded-lg bg-mint px-3 py-2 font-semibold text-bg">
          Contact
        </Link>
      </div>
    </header>
  );
}