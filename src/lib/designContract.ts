// BIICS Design System Contract
// Canonical values for visual consistency across all pages
// This is NOT a new framework — it's a shared contract for consistent classNames

export const DESIGN_CONTRACT = {
  // === TYPOGRAPHY SYSTEM ===
  typography: {
    // Page titles
    pageTitle: "text-3xl font-bold text-[var(--text-strong)] mb-2",

    // Zone/section titles
    zoneTitle: "text-xl font-bold text-[var(--text-strong)] mb-4",

    // Card titles
    cardTitle: "text-lg font-semibold text-[var(--text-strong)]",

    // Body text
    body: "text-[var(--text)] leading-relaxed",

    // Supporting/muted text
    muted: "text-[var(--text-muted)]",

    // Micro labels (badges, KPI labels)
    micro: "text-xs font-semibold uppercase tracking-wide",

    // KPI values
    kpiValue: "text-2xl font-bold text-[var(--text-strong)]",

    // Large KPI values
    kpiValueLarge: "text-4xl font-bold text-[var(--text-strong)]",

    // Button text
    button: "text-sm font-medium",
  },

  // === SPACING SYSTEM ===
  spacing: {
    // Page container
    pageContainer: "p-8",

    // Zone/section spacing (between major sections)
    zoneStack: "mb-12",

    // Card container
    cardContainer: "p-6",

    // Card inner spacing
    cardInner: "mb-4",

    // KPI grid gaps
    kpiGrid: "gap-4",

    // Table spacing
    tableRow: "py-3 px-4",
    tableHeader: "py-3 px-4",

    // Form/control spacing
    controlGap: "gap-3",

    // Element spacing (between related elements)
    elementGap: "gap-4",
    elementGapSmall: "gap-2",

    // Section header spacing
    headerSpacing: "mb-6",
  },

  // === CARD STYLES ===
  cards: {
    // Base card (default) - white background
    base: "bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-sm",

    // Elevated card (important sections) - white background
    elevated: "bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-md",

    // Chart container - white background
    chart: "bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-sm",

    // Accent cards - use card-bg base with semantic borders
    danger: "bg-[var(--card-bg)] border border-[var(--danger)] rounded-md",
    warning: "bg-[var(--card-bg)] border border-[var(--warning)] rounded-md",
    success: "bg-[var(--card-bg)] border border-[var(--success)] rounded-md",
  },

  // === BORDER SYSTEM ===
  borders: {
    // Standard border
    standard: "border border-[var(--border)]",

    // Subtle border
    subtle: "border border-[var(--border-subtle)]",

    // Accent borders
    danger: "border border-[var(--danger)]",
    warning: "border border-[var(--warning)]",
    success: "border border-[var(--success)]",

    // Border radius
    radius: "rounded-md",
    radiusSm: "rounded-sm",
  },

  // === SHADOW SYSTEM ===
  shadows: {
    // Default card shadow
    card: "shadow-sm",

    // Elevated section shadow
    elevated: "shadow-md",

    // Chart container shadow
    chart: "shadow-sm",
  },

  // === COLOR SYSTEM ===
  colors: {
    // Layout backgrounds (new separation)
    navBg: "bg-[var(--nav-bg)]", // Sidebar - keep existing
    appBg: "bg-[var(--app-bg)]", // Main content - much lighter
    cardBg: "bg-[var(--card-bg)]", // Cards - white/near-white

    // Legacy backgrounds (maintained for compatibility)
    pageBg: "bg-[var(--primary-light)]",
    surface: "bg-[var(--primary-light)]",
    surfaceAlt: "bg-[var(--surface)]",

    // Text colors
    textPrimary: "text-[var(--text)]",
    textStrong: "text-[var(--text-strong)]",
    textMuted: "text-[var(--text-muted)]",
    textSubtle: "text-[var(--text-subtle)]",

    // Semantic colors
    danger: "text-[var(--danger)]",
    warning: "text-[var(--warning)]",
    success: "text-[var(--success)]",

    // Background colors
    dangerBg: "bg-[var(--danger-bg)]",
    warningBg: "bg-[var(--warning-bg)]",
    successBg: "bg-[var(--success-bg)]",
  },

  // === BADGE STYLES ===
  badges: {
    // Verdict badges (RESCOPE, INTERVENE, CONTINUE)
    verdict: {
      terminate: "bg-[var(--danger-bg)] text-[var(--danger-text)]",
      intervene: "bg-[var(--warning-bg)] text-[var(--warning-text)]",
      continue: "bg-[var(--surface)] text-[var(--text-muted)]",
    },

    // Stance badges (RECOMMEND, ACCEPT, ESCALATE)
    stance: {
      recommend: "bg-[var(--success-bg)] text-[var(--success-text)]",
      accept: "bg-[var(--surface)] text-[var(--text-muted)]",
      escalate: "bg-[var(--warning-bg)] text-[var(--warning-text)]",
    },

    // Severity badges (FAILING, WARNING, ACCEPTABLE)
    severity: {
      failing: "bg-[var(--danger-bg)] text-[var(--danger-text)]",
      warning: "bg-[var(--warning-bg)] text-[var(--warning-text)]",
      acceptable: "bg-[var(--surface)] text-[var(--text-muted)]",
    },

    // Mitigation status
    mitigation: {
      effective: "bg-[var(--success-bg)] text-[var(--success-text)]",
      stalled: "bg-[var(--danger-bg)] text-[var(--danger-text)]",
      planned: "bg-[var(--warning-bg)] text-[var(--warning-text)]",
    },
  },

  // === PAGE SHELL SYSTEM ===
  pageShell: {
    // Page container
    container: "max-w-7xl mx-auto px-8 py-8",

    // Page title (H1)
    title: "text-3xl font-bold text-[var(--text-strong)] mb-6",

    // Page subtitle
    subtitle: "text-lg text-[var(--text-muted)]",

    // Section gaps
    sectionGap: "mb-12",
    zoneGap: "mb-8",
  },

  // === LAYOUT PATTERNS ===
  layouts: {
    // Page structure
    pageHeader: "mb-8",
    zoneHeader: "mb-6",

    // Grid patterns
    kpiGrid: "grid grid-cols-1 md:grid-cols-3 gap-4",
    cardGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
    formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",

    // Flex patterns
    headerFlex: "flex items-center justify-between",
    cardHeaderFlex: "flex items-center gap-3",
    buttonFlex: "flex gap-3",
  },
} as const;

// Utility function to combine contract classes
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Helper to get contract value with fallback
export function getContractValue<K extends keyof typeof DESIGN_CONTRACT>(
  category: K,
  key: keyof typeof DESIGN_CONTRACT[K],
  fallback?: string
): string {
  const value = DESIGN_CONTRACT[category]?.[key as keyof typeof DESIGN_CONTRACT[K]];
  return typeof value === 'string' ? value : (fallback || '');
}
