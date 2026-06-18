export default async function AnalyticsPage() {
  let stats = { totalScripts: 0, estimatedViews: 0, engagementRate: 0 };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/scripts/analytics`, { cache: 'no-store' });
    if (res.ok) {
      stats = await res.json();
    }
  } catch (err) {}

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-poppins font-bold text-2xl text-on-surface">Analytics 📈</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-border-blue rounded-xl p-5">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">Estimated Views</div>
          <div className="font-poppins font-bold text-3xl text-primary">{stats.estimatedViews.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-2 font-bold">↑ 12% vs last month</div>
        </div>
        <div className="bg-white border border-border-blue rounded-xl p-5">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">Engagement Rate</div>
          <div className="font-poppins font-bold text-3xl text-tertiary">{stats.engagementRate.toFixed(1)}%</div>
          <div className="text-xs text-green-600 mt-2 font-bold">↑ 0.5% vs last month</div>
        </div>
        <div className="bg-white border border-border-blue rounded-xl p-5">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">Scripts Generated</div>
          <div className="font-poppins font-bold text-3xl text-secondary">{stats.totalScripts}</div>
          <div className="text-xs text-on-surface-variant mt-2 font-bold">Total Platform Count</div>
        </div>
      </div>
      
      <div className="bg-white border border-border-blue rounded-xl p-6 h-64 flex items-center justify-center">
        <p className="text-on-surface-variant font-semibold">Chart Visualization Placeholder</p>
      </div>
    </div>
  );
}
