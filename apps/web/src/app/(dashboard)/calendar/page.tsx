export default async function CalendarPage() {
  let schedule = [];
  try {
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/calendar', { cache: 'no-store' });
    if (res.ok) schedule = await res.json();
  } catch (err) {}

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="font-poppins font-bold text-2xl text-on-surface mb-6">Content Calendar 📅</h1>
      <div className="bg-white border border-border-blue rounded-xl p-6">
        <p className="text-on-surface-variant mb-6">Schedule your generated scripts to auto-publish.</p>
        
        {schedule.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No content scheduled.</p>
        ) : (
          <div className="space-y-4">
            {schedule.map((item: any) => (
              <div key={item.id} className="p-4 border border-border-blue rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.platform}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.date}</p>
                  <p className="text-xs text-on-surface-variant">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
