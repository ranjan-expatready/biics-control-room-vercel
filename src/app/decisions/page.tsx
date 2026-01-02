import Link from "next/link";
import PageShell from "@/components/ui/PageShell";

const controlRoomData = require("../../../data/demo/control_room.json");

export default function DecisionsPage() {

  return (
    <PageShell
      title="Decisions"
      subtitle="Executive decisions requiring action this week"
    >

      <div className="space-y-4">
        {controlRoomData.decisions.map((decision: any) => {
          const linkedInitiative = controlRoomData.initiatives.find((i: any) =>
            decision.linkedInitiativeIds.includes(i.id)
          );

          return (
            <div key={decision.id} className="card-base p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/rocks/${linkedInitiative?.id || decision.linkedInitiativeIds[0]}#decision`}
                    className="text-lg font-semibold text-[var(--text-strong)] hover:text-[var(--primary)] transition-colors"
                  >
                    {decision.title}
                  </Link>
                  <p className="text-[var(--text-muted)] mt-2">{decision.delayCostNarrative}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-muted)]">
                    <span>Owner: {decision.execOwner}</span>
                    <span>Due: {decision.dueInDays} days</span>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-lg font-bold text-[var(--danger)]">
                    ${(decision.valueAtRiskUsd / 1000000).toFixed(1)}M at risk
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
