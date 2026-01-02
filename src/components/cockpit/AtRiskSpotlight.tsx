import Link from "next/link";
import { getRocks } from "@/lib/data";
import { calculateRockHealthScore } from "@/lib/scoring";
import { getWhatChanged, getDecisionsForRock } from "@/lib/data";
import StatusChip from "@/components/ui/StatusChip";

export default function AtRiskSpotlight() {
  // Use pre-sorted rocks from the cached data (lowest health first)
  const rocks = getRocks();

  // Get top 3 rocks by lowest health score (already sorted this way)
  const atRiskRocks = rocks
    .slice(0, 3)
    .map((rock) => ({
      rock,
      healthScore: calculateRockHealthScore(rock), // Still need to calculate for display
    }));

  const getDaysToNextCheckpoint = (rock: typeof rocks[0]) => {
    // Simple calculation: days until target date
    const targetDate = new Date(rock.targetDate);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">At-Risk Spotlight</h2>
      {atRiskRocks.length === 0 && (
        <div className="py-8 text-center text-sm text-gray-500">
          All rocks are on track. No immediate attention required.
        </div>
      )}
      <div className="space-y-4">
        {atRiskRocks.map(({ rock, healthScore }) => {
          const whatChanged = getWhatChanged(rock.id);
          const pendingDecisions = getDecisionsForRock(rock.id).filter(
            (d) => d.status === "Pending"
          );
          const daysToCheckpoint = getDaysToNextCheckpoint(rock);

          return (
            <Link
              key={rock.id}
              href={`/rocks/${rock.id}`}
              className="block rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{rock.name}</h3>
                  <p className="text-xs text-gray-600">{rock.owner}</p>
                </div>
                <div className="text-right">
                  <div className="mb-1 text-lg font-bold text-red-600">{healthScore}</div>
                  <StatusChip
                    status={healthScore >= 50 ? "Watch" : healthScore >= 30 ? "At Risk" : "Critical"}
                    size="sm"
                  />
                </div>
              </div>

              <div className="mb-2">
                <p className="text-xs text-gray-700">{whatChanged}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span
                    className={`font-medium ${
                      pendingDecisions.length > 0 ? "text-orange-600" : "text-gray-500"
                    }`}
                  >
                    Decision needed: {pendingDecisions.length > 0 ? "Yes" : "No"}
                  </span>
                </div>
                <span className="text-gray-500">
                  Next checkpoint: {daysToCheckpoint > 0 ? `${daysToCheckpoint}d` : "Overdue"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

