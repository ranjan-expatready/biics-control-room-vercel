export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ZoneHeader from "@/components/ui/ZoneHeader";
import MetricKPI from "@/components/ui/MetricKPI";
import EmphasisText from "@/components/ui/EmphasisText";
import PageShell from "@/components/ui/PageShell";

const controlRoomData = require("../../../../data/demo/control_room.json");

interface RockPageProps {
  params: Promise<{ rockId: string }>;
}

export default async function RockPage({ params }: RockPageProps) {
  const { rockId } = await params;
  const initiative = controlRoomData.initiatives.find((i: any) => i.id === rockId);

  if (!initiative) {
    notFound();
  }

  const formatAmount = (usd: number) => {
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(1)}M`;
    } else if (usd >= 1000) {
      return `$${(usd / 1000).toFixed(0)}K`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return (
    <PageShell
      title={initiative.name}
      subtitle={`${initiative.execOwner} • ${formatAmount(initiative.valueAtRiskUsd)} at risk`}
    >
      {/* Jump to Navigation */}
      <div className="mb-8 p-4 bg-surface border border-border-subtle rounded-sm" data-testid="rock-tabs">
        <div className="flex gap-4 text-sm">
          <span className="text-muted mr-2">Jump to:</span>
          <a href="#verdict" className="text-primary hover:text-primary-hover underline">Verdict</a>
          <a href="#rationale" className="text-primary hover:text-primary-hover underline">Why</a>
          <a href="#decision" className="text-primary hover:text-primary-hover underline">Decision</a>
          <a href="#evidence" className="text-primary hover:text-primary-hover underline">Evidence</a>
          <a href="#dependencies" className="text-primary hover:text-primary-hover underline">Dependencies</a>
        </div>
      </div>

      {/* Zone A: Verdict Banner */}
      <div id="verdict" className="mb-12">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center px-6 py-3 rounded-sm text-2xl font-bold mb-4 ${
            initiative.verdict === 'RESCOPE' ? 'bg-amber-100 text-amber-800' :
            initiative.verdict === 'INTERVENE' ? 'bg-warning-bg text-warning' :
            'bg-surface text-default'
          }`}>
            VERDICT: {initiative.verdict === 'CONTINUE' ? 'CONTINUE AS-IS' :
                      initiative.verdict === 'INTERVENE' ? 'INTERVENE & CORRECT' :
                      <EmphasisText tone="warning">RE-SCOPE</EmphasisText>}
          </div>
          <div className="text-lg text-muted mb-2">
            {initiative.name}
          </div>
          <div className="flex justify-center items-center gap-6 text-sm">
            <span className="text-default font-semibold">{formatAmount(initiative.valueAtRiskUsd)} at risk</span>
            <span className="text-danger">Irreversible in {initiative.irreversibilityDays} days</span>
          </div>
        </div>
      </div>

      {/* Zone B: Why this verdict */}
      <div id="rationale" className="mb-12">
        <ZoneHeader title="Why this verdict" />
        <ul className="space-y-3">
          {initiative.verdictRationale.map((reason: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-muted mt-1">•</span>
              <span className="text-muted leading-relaxed">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Zone C: Decision Required This Week */}
      <div id="decision" className="mb-12">
        <ZoneHeader title="Decision Required This Week" />
        <div className="bg-surface border border-border-subtle rounded-sm p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-default text-lg mb-2">{initiative.decisionThisWeek.title}</h3>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-muted">Owner: <span className="text-default font-medium">{initiative.decisionThisWeek.ownerRole}</span></span>
              <span className="text-muted">Due in: <span className="text-default font-medium">{initiative.decisionThisWeek.dueInDays} days</span></span>
            </div>
          </div>
          <div className="text-sm text-danger font-medium">
            {initiative.decisionThisWeek.consequence}
          </div>
        </div>
      </div>

      {/* Zone D: Evidence */}
      <div id="evidence" className="mb-12">
        <ZoneHeader title="Evidence" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Value Threshold */}
          <div className="bg-surface border border-border-subtle rounded-sm p-4">
            <h3 className="font-semibold text-default mb-3">Value Threshold</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Current:</span>
                <span className={`font-medium ${initiative.evidence.valueTrajectory.currentValuePct >= initiative.evidence.valueTrajectory.requiredValuePct ? 'text-success' : 'text-danger'}`}>
                  {initiative.evidence.valueTrajectory.currentValuePct}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Required:</span>
                <span className="text-default font-medium">{initiative.evidence.valueTrajectory.requiredValuePct}%</span>
              </div>
              <div className="mt-3 h-2 bg-[var(--surface-2)] rounded-sm overflow-hidden">
                <div
                  className={`h-full ${initiative.evidence.valueTrajectory.currentValuePct >= initiative.evidence.valueTrajectory.requiredValuePct ? 'bg-success' : 'bg-danger'}`}
                  style={{ width: `${Math.min(100, initiative.evidence.valueTrajectory.currentValuePct)}%` }}
                ></div>
                <div
                  className="h-full border-r-2 border-warning absolute top-0"
                  style={{ left: `${initiative.evidence.valueTrajectory.requiredValuePct}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted mt-2">Trajectory over {initiative.evidence.valueTrajectory.inDays} days</div>
            </div>
          </div>

          {/* Recovery Cost Envelope */}
          <div className="bg-surface border border-border-subtle rounded-sm p-4">
            <h3 className="font-semibold text-default mb-3">Recovery Cost Envelope</h3>
            <div className="space-y-2">
              <div className="text-lg font-bold text-default">
                {formatAmount(initiative.evidence.recoveryCost.lowUsd)}–{formatAmount(initiative.evidence.recoveryCost.highUsd)}
              </div>
              <div className="text-sm text-muted">Additional investment required</div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">Success probability:</span>
                  <span className={`font-medium ${initiative.evidence.recoveryCost.successProbPct >= 70 ? 'text-success' : initiative.evidence.recoveryCost.successProbPct >= 40 ? 'text-warning' : 'text-danger'}`}>
                    {initiative.evidence.recoveryCost.successProbPct}%
                  </span>
                </div>
                <div className="h-2 bg-[var(--surface-2)] rounded-sm overflow-hidden">
                  <div
                    className={`h-full ${initiative.evidence.recoveryCost.successProbPct >= 70 ? 'bg-success' : initiative.evidence.recoveryCost.successProbPct >= 40 ? 'bg-warning' : 'bg-danger'}`}
                    style={{ width: `${initiative.evidence.recoveryCost.successProbPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Irreversibility Timeline */}
          <div className="bg-surface border border-border-subtle rounded-sm p-4">
            <h3 className="font-semibold text-default mb-3">Irreversibility Timeline</h3>
            <div className="space-y-2">
              <div className="text-lg font-bold text-danger">
                {initiative.evidence.irreversibility.inDays} days
              </div>
              <div className="text-sm text-muted">Until permanent failure</div>
              <div className="mt-3 text-sm text-muted leading-relaxed">
                {initiative.evidence.irreversibility.consequence}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Zone E: Dependencies & Cascade Impact */}
      <div id="dependencies" className="mb-12">
        <ZoneHeader title="Dependencies & Cascade Impact" />
        <div className="bg-surface border border-border-subtle rounded-sm p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-default mb-3">Key Dependencies</h3>
            <div className="flex flex-wrap gap-2">
              {initiative.dependencies.slice(0, 4).map((dep: string) => (
                <span key={dep} className="px-3 py-1 bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] rounded-sm text-sm">
                  {dep}
                </span>
              ))}
              {initiative.dependencies.length === 0 && (
                <span className="text-muted text-sm">No critical dependencies</span>
              )}
            </div>
          </div>
          {initiative.cascadeImpactUsd > 0 && (
            <div className="pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="text-muted">Cascade impact if this fails:</span>
                <span className="text-danger font-semibold">{formatAmount(initiative.cascadeImpactUsd)}</span>
              </div>
              <div className="mt-2 text-sm text-muted">
                Failure would trigger downstream effects across dependent initiatives, amplifying total business impact.
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
