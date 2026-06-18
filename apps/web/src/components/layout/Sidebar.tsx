import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="sidebar-desktop fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-border-blue flex flex-col z-50">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border-blue">
        <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined icon-fill text-on-primary-container" style={{ fontSize: '20px' }}>edit_square</span>
        </div>
        <div>
          <div className="font-poppins font-bold text-primary text-base leading-tight">Creator Studio</div>
          <div className="text-xs text-on-surface-variant">AI-Powered Workspace</div>
        </div>
      </div>
      <div className="px-3 pt-4 pb-2">
        <Link href="/dashboard/create" className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-poppins font-bold text-sm px-4 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all">
          <span className="material-symbols-outlined icon-fill" style={{ fontSize: '18px' }}>add_circle</span>नवा Script बनव
        </Link>
      </div>
      <nav className="flex-1 px-2 py-2 flex flex-col gap-0.5">
        <Link href="/dashboard" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dashboard</span>Dashboard</Link>
        <Link href="/dashboard/create" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>auto_awesome</span>New Content</Link>
        <Link href="/dashboard/history" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>history</span>My Scripts</Link>
        <Link href="/dashboard/calendar" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_month</span>Calendar</Link>
        <Link href="/dashboard/audio" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>headphones</span>Viral Audio</Link>
        <Link href="/dashboard/trends" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>trending_up</span>Trends</Link>
        <Link href="/dashboard/analytics" className="nav-link"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>analytics</span>Analytics</Link>
        <Link href="/dashboard/agency" className="nav-link"><span className="material-symbols-outlined icon-fill" style={{ fontSize: '20px' }}>business</span>Agency</Link>
      </nav>
      <div className="mx-3 my-3 p-3 bg-info-tint border border-border-blue rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-primary">Pro Plan</span>
          <span className="text-xs bg-success-tint text-tertiary px-2 py-0.5 rounded-full font-bold">Active</span>
        </div>
        <p className="text-xs text-on-surface-variant">Unlimited scripts & audio</p>
        <Link href="/dashboard/upgrade" className="text-xs text-primary font-semibold mt-2 block hover:underline">Manage Plan →</Link>
      </div>
      <div className="border-t border-border-blue px-2 py-3 flex flex-col gap-0.5">
        <Link href="/dashboard/settings" className="nav-link text-sm"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>Settings</Link>
      </div>
    </aside>
  );
}
