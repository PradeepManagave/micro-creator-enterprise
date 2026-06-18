import Link from 'next/link';
import AddClientModal from './AddClientModal';

export default async function AgencyPage() {
  let clients = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/clients`, { cache: 'no-store' });
    if (res.ok) {
      clients = await res.json();
    }
  } catch (err) {}

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="font-poppins font-bold text-2xl text-on-surface mb-6">Agency Dashboard 🏢</h1>
      <div className="bg-white border border-border-blue rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-on-surface-variant">Manage your clients, team members, and bulk generate scripts.</p>
          <AddClientModal />
        </div>
        
        {clients.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No clients added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((c: any) => (
              <Link href={`/agency/${c.id}`} key={c.id}>
                <div className="p-5 border border-border-blue rounded-xl hover:bg-surface-container-low transition-all cursor-pointer group flex justify-between items-center">
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-primary group-hover:underline">{c.name}</h3>
                    <p className="text-sm text-on-surface-variant">{c.niche} • {c.defaultLanguage}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
