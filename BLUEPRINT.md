# Program Balanced Scorecard OS - Blueprint

## Executive Summary

The Program Balanced Scorecard OS is a premium, executive-grade application designed to provide real-time visibility into program health, risk, and performance across a portfolio of strategic initiatives ("Big Rocks"). This blueprint defines the architecture, user experience, and implementation approach for the system.

## Design Philosophy

### Visual Design Principles
- **Calm & Confident**: Premium aesthetic that conveys authority and competence
- **Whitespace**: Generous spacing creates breathing room and reduces cognitive load
- **Strong Hierarchy**: Clear visual hierarchy guides attention to most important information
- **Minimal Clutter**: Every element serves a purpose; remove anything that doesn't add value
- **Executive-Grade**: Design quality matching Big-5 consulting firm deliverables

### UX Principles
- **Program-First**: Focus on program-level insights, not org-wide metrics
- **Actionable**: Every metric and visualization should drive decision-making
- **Transparent**: Clear scoring logic and confidence indicators
- **Efficient**: Executives can understand portfolio health in < 30 seconds

## Executive Cockpit Layout

### Overview
The Executive Cockpit is the primary landing page, providing a comprehensive view of portfolio health at a glance.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Top Navigation Bar                                          │
│  [Logo] [Portfolio Name]              [User] [Settings]     │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                   │
│  Sidebar │  Executive Cockpit Content                        │
│          │                                                   │
│  • Home  │  ┌──────────────────────────────────────────┐   │
│  • Rocks │  │  Portfolio Health Score                   │   │
│  • Risks │  │  [Large Score Display]                    │   │
│  • Decis │  └──────────────────────────────────────────┘   │
│  • Actns │                                                   │
│  • Cadnc │  ┌──────────────┐  ┌──────────────┐            │
│          │  │  Health      │  │  Risk        │            │
│          │  │  Panel       │  │  Panel       │            │
│          │  └──────────────┘  └──────────────┘            │
│          │                                                   │
│          │  ┌──────────────┐  ┌──────────────┐            │
│          │  │  Velocity    │  │  Decisions   │            │
│          │  │  Panel       │  │  Panel       │            │
│          │  └──────────────┘  └──────────────┘            │
└──────────┴──────────────────────────────────────────────────┘
```

### Four-Panel Layout

#### Panel 1: Health Overview
**Purpose**: Show overall portfolio and individual Rock health scores

**Content**:
- Large portfolio health score (0-100) with confidence indicator
- Breakdown by Rock with health scores
- Color coding: Green (70+), Yellow (50-69), Red (<50)
- Trend indicators (improving/declining)

**Data Sources**:
- Portfolio health: Calculated roll-up from Rocks
- Rock health: From `rocks.json` (healthScore field)
- Confidence: From `rocks.json` (confidence field)

#### Panel 2: Risk Exposure
**Purpose**: Highlight critical risks requiring executive attention

**Content**:
- Count of risks by severity (Critical, High, Medium, Low)
- List of top 5 highest-severity risks
- Risk trend (increasing/decreasing)
- Risk concentration by Rock

**Data Sources**:
- `risks.json` filtered and aggregated
- Grouped by severity and Rock

#### Panel 3: Velocity & Progress
**Purpose**: Track program momentum and delivery velocity

**Content**:
- On Track / At Risk / Off Track Rock counts
- Timeline adherence (Rocks on schedule vs delayed)
- Action completion rate
- KPI trend summary (improving/declining metrics)

**Data Sources**:
- `rocks.json` (status field)
- `actions.json` (status field, aggregated)
- `kpis.json` (trend field, aggregated)

#### Panel 4: Decisions & Actions
**Purpose**: Surface pending decisions and critical actions

**Content**:
- Pending decisions requiring executive input
- Critical/High priority actions with upcoming due dates
- Decision timeline (recently decided, upcoming deadlines)
- Action completion rate

**Data Sources**:
- `decisions.json` filtered by status="Pending"
- `actions.json` filtered by priority="Critical" or "High", sorted by dueDate

## Rock Drilldown Tabs

### Overview
Each Rock has a dedicated detail page accessible from the sidebar or Rock list.

### Tab Structure

#### Tab 1: Overview
- Rock name, description, owner
- Current status and health score
- Timeline (start date, target date, progress)
- Key metrics summary
- Recent updates/notes

#### Tab 2: KPIs
- List of all KPIs for this Rock
- Current vs target values
- Trend indicators
- Status (On Track, At Risk, Off Track)
- Historical trend visualization (future: charts)

#### Tab 3: Risks
- List of all risks for this Rock
- Severity and probability
- Mitigation status
- Risk owner
- Filterable by severity/status

#### Tab 4: Decisions
- List of all decisions for this Rock
- Status (Pending, Decided, Deferred)
- Decision maker and date
- Impact level
- Filterable by status

#### Tab 5: Actions
- List of all actions for this Rock
- Owner, due date, status, priority
- Filterable by status/priority
- Sortable by due date

#### Tab 6: Timeline (Future)
- Gantt-style timeline view
- Milestones and dependencies
- Key dates and deadlines

## Roll-Up Scoring Logic

### Rock Health Score Calculation

The Rock health score (0-100) is calculated using a confidence-weighted approach:

```
Rock Health Score = (
  (KPI Score × KPI Weight) +
  (Risk Score × Risk Weight) +
  (Action Score × Action Weight) +
  (Timeline Score × Timeline Weight)
) × Confidence Multiplier
```

**Component Scores**:

1. **KPI Score** (0-100):
   - For each KPI: (current / target) × 100, capped at 100
   - Average across all KPIs
   - Weight: 40%

2. **Risk Score** (0-100):
   - Inverse of risk exposure
   - Critical risk = -30 points, High = -15, Medium = -5, Low = -1
   - Base score 100, subtract risk points
   - Weight: 30%

3. **Action Score** (0-100):
   - Percentage of actions completed
   - Weight: 20%

4. **Timeline Score** (0-100):
   - Based on progress vs expected progress
   - (Days elapsed / Total days) vs (Actual progress / Target progress)
   - Weight: 10%

**Confidence Multiplier**:
- High confidence: 1.0
- Medium confidence: 0.9
- Low confidence: 0.8

### Portfolio Health Score Calculation

```
Portfolio Health Score = Σ(Rock Health Score × Rock Confidence Weight) / Σ(Rock Confidence Weights)
```

**Rock Confidence Weights**:
- High confidence: 1.0
- Medium confidence: 0.8
- Low confidence: 0.6

This ensures Rocks with higher confidence have more influence on the portfolio score.

## Cadence Engine Concept

### Overview
The Cadence Engine connects meeting schedules, required artifacts, and deadlines to ensure proper meeting preparation and accountability.

### Core Components

#### 1. Meeting Schedule
- Defined by cadence rules in `cadence.json`
- Frequency: Daily, Weekly, Bi-weekly, Monthly, Quarterly
- Day of week specification
- Attendee list

#### 2. Required Artifacts
- Each cadence rule specifies required artifacts
- Examples: "Rock Status Update", "KPI Dashboard", "Risk Register"
- Artifacts are generated from current data state

#### 3. Deadline Calculation
- Each cadence rule has a `deadlineOffset` (days before meeting)
- System calculates: Meeting Date - Deadline Offset = Artifact Due Date
- Flags overdue or upcoming deadlines

#### 4. Artifact Generation (Future)
- Automated generation of required artifacts
- PDF export of dashboards and reports
- Email distribution to attendees

### Cadence Rules Structure

```typescript
{
  id: string;
  name: string;                    // e.g., "Weekly Program Review"
  frequency: string;               // "Weekly", "Bi-weekly", etc.
  dayOfWeek: string;               // "Monday", "Thursday", etc.
  requiredArtifacts: string[];    // ["Rock Status Update", "KPI Dashboard"]
  deadlineOffset: number;          // Days before meeting artifacts are due
  attendees: string[];             // List of attendee names/roles
}
```

### Implementation (Current Phase)
- Rules defined in `cadence.json`
- Display cadence rules in UI
- Calculate next meeting dates
- Calculate artifact deadlines
- Flag upcoming/overdue deadlines

### Future Enhancements
- Calendar integration
- Automated artifact generation
- Email notifications
- Meeting notes capture
- Action item extraction from meetings

## Export Pack Concept

### Overview
The Export Pack enables generation of comprehensive PDF reports for executive distribution.

### Report Types

#### 1. Executive Summary
- Portfolio health score
- Top 5 risks
- Pending decisions
- Key metrics summary
- 1-2 page high-level overview

#### 2. Full Portfolio Report
- Complete portfolio health breakdown
- All Rocks with status and scores
- All risks, decisions, actions
- KPI summaries
- 10-15 page comprehensive report

#### 3. Rock Deep Dive
- Single Rock detailed report
- All KPIs with trends
- All risks with mitigation plans
- All decisions and actions
- Timeline and milestones
- 3-5 page focused report

#### 4. Meeting Prep Pack
- Pre-meeting artifact bundle
- Rock status updates
- Risk register
- Decision log
- Action item list
- Customized for specific meeting cadence

### Export Format
- PDF with professional formatting
- Branded header/footer
- Charts and visualizations
- Timestamped and versioned
- Print-optimized layout

### Implementation (Future)
- PDF generation library (e.g., react-pdf, Puppeteer)
- Template system for different report types
- Chart/image rendering
- Branding and styling
- Download and email distribution

## Technical Architecture

### Data Flow

```
JSON Files (data/demo/)
    ↓
