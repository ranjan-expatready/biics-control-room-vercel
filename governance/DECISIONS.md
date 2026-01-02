# Architecture Decision Records (ADRs)

## Overview

This document tracks significant architectural decisions, their context, and rationale.

## ADR-001: Frontend-First Architecture

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: Need for rapid prototyping and deployment without infrastructure complexity.

**Decision**: Build as a frontend-only application using Next.js with local JSON data storage.

**Rationale**:
- Eliminates database setup and maintenance overhead
- Faster iteration cycles
- Lower operational complexity
- Sufficient for prototype and MVP stages
- Can migrate to backend later if needed

**Consequences**:
- No real-time collaboration (acceptable for prototype)
- Data changes require file edits (acceptable for demo)
- No user authentication (acceptable for prototype)
- Static export possible for easy deployment

## ADR-002: Next.js App Router

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: Need for modern React framework with excellent developer experience.

**Decision**: Use Next.js 16+ with App Router (not Pages Router).

**Rationale**:
- Latest stable Next.js features
- Excellent TypeScript support
- Built-in routing and layouts
- Server components for performance
- Strong ecosystem and community

**Consequences**:
- Learning curve for App Router patterns
- Some libraries may not support App Router yet (acceptable risk)

## ADR-003: TailwindCSS v4

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: Need for rapid UI development with consistent design system.

**Decision**: Use TailwindCSS v4 for styling.

**Rationale**:
- Utility-first approach enables rapid development
- Consistent design tokens
- Small bundle size with purging
- Excellent developer experience
- Custom design system support

**Consequences**:
- Newer version may have fewer resources/examples
- Team needs TailwindCSS knowledge

## ADR-004: Local JSON Data Storage

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: UltraFastDB constraint - no external database.

**Decision**: Store all data in JSON files under `/data/demo/`.

**Rationale**:
- Meets UltraFastDB constraint
- Simple to edit and version control
- No database setup required
- Fast to load and parse
- Easy to seed with demo data

**Consequences**:
- No concurrent editing (acceptable for prototype)
- Manual data updates (acceptable for demo)
- No query capabilities (acceptable for prototype scale)
- File size limits for very large datasets (not an issue for 12 rocks)

## ADR-005: Program-First Design (Not Org-Wide BSC)

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: Focus on program-level tracking, not enterprise-wide balanced scorecard.

**Decision**: Design system for tracking a portfolio of programs ("Big Rocks"), not org-wide metrics.

**Rationale**:
- Clearer scope and focus
- More actionable at program level
- Simpler data model
- Better fit for executive program reviews
- Can expand to org-wide later if needed

**Consequences**:
- Not suitable for enterprise-wide BSC use cases (by design)
- Focused on program portfolio management

## ADR-006: Confidence-Weighted Scoring

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: Need for nuanced health scoring that accounts for data quality.

**Decision**: Implement confidence-weighted roll-up scoring for Rocks and Portfolio.

**Rationale**:
- Accounts for uncertainty in metrics
- Prevents false confidence from incomplete data
- More accurate representation of true health
- Executive-friendly (acknowledges uncertainty)

**Consequences**:
- More complex scoring algorithm
- Requires confidence levels to be maintained
- May need explanation/education for users

## ADR-007: Cadence Engine Concept

**Status**: Accepted  
**Date**: 2024-01-XX  
**Context**: Need to connect meetings, artifacts, and deadlines systematically.

**Decision**: Design Cadence Engine that links meeting schedules → required artifacts → deadlines.

**Rationale**:
- Ensures meeting preparation
- Creates accountability for deliverables
- Automates deadline tracking
- Reduces meeting prep overhead

**Consequences**:
- Requires cadence rules to be defined
- May need calendar integration (future)
- Artifact tracking adds complexity

## Future Decisions

- ADR-008: Local Storage Persistence Strategy (Pending)
- ADR-009: PDF Export Implementation Approach (Pending)
- ADR-010: Multi-Program Support Strategy (Pending)

