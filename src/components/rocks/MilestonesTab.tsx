import type { Rock } from "@/lib/types";
import StatusChip from "@/components/ui/StatusChip";

interface MilestonesTabProps {
  rock: Rock;
}

// Generate milestones from rock dates and actions
function getMilestones(rock: Rock) {
  const milestones = [];

  // Start milestone
  milestones.push({
    name: "Project Start",
    dueDate: rock.startDate,
    status: "Complete" as const,
    dependency: null,
  });

  // Target date milestone
  const today = new Date();
  const targetDate = new Date(rock.targetDate);
  const isOverdue = targetDate < today;
  
  milestones.push({
    name: "Target Completion",
    dueDate: rock.targetDate,
    status: isOverdue ? ("Overdue" as const) : ("Upcoming" as const),
    dependency: null,
  });

  // Add a mid-point milestone (simple calculation)
  const startDate = new Date(rock.startDate);
  const midDate = new Date(
    startDate.getTime() + (targetDate.getTime() - startDate.getTime()) / 2
  );
  
  if (midDate < today) {
    milestones.push({
      name: "Mid-Point Checkpoint",
      dueDate: midDate.toISOString().split("T")[0],
      status: "Complete" as const,
      dependency: null,
    });
  } else {
    milestones.push({
      name: "Mid-Point Checkpoint",
      dueDate: midDate.toISOString().split("T")[0],
      status: "Upcoming" as const,
      dependency: null,
    });
  }

  return milestones.sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}

export default function MilestonesTab({ rock }: MilestonesTabProps) {
  const milestones = getMilestones(rock);
  const today = new Date();
  
  const nextMilestone = milestones.find(
    (m) => new Date(m.dueDate) >= today && m.status !== "Complete"
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusDisplay = (milestone: typeof milestones[0]) => {
    if (milestone.status === "Complete") return "Complete";
    if (milestone.status === "Overdue") return "Overdue";
    return "Upcoming";
  };

  return (
    <div>
      {nextMilestone && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-blue-900">Next Milestone</div>
              <div className="mt-1 text-sm text-blue-700">{nextMilestone.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-blue-900">
                {getDaysUntil(nextMilestone.dueDate)} days
              </div>
              <div className="text-xs text-blue-600">
                {formatDate(nextMilestone.dueDate)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-[var(--border)]">
        <table className="min-w-full divide-y divide-[var(--border)]">
          <thead className="bg-[var(--surface)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Milestone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Dependency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {milestones.map((milestone, idx) => {
              const daysUntil = getDaysUntil(milestone.dueDate);
              const isOverdue = milestone.status === "Overdue";
              const isNext = milestone === nextMilestone;

              return (
                <tr
                  key={idx}
                  className={`${
                    isNext ? "bg-blue-50" : isOverdue ? "bg-red-50" : ""
                  }`}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-[var(--text)]">{milestone.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-[var(--text)]">{formatDate(milestone.dueDate)}</div>
                    {!milestone.status.includes("Complete") && (
                      <div className="text-xs text-[var(--text-muted)]">
                        {daysUntil > 0 ? `${daysUntil} days` : `${Math.abs(daysUntil)} days overdue`}
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusChip
                      status={
                        milestone.status === "Complete"
                          ? "Complete"
                          : milestone.status === "Overdue"
                            ? "Off Track"
                            : "On Track"
                      }
                      size="sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[var(--text-muted)]">
                      {milestone.dependency || "—"}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

