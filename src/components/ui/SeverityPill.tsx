import React from 'react';

interface SeverityPillProps {
  severity: 'FAILING' | 'WARNING' | 'ACCEPTABLE';
  size?: 'sm' | 'md';
}

export default function SeverityPill({ severity, size = 'sm' }: SeverityPillProps) {
  const getStyles = () => {
    switch (severity) {
      case 'FAILING':
        return 'bg-[var(--danger-bg)] text-[var(--danger-text)] border-[var(--danger)]/20';
      case 'WARNING':
        return 'bg-[var(--warning-bg)] text-[var(--warning-text)] border-[var(--warning)]/20';
      case 'ACCEPTABLE':
        return 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]';
      default:
        return 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-sm border font-medium ${getStyles()} ${sizeClasses}`}>
      {severity}
    </span>
  );
}
