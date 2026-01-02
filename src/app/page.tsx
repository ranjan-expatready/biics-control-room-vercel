export const dynamic = "force-dynamic";

import Link from "next/link";
import { getCockpitViewModel } from "@/lib/data";
import PortfolioGrid from "@/components/cockpit/PortfolioGrid";
import AtRiskSpotlight from "@/components/cockpit/AtRiskSpotlight";
import DecisionsPanel from "@/components/cockpit/DecisionsPanel";
import SeverityPill from "@/components/ui/SeverityPill";
import ValueAtRisk from "@/components/ui/ValueAtRisk";
import DeadlineTag from "@/components/ui/DeadlineTag";
import ConsequenceIcon from "@/components/ui/ConsequenceIcon";
import ExecutiveCard from "@/components/ui/ExecutiveCard";
import ExecutiveSectionHeader from "@/components/ui/ExecutiveSectionHeader";
import EvidenceStrip from "@/components/ui/EvidenceStrip";
import MitigationStatus from "@/components/ui/MitigationStatus";
import ExecutiveNarrativeStrip from "@/components/ui/ExecutiveNarrativeStrip";
import WhatChangedStrip from "@/components/ui/WhatChangedStrip";
import ZoneHeader from "@/components/ui/ZoneHeader";
import MetricKPI from "@/components/ui/MetricKPI";
import EmphasisText from "@/components/ui/EmphasisText";
import InfoTooltip from "@/components/ui/InfoTooltip";
import PageShell from "@/components/ui/PageShell";

const controlRoomData = require("../../data/demo/control_room.json");

