import { getRisks, getRocks } from "@/lib/data";

export default function RiskPanel() {
  const risks = getRisks();
  const rocks = getRocks();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "text-red-700 bg-red-50 border-red-200";
      case "High":
        return "text-orange-700 bg-orange-50 border-orange-200";
      case "Medium":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-blue-700 bg-blue-50 border-blue-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const riskCounts = risks.reduce(
    (acc, risk) => {
      if (risk.status === "Open") {
        acc[risk.severity] = (acc[risk.severity] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const topRisks = risks
    .filter((r) => r.status === "Open")
    .sort((a, b) => {
      const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return (severityOrder[b.severity as keyof typeof severityOrder] || 0) -
        (severityOrder[a.severity as keyof typeof severityOrder] || 0);
    })
    .slice(0, 5);

  const getRockName = (rockId: string) => {
    return rocks.find((r) => r.id === rockId)?.name || "Unknown Rock";
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Risk Exposure</h2>
      <div className="mb-6 grid grid-cols-4 gap-3">
        {["Critical", "High", "Medium", "Low"].map((severity) => (
          <div key={severity} className="text-center">
            <div className={`text-2xl font-bold ${getSeverityColor(severity).split(" ")[0]}`}>
              {riskCounts[severity] || 0}
            </div>
            <div className="text-xs text-gray-600">{severity}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">Top Risks</div>
        {topRisks.map((risk) => (
          <div
            key={risk.id}
            className={`rounded-lg border p-3 ${getSeverityColor(risk.severity)}`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold">{risk.severity}</span>
              <span className="text-xs text-gray-600">{getRockName(risk.rockId)}</span>
            </div>
            <div className="text-sm font-medium">{risk.title}</div>
            <div className="mt-1 text-xs opacity-80">{risk.owner}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

