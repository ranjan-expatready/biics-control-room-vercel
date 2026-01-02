interface MetricPillProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "flat";
  size?: "sm" | "md";
}

export default function MetricPill({ label, value, trend, size = "md" }: MetricPillProps) {
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const trendColor =
    trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500";

  const sizeClasses = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="flex flex-col gap-0.5">
      <div className={`font-medium text-gray-900 ${sizeClasses}`}>{value}</div>
      <div className="flex items-center gap-1 text-xs text-gray-600">
        <span>{label}</span>
        {trend && <span className={trendColor}>{trendIcon}</span>}
      </div>
    </div>
  );
}

