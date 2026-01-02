import { getRisksForRock } from "@/lib/data";
import type { Risk } from "@/lib/types";

interface RisksDependenciesTabProps {
  rockId: string;
}

// Calculate risk score (severity × probability)
function getRiskScore(risk: Risk): number {
  const severityScores = { Critical: 4, High: 3, Medium: 2, Low: 1 };
  const probabilityScores = { High: 3, Medium: 2, Low: 1 };
  
  return (
    (severityScores[risk.severity] || 0) * (probabilityScores[risk.probability] || 0)
  );
}

// Generate dependencies from risks (simplified for demo)
function getDependencies(risks: Risk[]) {
  // Extract dependencies from risk descriptions and mitigation plans
  const dependencies: Array<{
    name: string;
    type: "External" | "Internal";
    exposure: string;
  }> = [];

  risks.forEach((risk) => {
    const mitigation = risk.mitigation.toLowerCase();
    
    // Look for dependency indicators
    if (mitigation.includes("vendor") || mitigation.includes("third-party") || 
        mitigation.includes("partner") || mitigation.includes("external")) {
      dependencies.push({
        name: risk.title,
        type: "External",
        exposure: risk.severity === "Critical" || risk.severity === "High" 
          ? "High exposure" 
          : "Moderate exposure",
      });
    } else if (mitigation.includes("team") || mitigation.includes("internal") ||
               mitigation.includes("resource")) {
      dependencies.push({
        name: risk.title,
        type: "Internal",
        exposure: risk.severity === "Critical" || risk.severity === "High"
          ? "High exposure"
          : "Moderate exposure",
      });
    }
  });

  // Limit to 5 and deduplicate
  const unique = Array.from(
    new Map(dependencies.map((d) => [d.name, d])).values()
  ).slice(0, 5);

  return unique;
}

export default function RisksDependenciesTab({ rockId }: RisksDependenciesTabProps) {
  const risks = getRisksForRock(rockId);
  const openRisks = risks.filter((r) => r.status === "Open");
  
  // Top 5 risks by score
  const topRisks = openRisks
    .map((risk) => ({ risk, score: getRiskScore(risk) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ risk }) => risk);

  const dependencies = getDependencies(openRisks);

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

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
        <p className="text-sm text-gray-700">
          <strong>These are the few risks that can realistically break outcomes.</strong>
        </p>
      </div>

      {/* Top Risks */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Top Risks
        </h3>
        {topRisks.length > 0 ? (
          <div className="space-y-3">
            {topRisks.map((risk) => (
              <div
                key={risk.id}
                className={`rounded-lg border p-4 ${getSeverityColor(risk.severity)}`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 text-sm font-semibold">{risk.title}</div>
                    <div className="text-xs opacity-90">{risk.description}</div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-xs font-semibold">{risk.severity}</div>
                    <div className="text-xs opacity-75">{risk.probability} probability</div>
                  </div>
                </div>
                <div className="mt-3 border-t border-current border-opacity-20 pt-3">
                  <div className="mb-1 text-xs font-medium">Mitigation</div>
                  <div className="text-xs opacity-90">{risk.mitigation}</div>
                </div>
                <div className="mt-2 text-xs opacity-75">Owner: {risk.owner}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            No open risks identified
          </div>
        )}
      </div>

      {/* Key Dependencies */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Key Dependencies
        </h3>
        {dependencies.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Dependency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Exposure
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dependencies.map((dep, idx) => (
                  <tr key={idx}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{dep.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          dep.type === "External"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {dep.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{dep.exposure}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            No key dependencies identified
          </div>
        )}
      </div>
    </div>
  );
}

