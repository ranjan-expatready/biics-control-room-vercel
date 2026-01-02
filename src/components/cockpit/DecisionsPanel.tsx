import { getDecisions, getRocks, getActions } from "@/lib/data";

export default function DecisionsPanel() {
  // Use cached data to avoid recomputation
  const decisions = getDecisions();
  const rocks = getRocks();
  const actions = getActions();

  // Sort pending decisions by impact (High first), then by age (older first)
  const pendingDecisions = decisions
    .filter((d) => d.status === "Pending")
    .sort((a, b) => {
      const impactOrder = { High: 3, Medium: 2, Low: 1 };
      const aImpact = impactOrder[a.impact as keyof typeof impactOrder] || 0;
      const bImpact = impactOrder[b.impact as keyof typeof impactOrder] || 0;
      if (bImpact !== aImpact) return bImpact - aImpact;
      // If same impact, sort by title (as proxy for age - older decisions tend to be first alphabetically)
      return a.title.localeCompare(b.title);
    })
    .slice(0, 5);

  const criticalActions = actions
    .filter((a) => (a.priority === "Critical" || a.priority === "High") && a.status !== "Complete")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const getRockName = (rockId: string) => {
    return rocks.find((r) => r.id === rockId)?.name || "Unknown Rock";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-700 bg-red-50";
      case "Medium":
        return "text-yellow-700 bg-yellow-50";
      case "Low":
        return "text-blue-700 bg-blue-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-700 bg-red-50";
      case "High":
        return "text-orange-700 bg-orange-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Decision & Action Center</h2>
      <div className="mb-4 rounded-lg border border-orange-100 bg-orange-50 p-3">
        <p className="text-xs text-orange-900">
          <strong>Unresolved decisions are the leading indicator of delivery risk.</strong>
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <div className="mb-3 text-sm font-semibold text-gray-900">Decisions Needed This Week</div>
          <div className="space-y-2">
            {pendingDecisions.length > 0 ? (
              pendingDecisions.map((decision) => (
                <div key={decision.id} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${getImpactColor(decision.impact)}`}
                    >
                      {decision.impact} Impact
                    </span>
                    <span className="text-xs text-gray-500">{getRockName(decision.rockId)}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{decision.title}</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
                    <span>{decision.decisionMaker}</span>
                    <span className="font-medium">{decision.impact} impact</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm text-gray-500">No pending decisions</div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-gray-900">Critical Actions Due</div>
          <div className="space-y-2">
            {criticalActions.length > 0 ? (
              criticalActions.map((action) => (
                <div key={action.id} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(action.priority)}`}
                    >
                      {action.priority}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(action.dueDate)}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{action.title}</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
                    <span>{action.owner}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Due: {formatDate(action.dueDate)}</span>
                      <span className="capitalize">{action.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm text-gray-500">No critical actions</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

