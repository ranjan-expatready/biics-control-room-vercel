import Link from "next/link";
import PageShell from "@/components/ui/PageShell";

const controlRoomData = require("../../../data/demo/control_room.json");

export default function RisksPage() {

  return (
    <PageShell
      title="Portfolio Risks"
      subtitle="Enterprise risks that can invalidate multiple initiatives"
      actions={
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-hover)] transition-colors"
          >
            ← Back to Control Room
          </Link>
          <Link
            href="/exec-pack"
            className="bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)] px-4 py-2 rounded-md hover:bg-[var(--primary)] hover:text-white transition-colors"
          >
            View Executive Pack →
          </Link>
        </div>
      }
    >

      <div className="grid gap-6 md:grid-cols-2">
        {controlRoomData.portfolioRisks.map((risk: any) => (
          <div key={risk.id} className="card-base p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--text-strong)]">{risk.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                risk.severity === 'CRITICAL' ? 'bg-[var(--danger-bg)] text-[var(--danger-text)]' : 'bg-[var(--warning-bg)] text-[var(--warning-text)]'
              }`}>
                {risk.severity}
              </span>
            </div>

            <p className="text-[var(--text-muted)] mb-4">{risk.failureConsequence}</p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">Owner: {risk.ownerRole}</span>
              <span className={`font-medium ${
                risk.mitigationStatus === 'ACTIVE' ? 'text-[var(--success)]' :
                risk.mitigationStatus === 'PLANNED' ? 'text-[var(--warning)]' : 'text-[var(--danger)]'
              }`}>
                {risk.mitigationStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