Type Definitions (TypeScript interfaces)
    ↓
Data Loading Utilities (future: React Query or similar)
    ↓
React Components
    ↓
UI Rendering
```

### Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav/sidebar
│   ├── page.tsx            # Executive Cockpit
│   └── rocks/
│       └── [id]/
│           └── page.tsx   # Rock detail page
├── components/
│   ├── layout/
│   │   ├── TopNav.tsx
│   │   └── Sidebar.tsx
│   ├── cockpit/
│   │   ├── HealthPanel.tsx
│   │   ├── RiskPanel.tsx
│   │   ├── VelocityPanel.tsx
│   │   └── DecisionsPanel.tsx
│   └── rocks/
│       ├── RockCard.tsx
│       ├── RockTabs.tsx
│       └── ...
└── lib/
    ├── data.ts             # Data loading utilities
    ├── scoring.ts           # Scoring algorithms
    └── types.ts             # TypeScript type definitions
```

### Scoring Implementation

Scoring logic will be implemented in `/src/lib/scoring.ts`:

```typescript
// Pseudo-code structure
export function calculateRockHealthScore(rock: Rock, kpis: KPI[], risks: Risk[], actions: Action[]): number {
  // Implement scoring algorithm
}

export function calculatePortfolioHealthScore(rocks: Rock[]): number {
  // Implement roll-up algorithm
}
```

