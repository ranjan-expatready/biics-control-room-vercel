/**
 * BIICS Brand Kit - Enterprise-grade design system
 * Inspired by executive decks: clean, confident, structured
 */

export const brandKit = {
  // Color Palette - Semantic only, enterprise-appropriate
  palette: {
    // Primary - Professional blue for links/actions
    primary: 'var(--primary)',
    primaryHover: 'var(--primary-hover)',
    primaryForeground: 'var(--primary-foreground)',

    // Accent - Sophisticated teal for secondary elements
    accent: 'var(--accent)',
    accentHover: 'var(--accent-hover)',
    accentForeground: 'var(--accent-foreground)',

    // Neutral - Clean grays for text/surfaces
    neutral: 'var(--bg)',
    surface: 'var(--surface)',
    surface2: 'var(--surface-2)',
    surface3: 'var(--surface-3)',

    // Status - Semantic colors for decision states
    danger: 'var(--danger)',
    dangerSoft: 'var(--danger-soft)',
    warning: 'var(--warning)',
    warningSoft: 'var(--warning-soft)',
    success: 'var(--success)',
    successSoft: 'var(--success-soft)',

    // Text hierarchy
    text: 'var(--text)',
    textStrong: 'var(--text-strong)',
    textMuted: 'var(--text-muted)',
    textSubtle: 'var(--text-subtle)',

    // Borders
    border: 'var(--border)',
    borderSubtle: 'var(--border-subtle)',
  },

  // Typography Scale - Board-grade hierarchy
  typeScale: {
    // Display
    display1: 'var(--text-4xl)',
    display2: 'var(--text-3xl)',

    // Headings
    h1: 'var(--text-3xl)',
    h2: 'var(--text-2xl)',
    h3: 'var(--text-xl)',
    h4: 'var(--text-lg)',

    // Body
    bodyLarge: 'var(--text-base)',
    body: 'var(--text-sm)',
    bodySmall: 'var(--text-xs)',

    // Emphasis
    caption: 'var(--text-xs)',
    overline: 'var(--text-xs)',
  },

  // Elevation System - Subtle, professional shadows
  elevation: {
    none: 'none',
    low: 'var(--shadow-sm)',
    medium: 'var(--shadow-md)',
    high: 'var(--shadow-lg)',
    focus: 'var(--focus-ring)',
  },

  // Emphasis Rules - Rare, meaningful highlights
  emphasis: {
    // Callouts for critical information
    callout: {
      danger: {
        background: 'var(--danger-soft)',
        border: 'var(--danger)',
        text: 'var(--text)',
      },
      warning: {
        background: 'var(--warning-soft)',
        border: 'var(--warning)',
        text: 'var(--text)',
      },
      success: {
        background: 'var(--success-soft)',
        border: 'var(--success)',
        text: 'var(--text)',
      },
      neutral: {
        background: 'var(--surface-2)',
        border: 'var(--border-subtle)',
        text: 'var(--text-strong)',
      },
    },

    // Badges for status indicators
    badge: {
      danger: {
        background: 'var(--danger)',
        text: 'white',
      },
      warning: {
        background: 'var(--warning)',
        text: 'white',
      },
      success: {
        background: 'var(--success)',
        text: 'white',
      },
      neutral: {
        background: 'var(--border-subtle)',
        text: 'var(--text-strong)',
      },
    },

    // KPI highlighting rules
    kpi: {
      critical: 'var(--danger)',
      warning: 'var(--warning)',
      normal: 'var(--text-strong)',
      muted: 'var(--text-muted)',
    },
  },
};

// Helper functions for brand application
export const getEmphasisStyle = (tone: 'danger' | 'warning' | 'success' | 'neutral', type: 'callout' | 'badge') => {
  return brandKit.emphasis[type][tone];
};

export const getKPIStyle = (level: 'critical' | 'warning' | 'normal' | 'muted') => {
  return { color: brandKit.emphasis.kpi[level] };
};
