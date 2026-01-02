import { getKPIsForRock } from "@/lib/data";
import type { KPI } from "@/lib/types";
import StatusChip from "@/components/ui/StatusChip";
import ConfidenceBar from "@/components/ui/ConfidenceBar";
import Sparkline from "@/components/ui/Sparkline";

interface ScorecardTabProps {
  rockId: string;
}

// Group KPIs into categories (simple keyword matching for demo)
function categorizeKPI(kpi: KPI): "outcomes" | "delivery" | "risk" | "adoption" {
  const name = kpi.name.toLowerCase();
  const desc = kpi.description.toLowerCase();

  if (name.includes("revenue") || name.includes("retention") || name.includes("churn") || 
      name.includes("adoption") || name.includes("engagement") || name.includes("satisfaction")) {
    return "outcomes";
  }
  if (name.includes("migration") || name.includes("progress") || name.includes("completion") ||
      name.includes("delivery") || name.includes("cycle") || name.includes("time")) {
    return "delivery";
  }
  if (name.includes("risk") || name.includes("security") || name.includes("incident") ||
      name.includes("vulnerability") || name.includes("compliance") || name.includes("audit")) {
    return "risk";
  }
  return "adoption";
}

export default function ScorecardTab({ rockId }: ScorecardTabProps) {
  const kpis = getKPIsForRock(rockId).slice(0, 15); // Max 15 KPIs

  const groupedKPIs = {
    outcomes: kpis.filter((k) => categorizeKPI(k) === "outcomes"),
    delivery: kpis.filter((k) => categorizeKPI(k) === "delivery"),
    risk: kpis.filter((k) => categorizeKPI(k) === "risk"),
    adoption: kpis.filter((k) => categorizeKPI(k) === "adoption"),
  };

  const sections = [
    { id: "outcomes", title: "Outcomes & Value", kpis: groupedKPIs.outcomes },
    { id: "delivery", title: "Delivery & Execution", kpis: groupedKPIs.delivery },
    { id: "risk", title: "Risk & Controls", kpis: groupedKPIs.risk },
    { id: "adoption", title: "Adoption & Change", kpis: groupedKPIs.adoption },
  ];

  const getSparklineData = (kpi: KPI) => {
    // Generate trend data based on current vs target
    const ratio = kpi.current / kpi.target;
    const base = ratio * 100;
    return [
      base - 10,
      base - 5,
      base - 2,
      base,
      base + 1,
    ].map((v) => Math.max(0, Math.min(100, v)));
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") return `${value.toFixed(1)}%`;
    if (unit === "USD") return `$${(value / 1000).toFixed(0)}k`;
    if (unit === "days") return `${value}d`;
    if (unit === "count") return value.toString();
    return `${value} ${unit}`;
  };

  return (
    <div>
      <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Health is confidence-weighted;</strong> progress without evidence does not score.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => {
          if (section.kpis.length === 0) return null;

          return (
            <div key={section.id}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.kpis.map((kpi) => {
                  const trend = kpi.trend === "Up" ? "up" : kpi.trend === "Down" ? "down" : "flat";
                  const sparklineData = getSparklineData(kpi);
                  const progress = Math.min((kpi.current / kpi.target) * 100, 100);

                  return (
                    <div
                      key={kpi.id}
                      className="rounded-lg border border-gray-200 bg-white p-4"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1 text-sm font-semibold text-gray-900">
                            {kpi.name}
                          </div>
                          <div className="text-xs text-gray-500">{kpi.description}</div>
                        </div>
                        <StatusChip status={kpi.status} size="sm" />
                      </div>

                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                          <div className="text-xs text-gray-500">Current</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {formatValue(kpi.current, kpi.unit)}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="text-xs text-gray-500">Target</div>
                          <div className="text-sm font-medium text-gray-700">
                            {formatValue(kpi.target, kpi.unit)}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="mb-1 text-xs text-gray-500">Trend</div>
                          <div className="flex items-center gap-2">
                            <Sparkline values={sparklineData} width={40} height={16} />
                            <span className="text-xs text-gray-600">
                              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="mb-1 text-xs text-gray-500">Progress</div>
                          <div className="h-2 rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full ${
                                progress >= 90
                                  ? "bg-green-500"
                                  : progress >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {progress.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

