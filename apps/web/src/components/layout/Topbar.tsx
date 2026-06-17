export function Topbar() {
  return (
    <header className="topbar fixed top-0 right-0 h-16 bg-surface border-b border-border-blue flex items-center justify-between px-6 z-40" style={{ left: '256px' }}>
      <div className="flex items-center gap-3">
        <span className="font-poppins font-bold text-on-surface text-base">Dashboard 📊</span>
        <span className="hidden sm:block text-xs text-on-surface-variant">Welcome back, Pradeep!</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-info-tint px-3 py-1.5 rounded-full border border-border-blue">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>token</span>
          <span className="text-xs font-bold text-primary">24 Credits</span>
        </div>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-low text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center font-poppins font-bold text-on-primary-container text-sm border-2 border-border-blue">
          PD
        </button>
      </div>
    </header>
  );
}
