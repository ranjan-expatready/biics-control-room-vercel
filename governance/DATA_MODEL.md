# Data Model

## Overview

The Program Balanced Scorecard OS uses a hierarchical data model centered around Programs ("Big Rocks") and their associated metrics, risks, decisions, and actions.

## Core Entities

### Portfolio
Top-level container representing the entire program portfolio.

**Fields:**
- `id`: Unique identifier
- `name`: Portfolio name
- `description`: High-level description
- `owner`: Executive owner
- `lastUpdated`: ISO timestamp
- `rocks`: Array of Rock IDs

### Rock
A strategic initiative or "Big Rock" within the portfolio.

**Fields:**
- `id`: Unique identifier
- `name`: Rock name
- `description`: Detailed description
- `owner`: Program owner
- `status`: Current status (On Track, At Risk, Off Track, Complete)
- `healthScore`: Calculated health score (0-100)
- `confidence`: Confidence level (High, Medium, Low)
- `startDate`: ISO date
- `targetDate`: ISO date
- `kpis`: Array of KPI IDs
- `risks`: Array of Risk IDs
- `decisions`: Array of Decision IDs
- `actions`: Array of Action IDs

### KPI (Key Performance Indicator)
Measurable metric for tracking Rock progress.

**Fields:**
- `id`: Unique identifier
- `rockId`: Parent Rock ID
- `name`: KPI name
- `description`: What this KPI measures
- `target`: Target value
- `current`: Current value
- `unit`: Unit of measurement
- `trend`: Trend direction (Up, Down, Stable)
- `status`: Status (On Track, At Risk, Off Track)

### Risk
Identified risk that could impact Rock delivery.

**Fields:**
- `id`: Unique identifier
- `rockId`: Parent Rock ID
- `title`: Risk title
- `description`: Risk description
- `severity`: Severity level (Critical, High, Medium, Low)
- `probability`: Probability (High, Medium, Low)
- `mitigation`: Mitigation plan
- `owner`: Risk owner
- `status`: Status (Open, Mitigated, Closed)

### Decision
Strategic or tactical decision related to a Rock.

**Fields:**
- `id`: Unique identifier
- `rockId`: Parent Rock ID
- `title`: Decision title
- `description`: Decision description
- `status`: Status (Pending, Decided, Deferred)
- `decisionDate`: ISO date (if decided)
- `decisionMaker`: Person who made/will make decision
- `impact`: Impact level (High, Medium, Low)

### Action
Action item or task related to a Rock.

**Fields:**
- `id`: Unique identifier
- `rockId`: Parent Rock ID
- `title`: Action title
- `description`: Action description
- `owner`: Action owner
- `dueDate`: ISO date
- `status`: Status (Open, In Progress, Complete)
- `priority`: Priority (Critical, High, Medium, Low)

### Cadence Rule
Rule defining meeting cadence and artifact requirements.

**Fields:**
- `id`: Unique identifier
- `name`: Rule name (e.g., "Weekly Program Review")
- `frequency`: Frequency (Daily, Weekly, Bi-weekly, Monthly)
- `dayOfWeek`: Day of week (if applicable)
- `requiredArtifacts`: Array of artifact types required
- `deadlineOffset`: Days before meeting that artifacts are due
- `attendees`: Array of attendee roles/names

## Relationships

```
Portfolio
  └── Rocks (1:N)
      ├── KPIs (1:N)
      ├── Risks (1:N)
      ├── Decisions (1:N)
      └── Actions (1:N)

Cadence Rules (standalone, applied to Portfolio or Rocks)
```

## Scoring Logic

### Rock Health Score
Calculated as a confidence-weighted average of:
- KPI status (weighted by importance)
- Risk exposure (inverse impact)
- Action completion rate
- Timeline adherence

### Portfolio Health Score
Roll-up of all Rock health scores, weighted by:
- Rock confidence level
- Strategic importance (future)
- Resource allocation (future)

## Data Storage

All data stored as JSON files in `/data/demo/`:
- `portfolio.json`: Portfolio metadata
- `rocks.json`: All Rocks
- `kpis.json`: All KPIs
- `risks.json`: All Risks
- `decisions.json`: All Decisions
- `actions.json`: All Actions
- `cadence.json`: Cadence rules

