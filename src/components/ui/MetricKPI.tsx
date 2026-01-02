import React from 'react';
import { typography } from '@/lib/typography';

/**
 * MetricKPI - Compact KPI display block
 * Shows label + value + sublabel in enterprise-style layout
 */
interface MetricKPIProps {
  label: string;
  value: string | number;
  sublabel?: string;
  tone?: 'danger' | 'warning' | 'success' | 'neutral';
  className?: string;
}

export default function MetricKPI({
  label,
  value,
  sublabel,
  tone = 'neutral',
  className = ''
}: MetricKPIProps) {
  const getValueStyle = () => {
    switch (tone) {
      case 'danger':
        return { color: 'var(--danger)' };
      case 'warning':
        return { color: 'var(--warning)' };
      case 'success':
        return { color: 'var(--success)' };
      case 'neutral':
      default:
        return { color: 'var(--text-strong)' };
    }
  };

  const getAccentStyle = () => {
    switch (tone) {
      case 'danger':
        return { borderLeft: '2px solid var(--danger)' };
      case 'warning':
        return { borderLeft: '2px solid var(--warning)' };
      case 'success':
        return { borderLeft: '2px solid var(--success)' };
      case 'neutral':
      default:
        return { borderLeft: '2px solid var(--border-subtle)' };
    }
  };

  return (
    <div
      className={`inline-flex flex-col px-3 py-2 rounded-sm bg-surface-2 border ${className}`}
      style={getAccentStyle()}
    >
      <div className={typography.overline}>
        {label}
      </div>
      <div
        className="text-lg font-bold"
        style={getValueStyle()}
      >
        {value}
      </div>
      {sublabel && (
        <div className={typography.caption}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
