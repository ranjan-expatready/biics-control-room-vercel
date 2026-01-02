import Link from "next/link";
import StatusChip from "@/components/ui/StatusChip";
import ConfidenceBar from "@/components/ui/ConfidenceBar";
import Sparkline from "@/components/ui/Sparkline";

interface RockSummary {
  rock: {
    id: string;
    name: string;
    owner: string;
    confidence: "High" | "Medium" | "Low";
  };
  healthScore: number;
  status: "On Track" | "Watch" | "At Risk" | "Critical";
  trend: string;
  whatChanged: string;
  sparklineData: number[];
}

interface PortfolioGridProps {
  rockSummaries: RockSummary[];
}

export default function PortfolioGrid({ rockSummaries }: PortfolioGridProps) {

  if (rockSummaries.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">No rocks in portfolio</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {rockSummaries.map((summary) => {
        const { rock, healthScore, status, trend, whatChanged, sparklineData } = summary;

        return (
          <Link
            key={rock.id}
            href={`/rocks/${rock.id}`}
            data-testid="rock-tile"
            className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700">
                  {rock.name}
                </h3>
                <p className="text-xs text-gray-500">{rock.owner}</p>
              </div>
              <StatusChip status={status} size="sm" />
            </div>

            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{healthScore}</div>
                <div className="text-xs text-gray-500">Health Score</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Sparkline values={sparklineData} width={50} height={16} />
                <span className="text-xs text-gray-500">
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <ConfidenceBar confidence={rock.confidence} size="sm" showLabel={false} />
            </div>

            <div className="border-t border-gray-100 pt-2">
              <p className="text-xs text-gray-600 line-clamp-2">{whatChanged}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

