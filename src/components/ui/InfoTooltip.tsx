import { ReactNode } from 'react';

interface InfoTooltipProps {
  title: string;
  meaning: string;
  calculation: string;
  children?: ReactNode;
}

export default function InfoTooltip({ title, meaning, calculation, children }: InfoTooltipProps) {
  return (
    <div className="group relative inline-block">
      <span className="cursor-help text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
        ⓘ
      </span>

      {/* Tooltip panel */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 min-w-[300px]">
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[var(--card-bg)]"></div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[var(--border)] mt-[-1px]"></div>

        {/* Content */}
        <div className="text-sm">
          <div className="font-semibold text-[var(--text-strong)] mb-2">{title}</div>
          <div className="text-[var(--text)] mb-2">
            <strong>Meaning:</strong> {meaning}
          </div>
          <div className="text-[var(--text-muted)] text-xs">
            <strong>Calculation:</strong> {calculation}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
