# Architecture

## Overview

The Program Balanced Scorecard OS is a frontend-first application designed to provide executive-level visibility into program health, risk, and performance across a portfolio of strategic initiatives ("Big Rocks").

## Core Principles

1. **UltraFastDB**: No external database, backend services, or paid dependencies
2. **Local-First**: All data stored in JSON files, loaded at runtime
3. **Executive-Grade UX**: Calm, confident design with strong hierarchy and whitespace
4. **Program-First**: Focused on program-level tracking, not org-wide BSC

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Data**: Local JSON files in `/data/demo/`
- **Deployment**: Static export (future)

## Architecture Layers

### Presentation Layer
- React components in `/src/components/`
- Pages in `/src/app/`
- Shared UI primitives and layout components

### Data Layer
- JSON seed files in `/data/demo/`
- Type definitions for data structures
- Data loading utilities (future: local state management)

### Business Logic Layer
- Scoring algorithms (confidence-weighted roll-ups)
- Cadence engine (meeting → artifacts → deadlines)
- Export generation (PDF reports)

## Key Components

### Executive Cockpit
- Portfolio overview dashboard
- 4-panel layout: Health, Risk, Velocity, Decisions
- Real-time roll-up scoring

### Rock Drilldown
- Individual Big Rock detail views
- Tabbed interface: Overview, KPIs, Risks, Actions, Timeline
- Historical trend visualization

### Cadence Engine
- Meeting schedule management
- Artifact tracking and deadlines
- Automated reminder system

## Data Flow

1. Application loads → Reads JSON files from `/data/demo/`
2. Data parsed and typed → TypeScript interfaces ensure type safety
3. Components render → React components consume typed data
4. User interactions → Local state updates (future: persistence)

## Future Considerations

- Local storage persistence for user edits
- Export to PDF functionality
- Multi-program support
- Authentication and multi-tenancy (if needed)

