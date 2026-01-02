import React from 'react';
import ExecutiveCard from './ExecutiveCard';
import MetricKPI from './MetricKPI';

const controlRoomData = require('../../../data/demo/control_room.json');

export default function ExecutiveNarrativeStrip() {
  // Compute values from data
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

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-default mb-6 tracking-tight">
        Executive Summary — What fails next if we do nothing
      </h2>
      <div className="space-y-4">
        <ExecutiveCard accent="danger" className="p-5">
          <div className="text-lg font-semibold text-default mb-3">Portfolio Exposure</div>
          <div className="flex items-center gap-4 mb-3">
            <MetricKPI label="Value at Risk" value={formatAmount(totalValueAtRisk)} tone="danger" />
            <MetricKPI label="Irreversible in" value={`${soonestIrreversibility}d`} tone="danger" />
          </div>
          <div className="text-muted leading-relaxed">
            If we do nothing, this becomes permanent across {failingInitiatives.length} critical initiatives.
          </div>
        </ExecutiveCard>

        <ExecutiveCard accent="warning" className="p-5">
          <div className="text-lg font-semibold text-default mb-3">Cascade Risk</div>
          <div className="flex items-center gap-4 mb-3">
            <MetricKPI label="Cascade Impact" value={formatAmount(totalCascadeImpact)} tone="warning" />
            <MetricKPI label="Initiatives" value={failingInitiatives.length} tone="warning" />
          </div>
          <div className="text-muted leading-relaxed">
            Failure cascades could impact this across dependent initiatives if critical paths break.
          </div>
        </ExecutiveCard>

        <ExecutiveCard accent="danger" className="p-5">
          <div className="text-lg font-semibold text-default mb-3">Decision Debt</div>
          <div className="flex items-center gap-4 mb-3">
            <MetricKPI label="Decisions Due" value={urgentDecisionCount} tone="danger" />
            <MetricKPI label="Value at Risk" value={formatAmount(urgentDecisionValue)} tone="danger" />
          </div>
          <div className="text-muted leading-relaxed">
            Decisions due within 7 days, at risk if delayed.
          </div>
        </ExecutiveCard>
      </div>
    </div>
  );
}
