import type { Rock, KPI, Risk, Action } from "./types";
import { getKPIsForRock, getRisksForRock, getActionsForRock } from "./data";

export function calculateRockHealthScore(rock: Rock): number {
  const kpis = getKPIsForRock(rock.id);
  const risks = getRisksForRock(rock.id);
  const actions = getActionsForRock(rock.id);

  // KPI Score (40% weight)
  let kpiScore = 100;
  if (kpis.length > 0) {
    const kpiScores = kpis.map((kpi) => {
      const ratio = kpi.current / kpi.target;
      return Math.min(ratio * 100, 100);
    });
    kpiScore = kpiScores.reduce((sum, score) => sum + score, 0) / kpiScores.length;
  }

  // Risk Score (30% weight) - inverse of risk exposure
  let riskScore = 100;
  risks.forEach((risk) => {
    if (risk.status === "Open") {
      switch (risk.severity) {
        case "Critical":
          riskScore -= 30;
          break;
        case "High":
          riskScore -= 15;
          break;
        case "Medium":
          riskScore -= 5;
          break;
        case "Low":
          riskScore -= 1;
          break;
      }
    }
  });
  riskScore = Math.max(0, riskScore);

  // Action Score (20% weight) - completion rate
  let actionScore = 100;
  if (actions.length > 0) {
    const completed = actions.filter((a) => a.status === "Complete").length;
    actionScore = (completed / actions.length) * 100;
  }

  // Timeline Score (10% weight) - simplified for now
  const timelineScore = 100; // TODO: Calculate based on progress vs expected

  // Weighted average
  const weightedScore =
    kpiScore * 0.4 + riskScore * 0.3 + actionScore * 0.2 + timelineScore * 0.1;

  // Confidence multiplier
  let confidenceMultiplier = 1.0;
  switch (rock.confidence) {
    case "High":
      confidenceMultiplier = 1.0;
      break;
    case "Medium":
      confidenceMultiplier = 0.9;
      break;
    case "Low":
      confidenceMultiplier = 0.8;
      break;
  }

  return Math.round(weightedScore * confidenceMultiplier);
}

export function calculatePortfolioHealthScore(rocks: Rock[]): number {
  if (rocks.length === 0) return 0;

  let totalWeightedScore = 0;
  let totalWeight = 0;

  rocks.forEach((rock) => {
    const score = calculateRockHealthScore(rock);
    let weight = 1.0;
    switch (rock.confidence) {
      case "High":
        weight = 1.0;
        break;
      case "Medium":
        weight = 0.8;
        break;
      case "Low":
        weight = 0.6;
        break;
    }
    totalWeightedScore += score * weight;
    totalWeight += weight;
  });

  return Math.round(totalWeightedScore / totalWeight);
}

