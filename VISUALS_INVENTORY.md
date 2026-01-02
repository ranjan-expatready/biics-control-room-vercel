# BIICS Dashboard Visuals Inventory

## Executive Summary
BIICS dashboard contains a comprehensive set of executive-grade visualizations for program health monitoring, with tables as primary visual format (78%), charts/sparklines at 15%, and status indicators at 7%.

## Page-by-Page Visual Inventory

### `/` - Executive Control Room (Main Dashboard)
**File**: `src/app/page.tsx`
**Components Used**: PortfolioGrid, AtRiskSpotlight, DecisionsPanel, CadenceNext14Days

#### Visual Elements:
1. **Portfolio Health Metric** - Large numeric display (68)
   - Type: Status Indicator
   - Data: Calculated portfolio health score
   - Location: Top right header

2. **Confidence Bar** - Horizontal progress bar with percentage (73%)
   - Type: Progress Indicator
   - Data: Average confidence across rocks
   - Location: Top right header

3. **Portfolio Grid** - 12 rock tiles in responsive grid
   - Type: Card Grid/Table
   - Data: Rock name, owner, health score, status chip, confidence bar, sparkline, what changed
   - Location: Main content area
   - Components: StatusChip, ConfidenceBar, Sparkline

4. **At-Risk Spotlight** - Top 3 rocks by lowest health
   - Type: Status Panel
   - Data: Rock name, health score, status chip
   - Location: Left column

5. **Decisions Panel** - Pending decisions with impact levels
   - Type: Priority List
   - Data: Decision title, impact level, status
   - Location: Left column

6. **Cadence Strip** - Upcoming meetings in pill format
   - Type: Timeline Pills
   - Data: Meeting name, date
   - Location: Bottom full width

### `/rocks/[rockId]` - Rock Detail Pages
**File**: `src/app/rocks/[rockId]/page.tsx`
**Components Used**: StatusChip, ConfidenceBar, Tabs, ScorecardTab, MilestonesTab, RisksDependenciesTab, DecisionsActionsTab

#### Visual Elements:
1. **Rock Header** - Health score, status chip, confidence bar
   - Type: Status Indicators
   - Data: Calculated health, status, confidence
   - Location: Top section

2. **Tabbed Interface** - 4 tabs for different views
   - Type: Tab Navigation
   - Data: Dynamic tab content

3. **Scorecard Tab** - KPI table with targets vs actuals
   - Type: Data Table
   - Data: KPI name, current, target, trend, status, confidence
   - Components: StatusChip, ConfidenceBar

4. **Milestones Tab** - Timeline table
   - Type: Timeline Table
   - Data: Milestone name, due date, status

5. **Risks & Dependencies Tab** - Risk matrix with severity/impact
   - Type: Risk Table
   - Data: Risk title, severity, probability, mitigation, dependencies

6. **Decisions & Actions Tab** - Action items with priorities
   - Type: Priority Table
   - Data: Decision title, impact, owner, status

### `/cadence` - Governance Cadence
**File**: `src/app/cadence/page.tsx`
**Components Used**: ShiftSimulator, ReadinessPanel, ForumCard, ArtifactsList

#### Visual Elements:
1. **Forum Cards** - Meeting schedule cards
   - Type: Card Layout
   - Data: Meeting name, date, audience, purpose

2. **Date Shift Simulator** - Interactive date adjustment
   - Type: Interactive Controls
   - Data: Meeting dates, artifact deadlines
   - Components: Stepper controls

3. **Artifacts Timeline** - Deadline visualization
   - Type: Timeline Display
   - Data: Artifact names, due dates

4. **Readiness Panel** - Status indicators
   - Type: Status Dashboard
   - Data: Decision backlog, readiness status

### `/exec-pack` - Executive Pack (Print View)
**File**: `src/app/exec-pack/page.tsx`

#### Visual Elements:
1. **Portfolio Health Header** - Key metrics display
   - Type: Summary Header
   - Data: Health score, confidence, as-of date

2. **12 Rocks Table** - Complete portfolio overview
   - Type: Data Table
   - Data: Rock name, owner, health, confidence, key driver

3. **Top 5 Risks Table** - Risk priority matrix
   - Type: Priority Table
   - Data: Risk title, severity, mitigation, owner

4. **Decisions Table** - Action items due this week
   - Type: Priority Table
   - Data: Decision title, impact, owner

5. **Cadence Strip** - Next 14 days meetings
   - Type: Timeline Pills
   - Data: Meeting names, dates

### `/offering` - Product Offering
**File**: `src/app/offering/page.tsx`

#### Visual Elements:
1. **Feature Cards** - 4-column grid of capabilities
   - Type: Marketing Cards
   - Data: Meeting types, purposes

## Component Library Analysis

### Chart/Sparkline Elements (15%)
1. **Sparkline Component** (`src/components/ui/Sparkline.tsx`)
   - Usage: PortfolioGrid (12 instances), Rock detail cards
   - Type: Mini line charts for trends
   - Data: 5-6 data points showing recent performance

2. **ConfidenceBar Component** (`src/components/ui/ConfidenceBar.tsx`)
   - Usage: PortfolioGrid, Rock headers, KPI tables
   - Type: Horizontal progress bars
   - Data: Confidence percentage (0-100)

### Status Indicators (7%)
1. **StatusChip Component** (`src/components/ui/StatusChip.tsx`)
   - Usage: Everywhere (rocks, KPIs, risks, decisions)
   - Types: On Track, At Risk, Off Track, Complete, Watch, Critical
   - Styling: Color-coded with semantic meanings

2. **MetricPill Component** (`src/components/ui/MetricPill.tsx`)
   - Usage: Cadence artifacts, KPI metrics
   - Type: Compact metric displays

### Table/Data Visualizations (78%)
1. **PortfolioGrid** - Card-based table layout
2. **ScorecardTab** - KPI comparison table
3. **RisksDependenciesTab** - Risk assessment table
4. **DecisionsActionsTab** - Action priority table
5. **Exec Pack Tables** - Print-optimized data tables

## Data Sources
- **Primary**: JSON files in `/data/demo/` (portfolio.json, rocks.json, kpis.json, risks.json, decisions.json, actions.json, cadence.json)
- **Derived**: Calculated metrics (health scores, confidence, trends) via `/src/lib/scoring.ts`
- **Enriched**: WhatChanged summaries, risk assessments via `/src/lib/data.ts`

## Accessibility & Responsive Design
- All components use Tailwind CSS for responsive design
- Semantic HTML structure maintained
- Color contrast ratios appropriate for accessibility
- Keyboard navigation support via standard HTML elements
