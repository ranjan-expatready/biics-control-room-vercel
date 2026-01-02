import portfolioData from "../../data/demo/portfolio.json";
import rocksData from "../../data/demo/rocks.json";
import kpisData from "../../data/demo/kpis.json";
import risksData from "../../data/demo/risks.json";
import decisionsData from "../../data/demo/decisions.json";
import actionsData from "../../data/demo/actions.json";
import type {
  Portfolio,
  Rock,
  KPI,
  Risk,
  Decision,
  Action,
} from "./types";
import { calculateRockHealthScore, calculatePortfolioHealthScore } from "./scoring";

interface CockpitViewModel {
  portfolio: Portfolio;
  rocks: Rock[];
  kpis: KPI[];
  risks: Risk[];
  decisions: Decision[];
  actions: Action[];
  portfolioScore: number;
  avgConfidence: number;
  rocksWithDetails: Array<{
    rock: Rock;
    healthScore: number;
    status: "On Track" | "Watch" | "At Risk" | "Critical";
    trend: string;
    whatChanged: string;
    sparklineData: number[];
  }>;
}

// Cached view model to avoid recomputation on every render
let cachedCockpitViewModel: CockpitViewModel | null = null;

function computeCockpitViewModel(): CockpitViewModel {
  if (process.env.NODE_ENV === 'production') {
    console.time('compute-viewmodel');
    console.log('[BOOT] Computing cockpit view model');
  }

  const portfolio = getPortfolio();
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Portfolio loaded');

  const rocks = getRocks();
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Rocks loaded');

  const kpis = getKPIs();
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] KPIs loaded');

  const risks = getRisks();
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Risks loaded');

  const decisions = getDecisions();
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Decisions loaded');

  const actions = getActions();
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Actions loaded');

  // Calculate portfolio metrics
  let portfolioScore = calculatePortfolioHealthScore(rocks);

  // Safe fallbacks for portfolio health
  if (isNaN(portfolioScore) || portfolioScore === 0) {
    if (rocks.length > 0) {
      // If we have rocks but score is 0/NaN, use a reasonable default
      portfolioScore = 68; // Neutral "needs attention" score
    } else {
      portfolioScore = 0; // Empty portfolio
    }
  }

  // Clamp to reasonable range [0..100]
  portfolioScore = Math.max(0, Math.min(100, portfolioScore));

  const confidenceValues = { High: 100, Medium: 70, Low: 40 };
  const totalConfidence = rocks.reduce((sum, rock) => {
    return sum + (confidenceValues[rock.confidence] || 0);
  }, 0);
  const avgConfidence = rocks.length > 0 ? Math.round(totalConfidence / rocks.length) : 0;

  // Pre-compute rock summaries to avoid expensive operations during render
  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Computing rock summaries');

  const rockSummaries = rocks.map(rock => {
    if (process.env.NODE_ENV === 'production') console.log(`[BOOT] Processing rock: ${rock.name}`);

    const healthScore = calculateRockHealthScore(rock);
    const status = getStatusFromHealthScore(healthScore);
    const trend = getRockTrend(rock.id);
    // Pre-compute whatChanged to avoid expensive computation during render
    const whatChanged = (() => {
      const kpis = getKPIsForRock(rock.id);
      const risks = getRisksForRock(rock.id);
      const decisions = getDecisionsForRock(rock.id);

      // Find biggest negative delta KPI
      const negativeKPIs = kpis.filter((kpi) => {
        const ratio = kpi.current / kpi.target;
        return ratio < 0.9 && kpi.trend === "Down";
      });
      if (negativeKPIs.length > 0) {
        const worstKPI = negativeKPIs.sort(
          (a, b) => a.current / a.target - b.current / b.target
        )[0];
        const delta = ((worstKPI.current / worstKPI.target - 1) * 100).toFixed(0);
        return `${worstKPI.name} ${delta}% below target`;
      }

      // Find highest severity new risk
      const openRisks = risks.filter((r) => r.status === "Open");
      if (openRisks.length > 0) {
        const criticalRisk = openRisks.find((r) => r.severity === "Critical");
        if (criticalRisk) return `Critical risk: ${criticalRisk.title}`;
        const highRisk = openRisks.find((r) => r.severity === "High");
        if (highRisk) return `High risk: ${highRisk.title}`;
      }

      // Find oldest pending decision
      const pendingDecisions = decisions.filter((d) => d.status === "Pending");
      if (pendingDecisions.length > 0) {
        return `Decision pending: ${pendingDecisions[0].title}`;
      }

      return "On track";
    })();

    // Generate sparkline data (simplified: use health score with some variation)
    const sparklineData = [
      healthScore - 5,
      healthScore - 2,
      healthScore,
      healthScore + 1,
      healthScore,
    ].map((v) => Math.max(0, Math.min(100, v)));

    return {
      rock,
      healthScore,
      status,
      trend,
      whatChanged,
      sparklineData,
    };
  });

  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Rock summaries computed');

  if (process.env.NODE_ENV === 'production') console.log('[BOOT] Cockpit view model computed');

  return {
    portfolio,
    rocks,
    kpis,
    risks,
    decisions,
    actions,
    portfolioScore,
    avgConfidence,
    rocksWithDetails: rockSummaries,
  };
}

export function getCockpitViewModel(): CockpitViewModel {
  if (!cachedCockpitViewModel) {
    cachedCockpitViewModel = computeCockpitViewModel();
  }
  return cachedCockpitViewModel;
}

export function getPortfolio(): Portfolio {
  return portfolioData as Portfolio;
}

