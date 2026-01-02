import React from 'react';

interface DeadlineTagProps {
  days: number;
  type: 'irreversibility' | 'due';
  size?: 'sm' | 'md';
}

export default function DeadlineTag({ days, type, size = 'sm' }: DeadlineTagProps) {
  const isUrgent = days <= 14;
  const label = type === 'irreversibility' ? 'irreversibility' : 'due';

  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const urgentStyles = isUrgent ? 'text-[var(--danger-text)] bg-[var(--danger-bg)] border-[var(--danger)]/20' : 'text-[var(--text-muted)] bg-[var(--surface)] border-[var(--border)]';

  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-medium ${urgentStyles} ${textSize}`}>
      {days} days to {label}
    </span>
  );
}
