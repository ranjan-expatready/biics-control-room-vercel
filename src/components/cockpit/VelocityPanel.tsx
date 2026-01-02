import { getRocks, getActions, getKPIs } from "@/lib/data";

export default function VelocityPanel() {
  const rocks = getRocks();
  const actions = getActions();
  const kpis = getKPIs();

  const statusCounts = rocks.reduce(
    (acc, rock) => {
      acc[rock.status] = (acc[rock.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const actionCompletionRate =
    actions.length > 0
      ? Math.round((actions.filter((a) => a.status === "Complete").length / actions.length) * 100)
      : 0;

  const kpiTrends = kpis.reduce(
    (acc, kpi) => {
      acc[kpi.trend] = (acc[kpi.trend] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Velocity & Progress</h2>
      <div className="space-y-6">
        <div>
          <div className="mb-3 text-sm font-medium text-gray-700">Rock Status</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {statusCounts["On Track"] || 0}
              </div>
              <div className="text-xs text-green-700">On Track</div>
            </div>
            <div className="rounded-lg bg-yellow-50 p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {statusCounts["At Risk"] || 0}
              </div>
              <div className="text-xs text-yellow-700">At Risk</div>
            </div>
            <div className="rounded-lg bg-red-50 p-3 text-center">
              <div className="text-2xl font-bold text-red-600">
                {statusCounts["Off Track"] || 0}
              </div>
              <div className="text-xs text-red-700">Off Track</div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-gray-700">Action Completion</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{ width: `${actionCompletionRate}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-900">{actionCompletionRate}%</span>
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-gray-700">KPI Trends</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded bg-green-50 p-2 text-center text-green-700">
              <div className="font-semibold">{kpiTrends["Up"] || 0}</div>
              <div>Improving</div>
            </div>
            <div className="rounded bg-gray-50 p-2 text-center text-gray-700">
              <div className="font-semibold">{kpiTrends["Stable"] || 0}</div>
              <div>Stable</div>
            </div>
            <div className="rounded bg-red-50 p-2 text-center text-red-700">
              <div className="font-semibold">{kpiTrends["Down"] || 0}</div>
              <div>Declining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

