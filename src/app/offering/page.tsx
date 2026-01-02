export const dynamic = "force-dynamic";

import Link from "next/link";
import ExecutiveCard from "@/components/ui/ExecutiveCard";
import ExecutiveSectionHeader from "@/components/ui/ExecutiveSectionHeader";
import PageShell from "@/components/ui/PageShell";

export default function OfferingPage() {
  return (
    <PageShell
      title="Decision-Grade Program Control Room"
      subtitle="2-week deployment • Board-ready executive visibility • $1M+ value protection"
    >
      {/* Hero Promise */}
      <div className="text-center max-w-5xl mx-auto mb-12">
        <div className="text-lg text-[var(--text)] font-medium mb-3" data-testid="offering-title">
          Stop portfolio surprises. Force weekly decisions. Protect executive outcomes.
        </div>
        <div className="text-[var(--text-muted)] mb-10">
          Executive-grade portfolio control with decision velocity, risk protection, and board-ready visibility.
        </div>
      </div>

      {/* 2. Outcomes (measurable) */}
      <div className="mb-12">
        <ExecutiveSectionHeader title="Outcomes (Measurable Results)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full">
            <ExecutiveCard className="p-6 h-full">
              <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Decision Velocity: 3x Faster</div>
              <div className="text-[var(--text-muted)]">Critical decisions resolved within 48 hours instead of 2 weeks</div>
            </ExecutiveCard>
          </div>
          <div className="h-full">
            <ExecutiveCard className="p-6 h-full">
              <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Fewer Surprises: 80% Reduction</div>
              <div className="text-[var(--text-muted)]">Portfolio issues identified 30+ days earlier</div>
            </ExecutiveCard>
          </div>
          <div className="h-full">
            <ExecutiveCard className="p-6 h-full">
              <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Quantified Exposure: $2M+ Protected</div>
              <div className="text-[var(--text-muted)]">Value at risk made visible and actionable weekly</div>
            </ExecutiveCard>
          </div>
          <div className="h-full">
            <ExecutiveCard className="p-6 h-full">
              <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Executive Accountability: 100%</div>
              <div className="text-[var(--text-muted)]">Clear ownership and escalation paths for every decision</div>
            </ExecutiveCard>
          </div>
        </div>
      </div>

      {/* 3. What You Get (deliverables) */}
      <div className="mb-12">
        <ExecutiveSectionHeader title="What You Get (Deliverables)" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Executive Cockpit</div>
            <div className="text-[var(--text-muted)]">Real-time portfolio visibility with at-risk spotlight and decision center</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Rock Verdict Engine</div>
            <div className="text-[var(--text-muted)]">Individual initiative assessment with evidence-based verdicts</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Board Pack PDF</div>
            <div className="text-[var(--text-muted)]">Printer-ready executive summary with decision recommendations</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Weekly Change Log</div>
            <div className="text-[var(--text-muted)]">What changed since last review with executive impact assessment</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Risk Credibility Panel</div>
            <div className="text-[var(--text-muted)]">Enterprise risks with mitigation status and executive ownership</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Cadence Intelligence</div>
            <div className="text-[var(--text-muted)]">Automated meeting schedules and artifact deadline management</div>
          </ExecutiveCard>
        </div>
      </div>

      {/* 4. 2-Week Delivery Plan */}
      <div className="mb-12">
        <ExecutiveSectionHeader title="2-Week Delivery Plan" />
        <div className="space-y-6">
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-4">Week 1: Instrumentation + Modeling</div>
            <div className="space-y-2 text-[var(--text-muted)]">
              <div>• Data collection and portfolio modeling</div>
              <div>• Scoring logic and confidence weighting setup</div>
              <div>• Risk and dependency mapping</div>
              <div>• Initial executive cockpit deployment</div>
            </div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-4">Week 2: Cadence + Board Pack</div>
            <div className="space-y-2 text-[var(--text-muted)]">
              <div>• Meeting schedule and artifact automation</div>
              <div>• Board pack generation and formatting</div>
              <div>• Change tracking and alerting setup</div>
              <div>• Executive training and handover</div>
            </div>
          </ExecutiveCard>
        </div>
      </div>

      {/* 5. Operating Rhythm */}
      <div className="mb-12">
        <ExecutiveSectionHeader title="Operating Rhythm (Weekly Cadence)" />
        <div className="space-y-6">
          <ExecutiveCard className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-sm font-semibold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded">Daily</div>
              <div className="text-lg font-semibold text-[var(--text-strong)]">Daily Sync</div>
            </div>
            <div className="text-[var(--text-muted)]">Workstream alignment on blockers and priorities</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-sm font-semibold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded">Weekly</div>
              <div className="text-lg font-semibold text-[var(--text-strong)]">WBR (Weekly Business Review)</div>
            </div>
            <div className="text-[var(--text-muted)]">Program health and velocity review with Exec Pack draft</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-sm font-semibold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded">Monthly</div>
              <div className="text-lg font-semibold text-[var(--text-strong)]">MBR (Monthly Business Review)</div>
            </div>
            <div className="text-[var(--text-muted)]">Executive strategic decisions with portfolio review</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-sm font-semibold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded">Quarterly</div>
              <div className="text-lg font-semibold text-[var(--text-strong)]">SteerCo (Steering Committee)</div>
            </div>
            <div className="text-[var(--text-muted)]">Board-level strategic review and resource allocation</div>
          </ExecutiveCard>
        </div>
      </div>

      {/* 6. Why This Works */}
      <div className="mb-12">
        <ExecutiveSectionHeader title="Why This Works (Differentiation)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Confidence-Weighted Evidence</div>
            <div className="text-[var(--text-muted)]">Progress without evidence doesn't score—preventing false confidence</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Decision Debt Tracking</div>
            <div className="text-[var(--text-muted)]">Unresolved decisions surfaced as leading delivery risk indicator</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Irreversibility Timelines</div>
            <div className="text-[var(--text-muted)]">When failure becomes permanent is calculated and tracked</div>
          </ExecutiveCard>
          <ExecutiveCard className="p-6">
            <div className="text-lg font-semibold text-[var(--text-strong)] mb-2">Executive Ownership</div>
            <div className="text-[var(--text-muted)]">Every decision and risk has named executive accountability</div>
          </ExecutiveCard>
        </div>
      </div>

      {/* 7. CTA */}
      <div className="text-center">
        <div className="mb-6">
          <p className="text-lg text-[var(--text-muted)] mb-6">
            Run 30-min calibration session → produce first board pack within 5 business days
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-[var(--primary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--primary)]/90 transition-colors"
          >
            View Live Executive Cockpit →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
