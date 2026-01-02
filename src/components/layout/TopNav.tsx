export default function TopNav() {
  // Get Canadian time and date
  const now = new Date();
  const canadianTime = now.toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const canadianDate = now.toLocaleDateString("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <nav className="border-b border-[var(--border)] bg-[#1d4ed8] px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/BIICSlogo.png"
            alt="BIICS Logo"
            className="h-14 w-auto"
          />
          <div className="flex flex-col h-14 ml-2">
            <h1 className="text-xl font-bold text-white tracking-tight leading-none mt-1" style={{ color: '#ffffff' }}>BIICS</h1>
            <span className="text-xs font-medium leading-none -mt-5" style={{ color: '#ffffff' }}>Business Intelligence and Innovation Consulting Services</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-xl font-bold tracking-tight" style={{ color: '#ffffff' }}>Program Balanced Scorecard OS</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium" style={{ color: '#ffffff' }}>{canadianTime}</div>
            <div className="text-xs" style={{ color: '#ffffff' }}>{canadianDate}</div>
          </div>
          <div className="px-3 py-1 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-medium rounded-sm border border-[var(--accent)]/20">
            DEMO
          </div>
        </div>
      </div>
    </nav>
  );
}

