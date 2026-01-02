# Processes

## Overview

This document outlines the operational processes and workflows for the Program Balanced Scorecard OS.

## Development Process

### Local Development
1. Run `npm run dev` to start development server
2. Make changes to components, pages, or data files
3. Hot reload automatically updates the UI
4. Test changes in browser

### Data Updates
1. Edit JSON files in `/data/demo/`
2. Changes reflect immediately on page refresh
3. No build step required for data changes

### Adding New Features
1. Create components in `/src/components/`
2. Add pages/routes in `/src/app/`
3. Update types if data model changes
4. Document in appropriate governance doc

## Data Management Process

### Adding a New Rock
1. Create Rock entry in `data/demo/rocks.json`
2. Add associated KPIs, Risks, Decisions, Actions
3. Update Portfolio to include new Rock ID
4. Refresh application to see changes

### Updating Rock Status
1. Edit Rock entry in `data/demo/rocks.json`
2. Update `status`, `healthScore`, `confidence` fields
3. Refresh application

### Managing Cadence
1. Edit `data/demo/cadence.json` to modify meeting rules
2. Update artifact requirements and deadlines
3. Application will reflect new cadence rules

## Scoring Process

### Automatic Scoring
- Rock health scores calculated on-the-fly from KPI, Risk, and Action data
- Portfolio health score rolls up from Rock scores
- Confidence weighting applied automatically

### Manual Overrides
- Future: Allow manual health score overrides with justification
- Track override history for audit purposes

## Reporting Process

### Executive Dashboard
- Loads on application start
- Displays current portfolio state
- Updates automatically when data changes

### Export Process (Future)
1. User triggers export from dashboard
2. System generates PDF report
3. Includes current state of all Rocks, KPIs, Risks, Decisions
4. Timestamped and versioned

## Meeting Cadence Process

### Pre-Meeting
1. System identifies upcoming meetings from cadence rules
2. Checks for required artifacts
3. Flags missing or overdue artifacts
4. Generates meeting prep checklist

### During Meeting
1. Review Rock status and health scores
2. Discuss flagged risks and decisions
3. Update action items
4. Make strategic decisions

### Post-Meeting
1. Update Rock statuses based on discussion
2. Add new risks, decisions, actions as needed
3. Update KPI values
4. System calculates new health scores

## Quality Assurance

### Data Validation
- TypeScript ensures type safety
- JSON schema validation (future)
- Required field checks

### UI/UX Standards
- Maintain premium, executive-grade design
- Ensure strong visual hierarchy
- Preserve whitespace and calm aesthetic
- Test on multiple screen sizes

## Deployment Process (Future)

1. Run `npm run build` to generate static export
2. Deploy static files to hosting service
3. No server required - fully static
4. CDN distribution for global access

