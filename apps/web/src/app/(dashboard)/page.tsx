export default async function DashboardPage() {
  let scripts = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/scripts`, { cache: 'no-store' });
    if (res.ok) {
      scripts = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch scripts');
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-poppins font-bold text-2xl text-on-surface">Overview</h1>
        <button className="flex items-center gap-2 bg-primary-container text-on-primary-container font-poppins font-bold text-sm px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all">
          <span className="material-symbols-outlined icon-fill" style={{ fontSize: '16px' }}>bolt</span>
          Upgrade to Pro
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-border-blue rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-info-tint rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined icon-fill text-primary" style={{ fontSize: '22px' }}>description</span>
          </div>
          <div>
            <div className="font-poppins font-bold text-2xl text-on-surface">{scripts.length}</div>
            <div className="text-xs text-on-surface-variant">Scripts Created</div>
          </div>
        </div>
        <div className="bg-white border border-border-blue rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-success-tint rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined icon-fill text-tertiary" style={{ fontSize: '22px' }}>visibility</span>
          </div>
          <div>
            <div className="font-poppins font-bold text-2xl text-on-surface">{(scripts.length * 500).toLocaleString()}</div>
            <div className="text-xs text-on-surface-variant">Est. Views</div>
          </div>
        </div>
      </div>

      {/* Recent Scripts Table */}
      <div className="bg-white border border-border-blue rounded-xl p-6">
        <h2 className="font-poppins font-bold text-lg mb-4">Recent Scripts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-blue text-sm text-on-surface-variant">
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold">Platform</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {scripts.length === 0 ? (
                <tr><td colSpan={4} className="py-4 text-center text-on-surface-variant">No scripts generated yet.</td></tr>
              ) : (
                scripts.slice(0, 5).map((script: any) => (
                  <tr key={script.id} className="border-b border-border-blue/50 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 font-semibold text-on-surface">{script.title}</td>
                    <td className="py-3"><span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-semibold">{script.platforms || 'Instagram'}</span></td>
                    <td className="py-3"><span className="text-xs bg-success-tint text-tertiary px-2 py-0.5 rounded-full font-bold">{script.status}</span></td>
                    <td className="py-3 text-right">
                      <button className="text-primary hover:underline font-semibold">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