## Implementation Phases

### Phase 1: Bootstrap (Current)
- ✅ Next.js setup
- ✅ TailwindCSS configuration
- ✅ Folder structure
- ✅ Demo data
- ✅ Basic shell UI

### Phase 2: Executive Cockpit
- Executive Cockpit page with 4 panels
- Data loading and display
- Basic scoring calculations
- Rock list view

### Phase 3: Rock Drilldown
- Rock detail page
- Tab navigation
- KPI, Risk, Decision, Action views
- Data filtering and sorting

### Phase 4: Scoring Engine
- Full scoring algorithm implementation
- Confidence weighting
- Real-time score updates
- Score explanation/hover details

### Phase 5: Cadence Engine
- Cadence rules display
- Meeting schedule calculation
- Deadline tracking
- Artifact checklist

### Phase 6: Export Pack
- PDF generation
- Report templates
- Download functionality
- Email distribution (future)

## Design Tokens

### Colors
- Primary: Blue (#1e40af) - Accent, links, primary actions
- Success: Green - On Track status, positive trends
- Warning: Yellow/Orange - At Risk status
- Danger: Red - Off Track status, critical risks
- Neutral: Gray scale - Text, borders, backgrounds

### Typography
- Headings: Geist Sans, 600-700 weight
- Body: Geist Sans, 400 weight
- Monospace: Geist Mono (for data/code)

### Spacing
- Consistent 8px base unit
- Generous whitespace (24px, 32px, 48px for sections)

### Shadows
- Subtle, professional shadows
- Elevation for cards and panels

## Success Metrics

### User Experience
- Executive can understand portfolio health in < 30 seconds
- All critical information visible without scrolling (on large screens)
- Clear visual hierarchy guides attention
- Professional, premium aesthetic

### Technical
- Fast page loads (< 2s initial load)
- Smooth interactions (60fps)
- Type-safe data handling
- Maintainable code structure

## Future Considerations

- Local storage persistence for user edits
- Multi-program support
- User authentication (if needed)
- Real-time collaboration (if needed)
- Advanced visualizations (charts, graphs)
- Mobile responsive design
- Dark mode support
- Internationalization

