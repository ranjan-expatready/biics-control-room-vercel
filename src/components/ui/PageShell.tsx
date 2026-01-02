import { ReactNode } from 'react';
import { DESIGN_CONTRACT } from '@/lib/designContract';

interface PageShellProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function PageShell({ title, subtitle, titleClassName, subtitleClassName, actions, children }: PageShellProps) {
  return (
    <div className={DESIGN_CONTRACT.pageShell.container}>
      {/* Page Header */}
      <div className={DESIGN_CONTRACT.layouts.headerFlex}>
        <div>
          <h1 className={titleClassName || DESIGN_CONTRACT.pageShell.title}>{title}</h1>
          {subtitle && (
            <p className={subtitleClassName || DESIGN_CONTRACT.pageShell.subtitle}>{subtitle}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>

      {/* Page Content */}
      <div className={DESIGN_CONTRACT.pageShell.sectionGap}>
        {children}
      </div>
    </div>
  );
}
