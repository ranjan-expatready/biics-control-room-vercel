import React from 'react';

interface ExecutiveSectionHeaderProps {
  title: string;
  contextLine?: string;
  level?: 1 | 2 | 3;
}

export default function ExecutiveSectionHeader({
  title,
  contextLine,
  level = 2
}: ExecutiveSectionHeaderProps) {
  const titleClass = level === 1
    ? 'text-3xl font-bold'
    : level === 2
    ? 'text-2xl font-bold'
    : 'text-xl font-bold';

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className={`${titleClass} text-default tracking-tight`}>{title}</h2>
        {contextLine && (
          <p className="text-muted mt-1">{contextLine}</p>
        )}
      </div>
    </div>
  );
}
