import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="main-content pt-16 min-h-screen md:ml-64 pb-20 md:pb-0">
        {children}
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border-blue z-50 flex sm:hidden items-center justify-around px-2">
        <a href="/dashboard" className="flex flex-col items-center gap-0.5 text-primary"><span className="material-symbols-outlined icon-fill" style={{ fontSize: '22px' }}>dashboard</span><span className="text-xs font-bold">Home</span></a>
        <a href="/dashboard/create" className="flex flex-col items-center gap-0.5 text-on-surface-variant"><span className="material-symbols-outlined" style={{ fontSize: '22px' }}>auto_awesome</span><span className="text-xs">Create</span></a>
        <a href="/dashboard/analytics" className="flex flex-col items-center gap-0.5 text-on-surface-variant"><span className="material-symbols-outlined" style={{ fontSize: '22px' }}>analytics</span><span className="text-xs">Analytics</span></a>
        <a href="/dashboard/agency" className="flex flex-col items-center gap-0.5 text-on-surface-variant"><span className="material-symbols-outlined" style={{ fontSize: '22px' }}>business</span><span className="text-xs">Agency</span></a>
      </nav>
    </div>
  );
}
