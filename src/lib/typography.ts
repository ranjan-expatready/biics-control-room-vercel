/**
 * BIICS Typography System - Premium executive rhythm
 * Consistent text hierarchy for board-grade readability
 */

export const typography = {
  // Display - Hero titles, main headings
  display: 'text-5xl font-bold text-default tracking-tight leading-tight',

  // Headings - Section headers
  h1: 'text-4xl font-bold text-default tracking-tight leading-tight',
  h2: 'text-3xl font-bold text-default tracking-tight leading-snug',
  h3: 'text-2xl font-semibold text-default tracking-tight leading-snug',
  h4: 'text-xl font-semibold text-default tracking-tight leading-snug',

  // Body text - Primary content
  bodyLarge: 'text-lg text-default leading-relaxed',
  body: 'text-base text-default leading-relaxed',
  bodySmall: 'text-sm text-default leading-relaxed',

  // Supporting text
  caption: 'text-sm text-muted font-medium uppercase tracking-wide',
  overline: 'text-xs text-muted font-semibold uppercase tracking-wider',

  // Emphasis variants
  bodyEmphasis: 'text-base text-strong leading-relaxed font-medium',
  bodyMuted: 'text-base text-muted leading-relaxed',
  bodySoft: 'text-base text-soft leading-relaxed',
} as const;

// Interactive element styles
export const interactive = {
  link: 'text-primary hover:text-primary-hover underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  linkSubtle: 'text-primary hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  button: 'bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  buttonSecondary: 'bg-surface text-default border border-border hover:bg-surface-2 px-4 py-2 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
} as const;
