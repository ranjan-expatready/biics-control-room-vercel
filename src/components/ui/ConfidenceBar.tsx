interface ConfidenceBarProps {
  confidence: "High" | "Medium" | "Low";
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ConfidenceBar({
  confidence,
  showLabel = true,
  size = "md",
}: ConfidenceBarProps) {
  const confidenceValue = confidence === "High" ? 100 : confidence === "Medium" ? 70 : 40;
  const confidenceColor =
    confidence === "High"
      ? "bg-[var(--success)]"
      : confidence === "Medium"
        ? "bg-[var(--warning)]"
        : "bg-[var(--danger)]";

  const height = size === "sm" ? "h-1" : "h-1.5";
  const width = size === "sm" ? "w-16" : "w-20";

  return (
    <div className="flex items-center gap-2">
      <div className={`${width} rounded-full bg-gray-200 ${height}`}>
        <div
          className={`${height} rounded-full ${confidenceColor} transition-all`}
          style={{ width: `${confidenceValue}%` }}
        />
      </div>
      {showLabel && (
        <div className="group relative">
          <span className="cursor-help text-xs text-gray-600">
            {confidenceValue}% confidence
          </span>
          <div className="pointer-events-none invisible absolute left-0 top-full z-10 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-lg transition-opacity group-hover:visible group-hover:pointer-events-auto">
            Evidence/Confidence reflects data freshness, completeness, and evidence coverage.
          </div>
        </div>
      )}
    </div>
  );
}

