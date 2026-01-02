import React from 'react';

/**
 * EmphasisText - Highlights key phrases with subtle enterprise styling
 * Used sparingly for critical information that needs executive attention
 */
interface EmphasisTextProps {
  tone: 'danger' | 'warning' | 'success' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export default function EmphasisText({ tone, children, className = '' }: EmphasisTextProps) {
  const getStyles = () => {
    switch (tone) {
      case 'danger':
        return {
          background: 'var(--danger-soft)',
          borderLeft: '3px solid var(--danger)',
          color: 'var(--text)',
        };
      case 'warning':
        return {
          background: 'var(--warning-soft)',
          borderLeft: '3px solid var(--warning)',
          color: 'var(--text)',
        };
      case 'success':
        return {
          background: 'var(--success-soft)',
          borderLeft: '3px solid var(--success)',
          color: 'var(--text)',
        };
      case 'neutral':
      default:
        return {
          background: 'var(--surface-2)',
          borderLeft: '3px solid var(--border)',
          color: 'var(--text-strong)',
        };
    }
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-r-sm text-sm font-medium ${className}`}
      style={getStyles()}
    >
      {children}
    </span>
  );
}
