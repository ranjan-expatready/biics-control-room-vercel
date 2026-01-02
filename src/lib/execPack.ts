const controlRoomData = require('../../data/demo/control_room.json');

export interface InitiativeSummary {
  id: string;
  name: string;
  execOwner: string;
  verdict: string;
  valueAtRiskUsd: number;
  irreversibilityDays: number;
  primaryFailureMechanism: string;
}

export interface DecisionSummary {
  title: string;
  ownerRole: string;
  dueInDays: number;
  valueAtRiskUsd: number;
  consequence: string;
  stance: string;
  recommendedByRole: string;
  ifRejectedConsequence: string;
  linkedInitiativeIds: string[];
}

export function getTop3InitiativesByUrgency(): InitiativeSummary[] {
  const failingFirst = controlRoomData.initiatives
    .filter((i: any) => i.status === 'FAILING')
    .sort((a: any, b: any) => a.irreversibilityDays - b.irreversibilityDays);

  const warningThenAcceptable = controlRoomData.initiatives
    .filter((i: any) => i.status !== 'FAILING')
    .sort((a: any, b: any) => a.irreversibilityDays - b.irreversibilityDays);

  return [...failingFirst, ...warningThenAcceptable].slice(0, 3).map((i: any) => ({
    id: i.id,
    name: i.name,
    execOwner: i.execOwner,
    verdict: i.verdict,
    valueAtRiskUsd: i.valueAtRiskUsd,
    irreversibilityDays: i.irreversibilityDays,
    primaryFailureMechanism: i.primaryFailureMechanism || 'On track'
  }));
}

export function getDecisionsRequiredThisWeek(): DecisionSummary[] {
  return controlRoomData.decisions
    .sort((a: any, b: any) => {
      if (a.dueInDays !== b.dueInDays) {
        return a.dueInDays - b.dueInDays; // Soonest first
      }
      return b.valueAtRiskUsd - a.valueAtRiskUsd; // Highest value risk first
    })
    .map((d: any) => ({
      title: d.title,
      ownerRole: d.execOwner,
      dueInDays: d.dueInDays,
      valueAtRiskUsd: d.valueAtRiskUsd,
      consequence: d.delayCostNarrative,
      stance: d.stance,
      recommendedByRole: d.recommendedByRole,
      ifRejectedConsequence: d.ifRejectedConsequence,
      linkedInitiativeIds: d.linkedInitiativeIds
    }));
}

export function getInitiativeVerdicts(): {
  rescope: InitiativeSummary[];
  intervene: InitiativeSummary[];
  continue: InitiativeSummary[];
} {
  const initiatives = controlRoomData.initiatives.map((i: any) => ({
    id: i.id,
    name: i.name,
    execOwner: i.execOwner,
    verdict: i.verdict,
    valueAtRiskUsd: i.valueAtRiskUsd,
    irreversibilityDays: i.irreversibilityDays,
    primaryFailureMechanism: i.primaryFailureMechanism || 'On track'
  }));

  return {
    rescope: initiatives.filter((i: any) => i.verdict === 'RESCOPE'),
    intervene: initiatives.filter((i: any) => i.verdict === 'INTERVENE'),
    continue: initiatives.filter((i: any) => i.verdict === 'CONTINUE')
  };
}

export function getPortfolioRisks() {
  return controlRoomData.portfolioRisks || [];
}

export function getExecutiveSummaryBullets() {
  const failingInitiatives = controlRoomData.initiatives.filter((i: any) => i.status === "FAILING");
  const totalValueAtRisk = failingInitiatives.reduce((sum: number, i: any) => sum + i.valueAtRiskUsd, 0);
  const soonestIrreversibility = Math.min(...failingInitiatives.map((i: any) => i.irreversibilityDays));

  const totalCascadeImpact = failingInitiatives.reduce((sum: number, i: any) => sum + i.cascadeImpactUsd, 0);

  const urgentDecisions = controlRoomData.decisions.filter((d: any) => d.dueInDays <= 7);
  const urgentDecisionCount = urgentDecisions.length;
  const urgentDecisionValue = urgentDecisions.reduce((sum: number, d: any) => sum + d.valueAtRiskUsd, 0);

  const formatAmount = (usd: number) => {
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(0)}M`;
    } else if (usd >= 1000) {
      return `$${(usd / 1000).toFixed(0)}K`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return [
    {
      title: 'Portfolio Exposure',
      content: `If we do nothing, ${formatAmount(totalValueAtRisk)} becomes irreversible in ${soonestIrreversibility} days across ${failingInitiatives.length} critical initiatives.`
    },
    {
      title: 'Cascade Risk',
      content: `Failure cascades could impact ${formatAmount(totalCascadeImpact)} across ${failingInitiatives.length} dependent initiatives if critical paths break.`
    },
    {
      title: 'Decision Debt',
      content: `${urgentDecisionCount} decisions are due within 7 days, representing ${formatAmount(urgentDecisionValue)} at risk if delayed.`
    }
  ];
}
