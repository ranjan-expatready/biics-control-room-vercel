import React from 'react';
import { typography } from '@/lib/typography';

/**
 * ZoneHeader - Consistent zone header component
 * Title + optional right-side context + optional subtitle
 */
interface ZoneHeaderProps {
  title: string;
  context?: string;
  subtitle?: string;
  icon?: string;
  className?: string;
}

export default function ZoneHeader({
  title,
  context,
  subtitle,
  icon,
  className = ''
}: ZoneHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h2 className={typography.h3}>
            {title}
          </h2>
        </div>
        {context && (
          <div className="text-sm text-muted font-medium">
            {context}
          </div>
        )}
      </div>
      {subtitle && (
        <p className={typography.body}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