// Deterministic ordering: rocks sorted by health score ascending (worst first for spotlight)
export function getRocks(): Rock[] {
  return (rocksData as Rock[]).sort((a, b) => {
    const aScore = calculateRockHealthScore(a);
    const bScore = calculateRockHealthScore(b);
    return aScore - bScore; // Lowest health score first
  });
}

export function getRock(id: string): Rock | undefined {
  return getRocks().find((rock) => rock.id === id);
}

export function getKPIs(): KPI[] {
  return kpisData as KPI[];
}

export function getKPIsForRock(rockId: string): KPI[] {
  return getKPIs().filter((kpi) => kpi.rockId === rockId);
}

// Deterministic ordering: risks sorted by severity×probability score descending (highest risk first)
export function getRisks(): Risk[] {
  return (risksData as Risk[]).sort((a, b) => {
    const getSeverityScore = (severity: string) => {
      const scores = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return scores[severity as keyof typeof scores] || 0;
    };

    const getProbabilityScore = (probability: string) => {
      const scores = { High: 3, Medium: 2, Low: 1 };
      return scores[probability as keyof typeof scores] || 0;
    };

    const aScore = getSeverityScore(a.severity) * getProbabilityScore(a.probability);
    const bScore = getSeverityScore(b.severity) * getProbabilityScore(b.probability);

    // Higher risk score first
    if (aScore !== bScore) {
      return bScore - aScore;
    }

    // Then by title for consistency
    return a.title.localeCompare(b.title);
  });
}

export function getRisksForRock(rockId: string): Risk[] {
  return getRisks().filter((risk) => risk.rockId === rockId);
}

// Deterministic ordering: decisions sorted by status (pending first), then impact, then age
export function getDecisions(): Decision[] {
  return (decisionsData as Decision[]).sort((a, b) => {
    // Pending decisions first
    if (a.status !== b.status) {
      return a.status === "Pending" ? -1 : 1;
    }

    // Then by impact (High, Medium, Low)
    const impactOrder = { High: 3, Medium: 2, Low: 1 };
    const aImpact = impactOrder[a.impact as keyof typeof impactOrder] || 0;
    const bImpact = impactOrder[b.impact as keyof typeof impactOrder] || 0;
    if (aImpact !== bImpact) {
      return bImpact - aImpact; // Higher impact first
    }

    // Finally by title (proxy for age - older decisions tend to be first alphabetically)
    return a.title.localeCompare(b.title);
  });
}

export function getDecisionsForRock(rockId: string): Decision[] {
  return getDecisions().filter((decision) => decision.rockId === rockId);
}

export function getActions(): Action[] {
  return actionsData as Action[];
}

export function getActionsForRock(rockId: string): Action[] {
  return getActions().filter((action) => action.rockId === rockId);
}


// Helper: Get enriched rock data with all related entities
export function getRockWithDetails(rockId: string) {
  const rock = getRock(rockId);
  if (!rock) return null;

  return {
    rock,
    kpis: getKPIsForRock(rockId),
    risks: getRisksForRock(rockId),
    decisions: getDecisionsForRock(rockId),
    actions: getActionsForRock(rockId),
  };
}

// Helper: Get "what changed" summary for a rock
export function getWhatChanged(rockId: string): string {
  const rock = getRock(rockId);
  if (!rock) return "No changes";

  const kpis = getKPIsForRock(rockId);
  const risks = getRisksForRock(rockId);
  const decisions = getDecisionsForRock(rockId);

  // Find biggest negative delta KPI
  const negativeKPIs = kpis.filter((kpi) => {
    const ratio = kpi.current / kpi.target;
    return ratio < 0.9 && kpi.trend === "Down";
  });
  if (negativeKPIs.length > 0) {
    const worstKPI = negativeKPIs.sort(
      (a, b) => a.current / a.target - b.current / b.target
    )[0];
    const delta = ((worstKPI.current / worstKPI.target - 1) * 100).toFixed(0);
    return `${worstKPI.name} ${delta}% below target`;
  }

  // Find highest severity new risk
  const openRisks = risks.filter((r) => r.status === "Open");
  if (openRisks.length > 0) {
    const criticalRisk = openRisks.find((r) => r.severity === "Critical");
    if (criticalRisk) return `Critical risk: ${criticalRisk.title}`;
    const highRisk = openRisks.find((r) => r.severity === "High");
    if (highRisk) return `High risk: ${highRisk.title}`;
  }

  // Find oldest pending decision
  const pendingDecisions = decisions.filter((d) => d.status === "Pending");
  if (pendingDecisions.length > 0) {
    const oldest = pendingDecisions.sort((a, b) => {
      // Sort by impact (High first), then by title
      const impactOrder = { High: 3, Medium: 2, Low: 1 };
      return (
        (impactOrder[b.impact as keyof typeof impactOrder] || 0) -
        (impactOrder[a.impact as keyof typeof impactOrder] || 0)
      );
    })[0];
    return `Pending decision: ${oldest.title}`;
  }

  return "No significant changes";
}

// Helper: Get trend for a rock (based on KPI movement)
export function getRockTrend(rockId: string): "up" | "down" | "flat" {
  const kpis = getKPIsForRock(rockId);
  if (kpis.length === 0) return "flat";

  const upCount = kpis.filter((k) => k.trend === "Up").length;
  const downCount = kpis.filter((k) => k.trend === "Down").length;

  if (upCount > downCount) return "up";
  if (downCount > upCount) return "down";
  return "flat";
}

// Helper: Get status category for health score
export function getStatusFromHealthScore(healthScore: number): "On Track" | "Watch" | "At Risk" | "Critical" {
  if (healthScore >= 70) return "On Track";
  if (healthScore >= 50) return "Watch";
  if (healthScore >= 30) return "At Risk";
  return "Critical";
}

