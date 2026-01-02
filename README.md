# BIICS - Program Balanced Scorecard OS

A premium, executive-grade application for tracking program health, risk, and performance across a portfolio of strategic initiatives ("Big Rocks").

## Quick Start

### Prerequisites
- Node.js 20 LTS (recommended, see .nvmrc)

### Installation & Run

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
BIICS/
├── data/
│   └── demo/              # Demo JSON data files
│       ├── portfolio.json
│       ├── rocks.json
│       ├── kpis.json
│       ├── risks.json
│       ├── decisions.json
│       ├── actions.json
│       └── cadence.json
├── governance/            # Governance documentation
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── PROCESSES.md
│   ├── DECISIONS.md
│   └── CHANGELOG.md
├── docs/                  # Product documentation (future)
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/       # React components
│   │   ├── layout/
│   │   │   ├── TopNav.tsx
│   │   │   └── Sidebar.tsx
│   │   └── cockpit/
│   │       ├── HealthPanel.tsx
│   │       ├── RiskPanel.tsx
│   │       ├── VelocityPanel.tsx
│   │       └── DecisionsPanel.tsx
│   └── lib/              # Utilities and types
│       ├── types.ts
│       ├── data.ts
│       └── scoring.ts
├── BLUEPRINT.md          # System architecture and design blueprint
└── package.json
```

## Features

### Current (Bootstrap Phase)
- ✅ Executive Cockpit with 4 panels:
  - Health Overview: Portfolio and Rock health scores
  - Risk Exposure: Risk counts and top risks
  - Velocity & Progress: Status summary and action completion
  - Decisions & Actions: Pending decisions and critical actions
- ✅ Top navigation and sidebar navigation
- ✅ Demo data for 12 Big Rocks
- ✅ Type-safe data handling with TypeScript

### Coming Next
- Rock drilldown views with tabs
- Interactive charts and visualizations
- Cadence engine with meeting schedules
- PDF export functionality
- Advanced scoring algorithms

## Data Model

See `governance/DATA_MODEL.md` for complete data structure documentation.

## Architecture

See `BLUEPRINT.md` for detailed system architecture and design specifications.

## Development

### Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Data**: Local JSON files

### Key Principles
- UltraFastDB: No external database or backend
- Frontend-first architecture
- Executive-grade UX design
- Program-first focus (not org-wide BSC)

## License

Private - Internal Use Only
