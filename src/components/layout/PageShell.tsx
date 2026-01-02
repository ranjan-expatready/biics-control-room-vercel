import React from 'react';

/**
 * PageShell - Premium layout container for BIICS pages
 * Provides consistent max-width, padding, and vertical rhythm
 */
interface PageShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  printMode?: boolean;
  className?: string;
}

export default function PageShell({
  children,
  title,
  subtitle,
  rightSlot,
  printMode = false,
  className = ''
}: PageShellProps) {
  const ambientBackground = printMode ? {} : {
    background: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.02) 0%, transparent 50%),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)
    `
  };

  return (
    <div
      className={`min-h-screen ${printMode ? 'bg-white' : 'bg-bg'} ${className}`}
      style={ambientBackground}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
        {(title || subtitle || rightSlot) && (
          <header className="mb-12">
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                {title && (
                  <h1 className="text-4xl font-bold text-default tracking-tight mb-3">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xl text-muted leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
              {rightSlot && (
                <div className="flex-shrink-0">
                  {rightSlot}
                </div>
              )}
            </div>
          </header>
        )}

        <main className="space-y-12">
          {children}
        </main>
      </div>
    </div>
  );
}
