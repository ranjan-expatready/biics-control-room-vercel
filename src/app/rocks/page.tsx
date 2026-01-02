"use client";

import Link from "next/link";
import PageShell from "@/components/ui/PageShell";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  ScatterChart,
  Scatter,
  ReferenceArea
} from 'recharts';

const controlRoomData = require("../../../data/demo/control_room.json");

export default function RocksPage() {

  // Chart data preparation
  // Budget Overrun Data - sorted by variance descending (worst first)
  const budgetData = controlRoomData.initiatives
    .sort((a: any, b: any) => b.budgetVariancePct - a.budgetVariancePct)
    .map((initiative: any) => ({
      name: initiative.name.substring(0, 15) + (initiative.name.length > 15 ? '...' : ''),
      approved: initiative.budgetApprovedUsd / 1000000,
      forecast: initiative.budgetForecastUsd / 1000000,
      variance: initiative.budgetVariancePct
    }));

  // Schedule Slip Data - sorted by slip days descending
  const scheduleData = controlRoomData.initiatives
    .sort((a: any, b: any) => b.timelineSlipDays - a.timelineSlipDays)
    .map((initiative: any) => ({
      name: initiative.name.substring(0, 15) + (initiative.name.length > 15 ? '...' : ''),
      slipDays: initiative.timelineSlipDays
    }));

  // Initiatives sorted by priority score (highest first)
  const sortedInitiatives = controlRoomData.initiatives
    .map((initiative: any) => {
      const qualityMultiplier = initiative.qualitySignal === 'STABLE' ? 1 :
                               initiative.qualitySignal === 'DEGRADING' ? 1.2 : 1.5;
      const priorityScore = initiative.valueAtRiskUsd *
                           (1 + initiative.budgetVariancePct / 100) *
                           (1 + initiative.timelineSlipDays / 60) *
                           qualityMultiplier;
      return { ...initiative, priorityScore };
    })
    .sort((a: any, b: any) => b.priorityScore - a.priorityScore);


  return (
    <div data-testid="rocks-page">
      <PageShell
        title="Rocks — Portfolio Comparison"
        subtitle="Strategic portfolio analysis across all 12 initiatives"
      >

      {/* Decision Quadrant + Top 3 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-strong)] mb-6">Decision Quadrant</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6">
          {/* Quadrant Chart - left column */}
          <div>
            <div data-testid="rocks-quadrant" className="bg-white border border-[var(--border)] rounded-lg shadow-sm p-6">
              <ResponsiveContainer width="100%" height={420}>
                <ScatterChart
                  margin={{ top: 20, right: 60, bottom: 80, left: 100 }}
                  data={controlRoomData.initiatives.map((initiative: any) => ({
                    x: initiative.budgetVariancePct,
                    y: initiative.timelineSlipDays,
                    name: initiative.name,
                    verdict: initiative.verdict,
                    owner: initiative.execOwner,
                    valueAtRisk: initiative.valueAtRiskUsd,
                    quality: initiative.qualitySignal,
                    size: Math.max(100, Math.min(400, (initiative.valueAtRiskUsd / 5000000) * 150))
                  }))}
                >
                  {/* Very light quadrant background areas */}
                  <ReferenceArea x1={-50} x2={15} y1={-10} y2={30} fill="rgba(34,197,94,0.04)" />
                  <ReferenceArea x1={15} x2={50} y1={-10} y2={30} fill="rgba(251,146,60,0.04)" />
                  <ReferenceArea x1={-50} x2={15} y1={30} y2={60} fill="rgba(156,163,175,0.04)" />
                  <ReferenceArea x1={15} x2={50} y1={30} y2={60} fill="rgba(239,68,68,0.04)" />

                  {/* Threshold lines */}
                  <ReferenceLine x={15} stroke="#dc2626" strokeDasharray="5 5" />
                  <ReferenceLine y={30} stroke="#d97706" strokeDasharray="5 5" />

                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Budget Variance %"
                    label={{ value: 'Budget Variance (%)', position: 'insideBottom', offset: -10 }}
                    domain={[-10, 50]}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Schedule Slip"
                    label={{ value: 'Schedule Slip (Days)', angle: -90, position: 'insideLeft' }}
                    domain={[-5, 55]}
                    tick={{ fontSize: 11 }}
                  />

                  <Scatter
                    name="Initiatives"
                    dataKey="size"
                    shape={(props: any) => {
                      const { cx, cy, payload } = props;
                      const verdictColor = payload.verdict === 'RESCOPE' ? '#dc2626' :
                                         payload.verdict === 'INTERVENE' ? '#d97706' : '#64748b';
                      const strokeWidth = payload.quality === 'CRITICAL' ? 3 :
                                        payload.quality === 'DEGRADING' ? 2 : 1;
                      const strokeColor = payload.quality === 'CRITICAL' ? '#dc2626' :
                                        payload.quality === 'DEGRADING' ? '#d97706' : '#9ca3af';

                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={Math.sqrt(payload.size / Math.PI)}
                          fill={verdictColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                        />
                      );
                    }}
                  />

                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        const data = payload[0].payload;
                        const verdictLabel = data.verdict === 'RESCOPE' ? 'RE-SCOPE' :
                                           data.verdict === 'INTERVENE' ? 'INTERVENTION' : 'ON TRACK';
                        return (
                          <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
                            <div className="font-bold text-gray-900 mb-2">{data.name}</div>
                            <div className="space-y-1 text-sm">
                              <div><strong>Verdict:</strong> {verdictLabel}</div>
                              <div><strong>Owner:</strong> {data.owner}</div>
                              <div><strong>$ at risk:</strong> ${(data.valueAtRisk / 1000000).toFixed(1)}M</div>
                              <div><strong>Variance:</strong> {data.x > 0 ? '+' : ''}{data.x}%</div>
                              <div><strong>Slip:</strong> {data.y} days</div>
                              <div><strong>Quality:</strong> {data.quality}</div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>

              {/* Compact legend strip under quadrant */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-muted)]">
                  <div><strong>X-axis:</strong> Budget variance (% over approved)</div>
                  <div><strong>Y-axis:</strong> Schedule slip (days late)</div>
                  <div><strong>Dot size:</strong> $ at risk</div>
                  <div><strong>Dot color:</strong> verdict (ON TRACK/INTERVENTION/RE-SCOPE)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Intervention Priorities - right column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--text-strong)] mb-4">Intervention Priorities</h3>
            <div className="space-y-4">
              {sortedInitiatives.slice(0, 3).map((initiative: any, index: number) => {
                const verdictLabel = initiative.verdict === 'RESCOPE' ? 'RE-SCOPE' :
                                   initiative.verdict === 'INTERVENE' ? 'INTERVENTION' : 'ON TRACK';
                return (
                  <div key={initiative.id} className="bg-white rounded-md p-4 border border-[var(--border)] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-[var(--text-strong)] text-base">{initiative.name}</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                        initiative.verdict === 'RESCOPE' ? 'bg-red-100 text-red-800' :
                        initiative.verdict === 'INTERVENE' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {verdictLabel}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-strong)] mb-1">
                      ${(initiative.valueAtRiskUsd / 1000000).toFixed(1)}M at risk
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {initiative.budgetVariancePct > 0 ? '+' : ''}{initiative.budgetVariancePct}% budget • +{initiative.timelineSlipDays} days schedule
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* Portfolio Scoreboard — 12 Rocks at a Glance */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--text-strong)] mb-8">Portfolio Scoreboard — 12 Rocks at a Glance</h2>

        <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[var(--text-strong)]">Initiative</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-strong)]">Budget Var %</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-strong)]">Schedule Slip</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-strong)]">Quality</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-strong)]">$ at Risk</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[var(--text-strong)]">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {sortedInitiatives.map((initiative: any) => {
                  const verdictLabel = initiative.verdict === 'RESCOPE' ? 'RE-SCOPE' :
                                     initiative.verdict === 'INTERVENE' ? 'INTERVENE' : 'MONITOR';

                  // Cell styling functions
                  const getBudgetTint = (variance: number) => {
                    if (variance >= 20) return 'bg-red-50';
                    if (variance >= 10) return 'bg-orange-50';
                    return 'bg-white';
                  };

                  const getScheduleTint = (slip: number) => {
                    if (slip >= 30) return 'bg-red-50';
                    if (slip >= 15) return 'bg-orange-50';
                    return 'bg-white';
                  };

                  const getQualityTint = (quality: string) => {
                    if (quality === 'CRITICAL') return 'bg-red-50';
                    if (quality === 'DEGRADING') return 'bg-orange-50';
                    return 'bg-white';
                  };

                  const getRiskEmphasis = (risk: number) => {
                    return risk >= 8000000 ? 'font-bold text-red-800' : 'font-semibold text-[var(--text-strong)]';
                  };

                  return (
                    <tr key={initiative.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface-2)]/50">
                      <td className="py-4 px-6">
                        <Link
                          href={`/rocks/${initiative.id}#verdict`}
                          className="text-[var(--text-strong)] hover:text-[var(--primary)] font-medium block leading-tight"
                        >
                          {initiative.name}
                        </Link>
                      </td>
                      <td className={`py-4 px-4 text-center ${getBudgetTint(initiative.budgetVariancePct)}`}>
                        <span className="font-bold text-[var(--text-strong)]">
                          {initiative.budgetVariancePct > 0 ? '+' : ''}{initiative.budgetVariancePct}%
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-center ${getScheduleTint(initiative.timelineSlipDays)}`}>
                        <span className="font-bold text-[var(--text-strong)]">
                          {initiative.timelineSlipDays}d
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-center ${getQualityTint(initiative.qualitySignal)}`}>
                        <span className="font-bold text-[var(--text-strong)]">
                          {initiative.qualitySignal}
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-center ${initiative.valueAtRiskUsd >= 8000000 ? 'bg-red-50' : 'bg-white'}`}>
                        <span className={`font-bold ${getRiskEmphasis(initiative.valueAtRiskUsd)}`}>
                          ${(initiative.valueAtRiskUsd / 1000000).toFixed(1)}M
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          initiative.verdict === 'RESCOPE' ? 'bg-red-100 text-red-800' :
                          initiative.verdict === 'INTERVENE' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {verdictLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality + Value Confidence Heatmap */}
        <div data-testid="rocks-heatmap" className="mt-8 card-base p-6">
          <h3 className="h3 mb-6">Portfolio Health Surface</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Initiative</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Verdict</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Quality</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Value Confidence</th>
                </tr>
              </thead>
              <tbody>
                {sortedInitiatives.map((initiative: any) => (
                  <tr key={initiative.id} className="border-b border-[var(--border-subtle)] hover:bg-white/50 transition-colors">
                    <td className="py-3 px-4">
                      <Link
                        href={`/rocks/${initiative.id}#verdict`}
                        className="font-medium text-[var(--text-strong)] hover:text-[var(--primary)] transition-colors"
                      >
                        {initiative.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        initiative.verdict === 'RESCOPE' ? 'bg-amber-100 text-amber-800' :
                        initiative.verdict === 'INTERVENE' ? 'bg-[var(--warning-bg)] text-[var(--warning-text)]' :
                        'bg-[var(--surface)] text-[var(--text-muted)]'
                      }`}>
                        {initiative.verdict}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        initiative.qualitySignal === 'CRITICAL' ? 'bg-[var(--danger-bg)] text-[var(--danger-text)]' :
                        initiative.qualitySignal === 'DEGRADING' ? 'bg-[var(--warning-bg)] text-[var(--warning-text)]' :
                        'bg-[var(--success-bg)] text-[var(--success-text)]'
                      }`}>
                        {initiative.qualitySignal}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[var(--surface-2)] rounded-full h-2">
                          <div
                            className="bg-[var(--primary)] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${initiative.valueConfidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-[var(--text-strong)] min-w-[3rem]">
                          {initiative.valueConfidence}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Initiatives Table */}
      <div data-testid="rocks-table" className="card-base p-6">
        <h2 className="h2">All Initiatives</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Initiative</th>
                <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Verdict</th>
                <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Owner</th>
                <th className="text-right py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">$ at Risk</th>
                <th className="text-right py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Budget Variance</th>
                <th className="text-right py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Timeline Slip</th>
                <th className="text-left py-3 px-4 font-semibold text-[var(--text-strong)] uppercase text-xs tracking-wide">Quality Signal</th>
              </tr>
            </thead>
            <tbody>
              {sortedInitiatives.map((initiative: any) => (
                <tr data-testid="rocks-row" key={initiative.id} className="border-b border-[var(--border-subtle)] hover:bg-white/50 transition-colors">
                  <td className="py-3 px-4">
                    <Link
                      href={`/rocks/${initiative.id}#verdict`}
                      className="font-medium text-[var(--text-strong)] hover:text-[var(--primary)] transition-colors"
                    >
                      {initiative.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      initiative.verdict === 'RESCOPE' ? 'bg-amber-100 text-amber-800' :
                      initiative.verdict === 'INTERVENE' ? 'bg-[var(--warning-bg)] text-[var(--warning-text)]' :
                      'bg-[var(--surface)] text-[var(--text-muted)]'
                    }`}>
                      {initiative.verdict}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--text-muted)]">{initiative.execOwner}</td>
                  <td className="py-3 px-4 text-right font-medium text-[var(--text-strong)]">
                    ${(initiative.valueAtRiskUsd / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${initiative.budgetVariancePct > 0 ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                      {initiative.budgetVariancePct > 0 ? '+' : ''}{initiative.budgetVariancePct}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${initiative.timelineSlipDays > 0 ? 'text-[var(--warning)]' : 'text-[var(--success)]'}`}>
                      {initiative.timelineSlipDays > 0 ? '+' : ''}{initiative.timelineSlipDays} days
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      initiative.qualitySignal === 'CRITICAL' ? 'bg-[var(--danger-bg)] text-[var(--danger-text)]' :
                      initiative.qualitySignal === 'DEGRADING' ? 'bg-[var(--warning-bg)] text-[var(--warning-text)]' :
                      'bg-[var(--success-bg)] text-[var(--success-text)]'
                    }`}>
                      {initiative.qualitySignal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </PageShell>
    </div>
  );
}