export default function Home() {
  if (process.env.NODE_ENV === 'production') {
    console.time('page-render');
    console.log('[BOOT] Starting page render');
  }

  // Get pre-computed view model (no heavy computation here)
  const viewModel = getCockpitViewModel();
  if (process.env.NODE_ENV === 'production') {
    console.log('[BOOT] View model loaded');
  }

  const { portfolio, rocksWithDetails, portfolioScore, avgConfidence } = viewModel;

  // Extract data from control room JSON
  const failingInitiatives = controlRoomData.initiatives.filter((i: any) => i.status === "FAILING");
  const warningInitiatives = controlRoomData.initiatives.filter((i: any) => i.status === "WARNING");
  const acceptableInitiatives = controlRoomData.initiatives.filter((i: any) => i.status === "ACCEPTABLE");

  // Helper to get highest-risk initiative from linked IDs
  const getHighestRiskInitiative = (linkedIds: string[]) => {
    return linkedIds.reduce((highest, id) => {
      const initiative = controlRoomData.initiatives.find((i: any) => i.id === id);
      return (!highest || (initiative && initiative.valueAtRiskUsd > highest.valueAtRiskUsd)) ? initiative : highest;
    }, null as any);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      })
    };
  };

  if (process.env.NODE_ENV === 'production') {
    console.log('[BOOT] About to render JSX');
    console.timeEnd('page-render');
  }

  // Calculate Executive Scan KPIs
  const failingForKPIs = controlRoomData.initiatives.filter((i: any) => i.status === "FAILING");
  const decisionsDue7Days = controlRoomData.decisions.filter((d: any) => d.dueInDays <= 7);
  const irreversibleSum = failingForKPIs.reduce((sum: number, i: any) => sum + i.valueAtRiskUsd, 0);
  const minIrreversibility = failingForKPIs.length > 0 ?
    Math.min(...failingForKPIs.map((i: any) => i.irreversibilityDays)) : 0;
  const totalAtRisk7Days = decisionsDue7Days.reduce((sum: number, d: any) => sum + d.valueAtRiskUsd, 0);
  const cascadeExposure = failingForKPIs.reduce((sum: number, i: any) => sum + i.cascadeImpactUsd, 0);
  const verdictCounts = controlRoomData.initiatives.reduce((acc: any, i: any) => {
    acc[i.verdict] = (acc[i.verdict] || 0) + 1;
    return acc;
  }, {});

  return (
    <div data-testid="control-room" className="page-container">
    <PageShell
      title="Program Control Room"
      subtitle="12 Big Rocks. Executive decisions. Real-time outcomes."
      titleClassName="text-4xl font-bold text-[var(--text-strong)] header-accent"
      subtitleClassName="text-lg font-semibold text-white bg-[var(--primary)] px-3 pt-1 pb-0.5 rounded-md mt-0 mb-0 inline-block"
      actions={
        <Link
          href="/exec-pack"
          className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-4 py-2 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
        >
          Generate Exec Pack
        </Link>
      }
    >
      {/* Executive Scan Header */}
      <div className="summary-strip p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 kpi-grid mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-micro mb-1">
              Irreversible Exposure
              <InfoTooltip
                title="Irreversible Exposure"
                meaning="Total value at risk in initiatives already failing; earliest deadline is when recovery becomes impossible."
                calculation="Sum(valueAtRiskUsd of FAILING initiatives) + min(irreversibilityDays among FAILING)."
              />
            </div>
            <div className="kpi-value">${(irreversibleSum / 1000000).toFixed(1)}M</div>
            <div className="text-muted">{minIrreversibility} days left</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-micro mb-1">
              $ at Risk (7 Days)
              <InfoTooltip
                title="$ At Risk (7 Days)"
                meaning="Value exposed by decisions due in the next 7 days."
                calculation="Sum(valueAtRiskUsd of decisions where dueInDays <= 7), plus count of those decisions."
              />
            </div>
            <div className="kpi-value">${(totalAtRisk7Days / 1000000).toFixed(1)}M</div>
            <div className="text-muted">{decisionsDue7Days.length} decisions</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-micro mb-1">
              Cascade Exposure
              <InfoTooltip
                title="Cascade Exposure"
                meaning="Downstream value impacted if failing initiatives trigger dependency cascades."
                calculation="Sum(cascadeImpactUsd for FAILING initiatives)."
              />
            </div>
            <div className="kpi-value">${(cascadeExposure / 1000000).toFixed(1)}M</div>
            <div className="text-muted">failing impact</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wide mb-1">
              Portfolio Status
              <InfoTooltip
                title="Portfolio Status"
                meaning="Count of initiatives by verdict."
                calculation="Count initiatives grouped by verdict RESCOPE/INTERVENE/CONTINUE."
              />
            </div>
            <div className="flex justify-center gap-1 text-xs">
              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">R:{verdictCounts.RESCOPE || 0}</span>
              <span className="bg-[var(--warning-bg)] text-[var(--warning-text)] px-1.5 py-0.5 rounded">I:{verdictCounts.INTERVENE || 0}</span>
              <span className="bg-[var(--success-bg)] text-[var(--success-text)] px-1.5 py-0.5 rounded">C:{verdictCounts.CONTINUE || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Health Overview */}
      <div className="summary-strip p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-[var(--text-muted)] font-medium mb-1">As Of,</div>
            <div className="text-lg font-semibold text-[var(--text-strong)]">{formatCurrentDateTime().date}</div>
            <div className="text-sm text-[var(--text-muted)] font-medium">{formatCurrentDateTime().time}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm text-muted mb-1">
              <span>Portfolio Health</span>
              <InfoTooltip
                title="Portfolio Health"
                meaning="Overall portfolio health score (0–100) based on initiative health and confidence."
                calculation="Derived from control_room.json portfolio summary."
              />
            </div>
            <div className="text-2xl font-bold text-default">{portfolioScore}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm text-muted mb-1">
              <span>Confidence</span>
              <InfoTooltip
                title="Confidence"
                meaning="How complete and reliable the evidence is."
                calculation="Use existing confidence computation/source currently displayed."
              />
            </div>
            <div className="text-2xl font-bold text-default">{avgConfidence}%</div>
          </div>
        </div>
      </div>

      {/* Portfolio Evidence Summary */}
      <div className="mb-8">
        <div className="bg-[var(--primary-light)] border border-[var(--border)] rounded-md p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--text-strong)] tracking-tight uppercase">PORTFOLIO EVIDENCE SUMMARY</h3>
            <div className="text-xs text-[var(--text-muted)] bg-white/50 px-2 py-1 rounded-md border border-[var(--border-subtle)] uppercase">
              LIVE METRICS
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Budget Metric */}
            <div className="bg-[var(--primary-light)] border border-[var(--border)] rounded-md p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wide mb-1">
                BUDGET STATUS
                <InfoTooltip
                  title="Budget Status"
                  meaning="Approved vs forecast spend and variance."
                  calculation="Sum portfolio totalApprovedUsd/totalForecastUsd and totalVariancePct from control_room.json portfolio."
                />
              </div>
              <div className="text-lg font-bold text-[var(--text-strong)] mb-1 uppercase">
                {controlRoomData.portfolioSummary.totalApprovedUsd >= 1000000
                  ? `$${(controlRoomData.portfolioSummary.totalApprovedUsd / 1000000).toFixed(1)}M`
                  : `$${(controlRoomData.portfolioSummary.totalApprovedUsd / 1000).toFixed(0)}K`}
              </div>
              {controlRoomData.portfolioSummary.totalVariancePct > 0 && (
                <div className="text-sm text-[var(--text-muted)] font-medium uppercase">
                  +{controlRoomData.portfolioSummary.totalVariancePct}% OVER
                </div>
              )}
            </div>

            {/* Timeline Metric */}
            <div className="bg-[var(--primary-light)] border border-[var(--border)] rounded-md p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wide mb-1">
                TIMELINE
                <InfoTooltip
                  title="Timeline"
                  meaning="Aggregate schedule risk based on slips."
                  calculation="Use overallTimelineRisk from portfolio summary."
                />
              </div>
              <div className="text-lg font-bold text-[var(--text-strong)] mb-1 uppercase">ON TRACK</div>
              <div className="text-sm text-[var(--text-muted)] font-medium uppercase">NO DELAYS</div>
            </div>

            {/* Quality Metric */}
            <div className="bg-[var(--primary-light)] border border-[var(--border)] rounded-md p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wide mb-1">
                QUALITY SIGNAL
                <InfoTooltip
                  title="Quality Signal"
                  meaning="Aggregate delivery quality signal."
                  calculation="Use overallQualityRisk from portfolio summary."
                />
              </div>
              <div className={`text-lg font-bold mb-1 uppercase ${
                controlRoomData.portfolioSummary.overallQualityRisk === 'HIGH'
                  ? 'text-[var(--danger)]'
                  : 'text-[var(--text-strong)]'
              }`}>
                {controlRoomData.portfolioSummary.overallQualityRisk === 'HIGH' ? 'CRITICAL' :
                 controlRoomData.portfolioSummary.overallQualityRisk === 'MEDIUM' ? 'DEGRADING' : 'STABLE'}
              </div>
              <div className="text-sm text-[var(--text-muted)] font-medium uppercase">RISK LEVEL</div>
            </div>

            {/* Confidence Metric */}
            <div className="bg-[var(--primary-light)] border border-[var(--border)] rounded-md p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wide mb-1">
                VALUE CONFIDENCE
                <InfoTooltip
                  title="Value Confidence"
                  meaning="Confidence in value delivery for the portfolio."
                  calculation="Use overallValueConfidence from portfolio summary."
                />
              </div>
              <div className="text-lg font-bold text-[var(--text-strong)] mb-1 uppercase">
                {controlRoomData.portfolioSummary.overallValueConfidence}%
              </div>
              <div className="text-sm text-[var(--text-muted)] font-medium uppercase">
                {controlRoomData.portfolioSummary.overallValueConfidence >= 80 ? 'HIGH' :
                 controlRoomData.portfolioSummary.overallValueConfidence >= 60 ? 'MEDIUM' : 'LOW'}
              </div>
            </div>
          </div>

          {/* Critical Issues Alert */}
          {(controlRoomData.portfolioSummary.totalVariancePct >= 20 ||
            controlRoomData.portfolioSummary.overallQualityRisk === 'HIGH' ||
            controlRoomData.portfolioSummary.overallValueConfidence < 60) && (
            <div className="mt-4 p-3 bg-[var(--primary-light)] border border-[var(--border)] rounded-md">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <div className="text-sm font-semibold text-[var(--danger)] uppercase">EXECUTIVE ATTENTION REQUIRED</div>
                  <div className="text-xs text-[var(--text-muted)] uppercase">
                    CRITICAL PORTFOLIO METRICS REQUIRE IMMEDIATE INTERVENTION
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Executive Narrative Strip */}
      <ExecutiveNarrativeStrip />

      {/* What Changed Strip */}
      <WhatChangedStrip />

      {/* Zone 1: Executive Intervention Required */}
      <div className="mb-16 border-b border-border-subtle pb-12">
        <ZoneHeader
          title="Executive Intervention Required"
          context={`${failingInitiatives.length} initiatives past recovery thresholds`}
          icon="🚨"
        />
        <div className="space-y-6">
          {failingInitiatives.map((initiative: any) => (
            <ExecutiveCard key={initiative.id} accent="danger" className="card-container">
              {/* Top Row: Name + Verdict + Severity */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Link href={`/rocks/${initiative.id}`} className="text-lg font-semibold text-[var(--text-strong)] hover:text-[var(--danger)] transition-colors">
                    {initiative.name}
                  </Link>
                  <span className="bg-[var(--danger-bg)] text-[var(--danger-text)] text-xs font-medium px-2 py-1 rounded uppercase">
                    {initiative.verdict}
                  </span>
                  <SeverityPill severity="FAILING" size="sm" />
                </div>
                <Link href={`/rocks/${initiative.id}#verdict`} className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                  Go to Verdict →
                </Link>
              </div>

              {/* Second Row: Value + Deadline + Evidence */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <ValueAtRisk amount={initiative.valueAtRiskUsd} showCascade={true} cascadeAmount={initiative.cascadeImpactUsd} size="sm" />
                  <DeadlineTag days={initiative.irreversibilityDays} type="irreversibility" size="sm" />
                </div>
                <div className="text-xs text-[var(--text-muted)] font-medium">{initiative.execOwner}</div>
                  </div>

              {/* Third Row: Primary Failure Mechanism */}
              <div className="text-sm text-[var(--text-muted)] italic">
                {initiative.primaryFailureMechanism}
                  </div>

              {/* Evidence Strip */}
              <div className="mt-3">
                    <EvidenceStrip
                      metrics={{
                        budgetApprovedUsd: initiative.budgetApprovedUsd,
                        budgetForecastUsd: initiative.budgetForecastUsd,
                        budgetVariancePct: initiative.budgetVariancePct,
                        timelineSlipDays: initiative.timelineSlipDays,
                        qualitySignal: initiative.qualitySignal as any,
                        valueConfidence: initiative.valueConfidence
                      }}
                      compact={true}
                    />
              </div>
            </ExecutiveCard>
          ))}
        </div>
      </div>

      {/* Zone 2: Decisions Required This Week */}
      <div className="mb-12">
        <ZoneHeader
          title="Decisions Required This Week"
          context={`${controlRoomData.decisions.length} pending decisions requiring executive action`}
          icon="⚡"
        />
        <div className="space-y-4">
          {controlRoomData.decisions.slice(0, 5).map((decision: any) => {
            const highestRiskInitiative = getHighestRiskInitiative(decision.linkedInitiativeIds);
            const firstSentence = decision.delayCostNarrative.split('.')[0] + '.';
            return (
              <ExecutiveCard key={decision.id} accent="warning" className="card-container">
                {/* Key Line: Title + STANCE badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Link href={`/rocks/${highestRiskInitiative?.id || decision.linkedInitiativeIds[0]}`} className="text-base font-bold text-[var(--text-strong)] hover:text-[var(--warning)] transition-colors">
                      {decision.title}
                    </Link>
                    <span className="bg-[var(--warning-bg)] text-[var(--warning-text)] text-xs font-semibold px-2 py-1 rounded uppercase">
                      ESCALATE
                    </span>
                  </div>
                </div>

                {/* Owner + Due Date in one line */}
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                  <span>{decision.execOwner}</span>
                  <span>Due in {decision.dueInDays} days</span>
                </div>

                {/* Consequence of delay (truncated) */}
                <div className="text-sm text-[var(--text-muted)] italic mb-2">
                  {firstSentence}
                  <Link href={`/rocks/${highestRiskInitiative?.id || decision.linkedInitiativeIds[0]}#decision`} className="text-[var(--primary)] hover:text-[var(--primary-hover)] ml-1">
                    View details →
                  </Link>
                    </div>

                {/* Evidence if available */}
                    {highestRiskInitiative && (
                  <div className="border-t border-[var(--border-subtle)] pt-3">
                    <div className="text-xs text-[var(--text-muted)] mb-2 font-medium">{highestRiskInitiative.name} Evidence:</div>
                        <EvidenceStrip
                          metrics={{
                            budgetApprovedUsd: highestRiskInitiative.budgetApprovedUsd,
                            budgetForecastUsd: highestRiskInitiative.budgetForecastUsd,
                            budgetVariancePct: highestRiskInitiative.budgetVariancePct,
                            timelineSlipDays: highestRiskInitiative.timelineSlipDays,
                            qualitySignal: highestRiskInitiative.qualitySignal as any,
                            valueConfidence: highestRiskInitiative.valueConfidence
                          }}
                          compact={true}
                        />
                      </div>
                    )}

                {/* Value at risk in corner */}
                <div className="flex justify-end mt-2">
                    <ValueAtRisk amount={decision.valueAtRiskUsd} size="sm" />
                </div>
              </ExecutiveCard>
            );
          })}
        </div>
      </div>

                  {/* Zone 3: Systemic Exposure & Cascading Failure */}
                  <div className="mb-12" data-testid="portfolio-grid">
                    <ZoneHeader
                      title="Systemic Exposure & Cascading Failure"
                      context={`${controlRoomData.initiatives.length} initiatives with dependency relationships`}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {controlRoomData.initiatives.map((initiative: any) => {
            const isClickable = initiative.status === "FAILING" || initiative.status === "WARNING";
            const dependencyText = initiative.dependencies.length > 0
              ? `Depends on: ${initiative.dependencies.join(", ")}`
              : "Independent";

            return (
              <ExecutiveCard key={initiative.id} className="p-4" data-testid="rock-tile">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    {isClickable ? (
                      <Link href={`/rocks/${initiative.id}`} className="font-medium text-default hover:text-primary transition-colors">
                        {initiative.name}
                      </Link>
                    ) : (
                      <div className="font-medium text-default">{initiative.name}</div>
                    )}
                  </div>
                  <SeverityPill severity={initiative.status as any} size="sm" />
                </div>
                <div className="text-xs text-muted leading-relaxed">
                  {dependencyText}
                </div>
                {initiative.cascadeImpactUsd > 0 && (
                  <div className="mt-2 flex items-center gap-1">
                    <ConsequenceIcon type="warning" size="sm" />
                    <span className="text-xs text-danger font-medium">
                      ${(initiative.cascadeImpactUsd / 1000000).toFixed(1)}M cascade impact
                    </span>
                  </div>
                )}
              </ExecutiveCard>
            );
          })}
        </div>
      </div>

      {/* Zone 3.5: Top Portfolio Risks & Mitigation Credibility */}
      <div className="mb-12">
        <ZoneHeader
          title="Portfolio Risks"
          context="5 enterprise risks requiring attention"
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {controlRoomData.portfolioRisks.slice(0, 5).map((risk: any) => (
            <ExecutiveCard
              key={risk.id}
              accent={risk.severity === 'CRITICAL' ? 'danger' : 'neutral'}
              className="p-4"
            >
              {/* Key Line: Title + Mitigation Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-[var(--text-strong)] text-sm leading-tight">
                  {risk.title}
                </div>
                <MitigationStatus status={risk.mitigationStatus as any} />
                  </div>

              {/* Compact consequence */}
              <div className="text-xs text-[var(--text-muted)] leading-tight mb-2 line-clamp-2">
                {risk.failureConsequence.split('.')[0] + '.'}
                </div>

              {/* Severity + Owner in one line */}
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${risk.severity === 'CRITICAL' ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
                  {risk.severity}
                </span>
                <span className="text-[var(--text-muted)]">{risk.ownerRole}</span>
              </div>
            </ExecutiveCard>
          ))}
        </div>
      </div>

      {/* Zone 4: Capital & Leadership Allocation */}
      <div className="mb-12">
        <ZoneHeader
          title="Capital & Leadership Allocation"
          context="Resource trade-offs for intervention options"
        />
        <ExecutiveCard accent="neutral" className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Rescue Requirements</h3>
            <div className="space-y-3">
              {failingInitiatives.map((initiative: any) => (
                <div key={initiative.id} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-b-0">
                  <span className="text-sm text-muted">{initiative.name}</span>
                  <span className="text-sm font-medium text-default">
                    ${Math.floor(initiative.valueAtRiskUsd * 0.3 / 1000000)}-${Math.floor(initiative.valueAtRiskUsd * 0.5 / 1000000)}M capital + {Math.ceil(initiative.cascadeImpactUsd / 5000000)} executives
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-border-subtle">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-default">Available Capacity</span>
              <span className="text-sm text-muted">5 executives | $12M quarterly budget remaining</span>
            </div>
            <div className="mt-2 text-xs text-muted">
              Rescuing all 3 failing initiatives requires reallocating 7 executives and $18-25M from other programs.
            </div>
          </div>
        </ExecutiveCard>
      </div>

      {/* Zone 5: Failure Signals (Next 30–60 Days) */}
      <div className="mb-12">
        <ZoneHeader
          title="Failure Signals (Next 30–60 Days)"
          context={`${controlRoomData.failureSignals.length} impending irreversibility points`}
        />
        <div className="space-y-1">
          {controlRoomData.failureSignals.map((signal: any) => (
            <ExecutiveCard key={signal.label} accent="danger" className="flex items-center gap-3 px-4 py-2">
              <ConsequenceIcon type="deadline" size="sm" />
              <div className="flex-1 text-xs text-default leading-tight">
                <span className="font-medium">{signal.label}</span>
                <EmphasisText tone="danger" className="inline ml-1">in {signal.inDays} days</EmphasisText>
                <span className="block text-muted mt-1">{signal.impactNarrative}</span>
              </div>
            </ExecutiveCard>
          ))}
        </div>
      </div>
    </PageShell>
    </div>
  );
}
