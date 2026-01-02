import React from 'react';

interface ExecutiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accent?: 'danger' | 'warning' | 'neutral';
  className?: string;
}

export default function ExecutiveCard({
  children,
  accent = 'neutral',
  className = '',
  ...props
}: ExecutiveCardProps) {
  const getAccentStyles = () => {
    switch (accent) {
      case 'danger':
        return {
          borderColor: 'var(--danger)',
          boxShadow: 'var(--shadow-md), 0 0 0 1px rgb(220 38 38 / 0.1)',
        };
      case 'warning':
        return {
          borderColor: 'var(--warning)',
          boxShadow: 'var(--shadow-md), 0 0 0 1px rgb(217 119 6 / 0.1)',
        };
      default:
        return {
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-md)',
        };
    }
  };

  const accentStyles = getAccentStyles();

  return (
    <div
      className={`card-biics bg-[var(--bg)] border-[var(--border)] rounded-[var(--radius-md)] ${className}`}
      style={{
        borderLeftColor: accentStyles.borderColor,
        borderLeftWidth: '4px',
        boxShadow: accentStyles.boxShadow,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
