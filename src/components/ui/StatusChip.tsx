interface StatusChipProps {
  status: "On Track" | "At Risk" | "Off Track" | "Complete" | "Watch" | "Critical";
  size?: "sm" | "md";
}

export default function StatusChip({ status, size = "md" }: StatusChipProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "On Track":
      case "Complete":
        return "bg-[var(--success-bg)] text-[var(--success-text)] border-[var(--success)]/20";
      case "Watch":
      case "At Risk":
        return "bg-[var(--warning-bg)] text-[var(--warning-text)] border-[var(--warning)]/20";
      case "Off Track":
      case "Critical":
        return "bg-[var(--danger-bg)] text-[var(--danger-text)] border-[var(--danger)]/20";
      default:
        return "bg-[var(--muted)] text-[var(--text-muted)] border-[var(--border)]";
    }
  };

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${getStatusStyles()} ${sizeClasses}`}
    >
      {status}
    </span>
  );
}

