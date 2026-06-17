export default async function TrendsPage() {
  let trends = [];
  try {
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/trends', { cache: 'no-store' });
    if (res.ok) trends = await res.json();
  } catch (err) {}

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="font-poppins font-bold text-2xl text-on-surface mb-6">Trending Topics 🔥</h1>
      <div className="bg-white border border-border-blue rounded-xl p-6">
        <p className="text-on-surface-variant mb-4">Discover what is viral right now in your niche.</p>
        <ul className="space-y-4">
          {trends.length === 0 && <p className="text-sm text-on-surface-variant">No trends available right now.</p>}
          {trends.map((trend: any) => (
            <li key={trend.id} className="p-4 border border-border-blue rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{trend.topic}</h3>
                <p className="text-sm text-on-surface-variant">{trend.category}</p>
              </div>
              <div className="text-green-600 font-bold">{trend.growth}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
