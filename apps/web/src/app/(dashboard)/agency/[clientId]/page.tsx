import Link from 'next/link';

export default async function ClientDetailPage({ params }: { params: { clientId: string } }) {
  let client: any = null;
  try {
    const res = await fetch(`http://localhost:3001/clients/${params.clientId}`, { cache: 'no-store' });
    if (res.ok) {
      client = await res.json();
    }
  } catch (err) {
    console.error(err);
  }

  if (!client) {
    return <div className="p-6 text-center text-on-surface-variant font-bold">Client not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/agency" className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm">
          ← Back to Agency
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-on-surface">{client.name}</h1>
          <p className="text-on-surface-variant mt-1">{client.niche} • {client.platforms}</p>
        </div>
        <Link 
          href={`/create?clientId=${client.id}&language=${client.defaultLanguage}&tone=${client.defaultTone}`}
          className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md shadow-primary/20"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>auto_awesome</span>
          Generate Script
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-border-blue rounded-xl p-5 fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Default Language</p>
          <p className="font-poppins font-bold text-xl text-primary">{client.defaultLanguage || 'N/A'}</p>
        </div>
        <div className="bg-white border border-border-blue rounded-xl p-5 fade-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Brand Tone</p>
          <p className="font-poppins font-bold text-xl text-tertiary">{client.defaultTone || 'N/A'}</p>
        </div>
        <div className="bg-white border border-border-blue rounded-xl p-5 fade-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm font-semibold text-on-surface-variant mb-1">Generated Scripts</p>
          <p className="font-poppins font-bold text-xl text-secondary">{client.scripts?.length || 0}</p>
        </div>
      </div>

      <div className="bg-white border border-border-blue rounded-xl p-6">
        <h2 className="font-poppins font-bold text-lg mb-4">Client Scripts</h2>
        {client.scripts?.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No scripts generated for this client yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-blue text-sm text-on-surface-variant">
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Created</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {client.scripts.map((script: any) => (
                  <tr key={script.id} className="border-b border-border-blue/50 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 font-semibold text-on-surface">{script.topic}</td>
                    <td className="py-3"><span className="text-xs bg-success-tint text-tertiary px-2 py-0.5 rounded-full font-bold">{script.status}</span></td>
                    <td className="py-3 text-on-surface-variant">{new Date(script.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 text-right">
                      <button className="text-primary hover:underline font-semibold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
