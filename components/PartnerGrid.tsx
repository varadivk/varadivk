export default function PartnerGrid() {
  const partners = [
    { name: "OphoTech", location: "Canada" },
    { name: "Happy Model School", location: "Delhi" },
    { name: "Let's AI Solution", location: "New Delhi" },
    { name: "SafeTrust", location: "North America" }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {partners.map((p) => (
        <div key={p.name} className="rounded-2xl border border-white/10 bg-bg p-5">
          <div className="text-lg font-bold">{p.name}</div>
          <div className="mt-1 text-sm text-muted">{p.location}</div>
        </div>
      ))}
    </div>
  );
}