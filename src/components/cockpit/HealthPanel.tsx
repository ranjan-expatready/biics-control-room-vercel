import { getPortfolio, getRocks } from "@/lib/data";
import { calculatePortfolioHealthScore } from "@/lib/scoring";

export default function HealthPanel() {
  const portfolio = getPortfolio();
  const rocks = getRocks();
  const portfolioScore = calculatePortfolioHealthScore(rocks);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "text-green-700 bg-green-50";
      case "At Risk":
        return "text-yellow-700 bg-yellow-50";
      case "Off Track":
        return "text-red-700 bg-red-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Health Overview</h2>
      <div className="mb-6">
        <div className="mb-2 text-sm text-gray-600">Portfolio Health Score</div>
        <div className={`text-4xl font-bold ${getScoreColor(portfolioScore)}`}>
          {portfolioScore}
        </div>
        <div className="mt-1 text-xs text-gray-500">out of 100</div>
      </div>
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">Rock Status Summary</div>
        {rocks.slice(0, 5).map((rock) => (
          <div key={rock.id} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{rock.name}</div>
              <div className="text-xs text-gray-500">{rock.owner}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${getScoreColor(rock.healthScore)}`}>
                {rock.healthScore}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(rock.status)}`}
              >
                {rock.status}
              </span>
            </div>
          </div>
        ))}
        {rocks.length > 5 && (
          <div className="pt-2 text-xs text-gray-500">+{rocks.length - 5} more rocks</div>
        )}
      </div>
    </div>
  );
}

