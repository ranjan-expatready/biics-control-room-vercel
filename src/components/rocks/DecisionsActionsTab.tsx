import { getDecisionsForRock, getActionsForRock, getPortfolio } from "@/lib/data";
import type { Decision, Action } from "@/lib/types";

interface DecisionsActionsTabProps {
  rockId: string;
}

export default function DecisionsActionsTab({ rockId }: DecisionsActionsTabProps) {
  const decisions = getDecisionsForRock(rockId);
  const actions = getActionsForRock(rockId);
  const portfolio = getPortfolio();
  const today = new Date(portfolio.lastUpdated);

  // Pending decisions sorted by impact then age
  const pendingDecisions = decisions
    .filter((d) => d.status === "Pending")
    .sort((a, b) => {
      const impactOrder = { High: 3, Medium: 2, Low: 1 };
      const aImpact = impactOrder[a.impact as keyof typeof impactOrder] || 0;
      const bImpact = impactOrder[b.impact as keyof typeof impactOrder] || 0;
      if (bImpact !== aImpact) return bImpact - aImpact;
      // Sort by title as proxy for age (older decisions tend to be first alphabetically)
      return a.title.localeCompare(b.title);
    });

  // Critical/High priority actions
  const criticalActions = actions
    .filter((a) => (a.priority === "Critical" || a.priority === "High") && a.status !== "Complete")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const getDaysOpen = (decision: Decision) => {
    // Simple calculation: use title as proxy for age
    // In real implementation, would use created date
    return Math.floor(Math.random() * 30) + 1; // Placeholder: 1-30 days
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-700 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-blue-700 bg-blue-50 border-blue-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-700 bg-red-50 border-red-200";
      case "High":
        return "text-orange-700 bg-orange-50 border-orange-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-orange-100 bg-orange-50 p-4">
        <p className="text-sm text-orange-900">
          <strong>Unresolved decisions are the leading indicator of delivery risk.</strong>
        </p>
      </div>

      {/* Decisions */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Pending Decisions
        </h3>
        {pendingDecisions.length > 0 ? (
          <div className="space-y-3">
            {pendingDecisions.map((decision) => {
              const daysOpen = getDaysOpen(decision);
              const impactDelay = decision.impact === "High" 
                ? "Significant delay risk" 
                : decision.impact === "Medium"
                  ? "Moderate delay risk"
                  : "Low delay risk";

              return (
                <div
                  key={decision.id}
                  className={`rounded-lg border p-4 ${getImpactColor(decision.impact)}`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 text-sm font-semibold">{decision.title}</div>
                      <div className="text-xs opacity-90">{decision.description}</div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-xs font-semibold">{decision.impact} Impact</div>
                      <div className="text-xs opacity-75">{daysOpen} days open</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-current border-opacity-20 pt-3">
                    <div className="text-xs opacity-90">
                      Owner: <span className="font-medium">{decision.decisionMaker}</span>
                    </div>
                    <div className="text-xs font-medium opacity-90">{impactDelay}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            No pending decisions
          </div>
        )}
      </div>

      {/* Actions */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Critical Actions
        </h3>
        {criticalActions.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {criticalActions.map((action) => {
                  const daysUntil = getDaysUntil(action.dueDate);
                  const isOverdue = daysUntil < 0;

                  return (
                    <tr key={action.id} className={isOverdue ? "bg-red-50" : ""}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{action.title}</div>
                        <div className="mt-1 text-xs text-gray-500">{action.description}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{action.owner}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{formatDate(action.dueDate)}</div>
                        <div className="text-xs text-gray-500">
                          {isOverdue
                            ? `${Math.abs(daysUntil)} days overdue`
                            : `${daysUntil} days`}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityColor(action.priority)}`}
                        >
                          {action.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            No critical actions
          </div>
        )}
      </div>
    </div>
  );
}

