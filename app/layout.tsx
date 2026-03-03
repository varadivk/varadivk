import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ThinkVerge.in — Agentic AI Enabler & Integrator",
  description:
    "ThinkVerge helps enterprises design, build, and deploy agentic AI systems: copilots, RAG, workflow automation, data platforms, cloud transformation, and security-first AI."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-gray-100">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}