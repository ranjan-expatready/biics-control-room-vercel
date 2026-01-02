"use client";

export const dynamic = "force-dynamic";

import {
  getTop3InitiativesByUrgency,
  getDecisionsRequiredThisWeek,
  getInitiativeVerdicts,
  getPortfolioRisks,
  getExecutiveSummaryBullets
} from "@/lib/execPack";
import WhatChangedStrip from "@/components/ui/WhatChangedStrip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import PageShell from "@/components/ui/PageShell";

const controlRoomData = require("../../../data/demo/control_room.json");

export default function ExecPackPage() {
  const summaryBullets = getExecutiveSummaryBullets();
  const top3Initiatives = getTop3InitiativesByUrgency();
  const decisions = getDecisionsRequiredThisWeek();
  const verdicts = getInitiativeVerdicts();
  const risks = getPortfolioRisks();

  const formatAmount = (usd: number) => {
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(0)}M`;
    } else if (usd >= 1000) {
      return `$${(usd / 1000).toFixed(0)}K`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return (
    <PageShell
      title="Program Board Pre-Read"
      subtitle="Balanced Scorecard OS — Decision Pack"
      actions={
        <button
          onClick={() => window.print()}
          className="bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 print:hidden"
        >
          Print to PDF
        </button>
      }
    >

      {/* Page 1: Cover */}
      <div className="text-center mb-12 page-break-after">
        <h1 className="text-4xl font-bold text-[var(--text-strong)] mb-4 tracking-tight">Program Board Pre-Read</h1>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">Balanced Scorecard OS — Decision Pack</h2>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-8">Executive Pack</h2>

        <div className="text-lg text-[var(--text-muted)] mb-8">
          Prepared for: Executive Steering Committee
        </div>

        <div className="text-sm text-[var(--text-muted)] mb-8">
          As of: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        <div className="text-xs text-[var(--text-subtle)] border-t border-[var(--border)] pt-4">
          CONFIDENTIAL
        </div>
      </div>

      {/* Page 2: Executive Summary */}
      <div className="mb-12 page-break-after">
        <h1 className="text-3xl font-bold text-[var(--text-strong)] mb-8 border-b border-[var(--border)] pb-4">Executive Summary</h1>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-6">Portfolio Overview</h2>

        <div className="space-y-6 mb-8">
          {summaryBullets.map((bullet, index) => (
            <div key={index} className="exec-card">
              <h3 className="font-semibold text-[var(--text)] mb-2">{bullet.title}</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">{bullet.content}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">Top 3 Initiatives by Urgency</h2>
        <div className="space-y-4">
          {top3Initiatives.map((initiative, index) => (
            <div key={index} className="exec-card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-[var(--text)]">
                    <a href={`/rocks/${initiative.id}#verdict`} className="hover:underline">
                      {initiative.name}
                    </a>
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">{initiative.execOwner}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-[var(--text)]">{formatAmount(initiative.valueAtRiskUsd)} at risk</div>
                  <div className="text-sm text-[var(--text-muted)]">Verdict: {initiative.verdict}</div>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                Irreversible in {initiative.irreversibilityDays} days • {initiative.primaryFailureMechanism}
              </div>
            </div>
          ))}
        </div>

        <WhatChangedStrip />
      </div>

      {/* Page 3: Decisions Required This Week */}
      <div className="mb-12 page-break-after">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Decisions Required This Week</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Decisions Needed This Week</h2>

        <p className="text-sm text-gray-600 mb-6 italic">
          Decision debt is the leading indicator of portfolio failure.
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[800px] px-4 sm:px-0">
            <table className="w-full mb-6" data-testid="exec-pack-table">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b font-semibold">Decision</th>
              <th className="text-left py-2 px-4 border-b font-semibold">Owner Role</th>
              <th className="text-left py-2 px-4 border-b font-semibold">Due</th>
              <th className="text-left py-2 px-4 border-b font-semibold">$ at Risk</th>
              <th className="text-left py-2 px-4 border-b font-semibold">Stance</th>
              <th className="text-left py-2 px-4 border-b font-semibold">If Rejected</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((decision, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border-b font-medium">
                  <a href={`/rocks/${decision.linkedInitiativeIds[0]}#decision`} className="hover:underline">
                    {decision.title}
                  </a>
                </td>
                <td className="py-3 px-4 border-b">{decision.ownerRole}</td>
                <td className="py-3 px-4 border-b">{decision.dueInDays} days</td>
                <td className="py-3 px-4 border-b">{formatAmount(decision.valueAtRiskUsd)}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium ${
                    decision.stance === 'RECOMMEND' ? 'bg-success-bg text-success' :
                    decision.stance === 'ACCEPT' ? 'bg-warning-bg text-warning' :
                    'bg-danger-bg text-danger'
                  }`}>
                    {decision.stance}
                  </span>
                </td>
                <td className="py-3 px-4 border-b text-sm">{decision.ifRejectedConsequence}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-4 italic">
          Stance reflects operator recommendation; final accountability remains with decision owner.
        </p>
      </div>

      {/* Page 4: Initiative Verdicts */}
      <div className="mb-12 page-break-after">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Initiative Verdicts</h1>

        {Object.entries(verdicts).map(([verdictType, initiatives]) => (
          initiatives.length > 0 && (
            <div key={verdictType} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {verdictType} ({initiatives.length})
              </h2>
              <div className="space-y-3">
                {initiatives.map((initiative, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        <a href={`/rocks/${initiative.id}#verdict`} className="hover:underline">
                          {initiative.name}
                        </a>
                      </div>
                      <div className="text-sm text-gray-600">{initiative.execOwner}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatAmount(initiative.valueAtRiskUsd)}</div>
                      <div className="text-sm text-gray-600">{initiative.irreversibilityDays} days to irreversible</div>
                      <div className="text-xs text-gray-500 mt-1">{initiative.primaryFailureMechanism}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Page 5: Top Portfolio Risks */}
      <div className="mb-12 page-break-after">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Top Portfolio Risks & Mitigation Credibility</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Top 5 Risks</h2>

        <p className="text-sm text-gray-600 mb-6 italic">
          Enterprise risks that can invalidate multiple initiatives if mitigation fails.
        </p>

        <div className="space-y-4">
          {risks.map((risk: any, index: number) => (
            <div key={index} className={`exec-card ${risk.severity === 'CRITICAL' ? 'border-l-4 border-l-red-500' : ''}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 flex-1">{risk.title}</h3>
                <div className="text-right ml-4">
                  <div className={`font-semibold ${risk.severity === 'CRITICAL' ? 'text-red-600' : 'text-gray-900'}`}>
                    {risk.severity}
                  </div>
                  <div className={`text-sm mt-1 ${risk.mitigationStatus === 'STALLED' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {risk.mitigationStatus}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-3">{risk.failureConsequence}</div>
              <div className="text-xs text-gray-500 font-medium">Owner: {risk.ownerRole}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 6: How to Interpret This Pack */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">How to Interpret This Pack</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Verdict Meanings</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>CONTINUE AS-IS:</strong> Initiative is delivering value without executive intervention</li>
              <li><strong>INTERVENE & CORRECT:</strong> Initiative needs immediate action to restore viability</li>
              <li><strong>RE-SCOPE:</strong> Initiative needs strategic re-alignment within acceptable cost/time limits</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Evidence Framework</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Value Trajectory:</strong> Compares current performance to required success threshold over time</li>
              <li><strong>Recovery Cost Envelope:</strong> Shows investment range and probability of successful intervention</li>
              <li><strong>Irreversibility Timeline:</strong> Identifies point where failure becomes permanent</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Confidence Weighting</h2>
            <ul className="space-y-2 text-sm">
              <li>All assessments are confidence-weighted — progress without evidence scores lower</li>
              <li>Confidence reflects data freshness, completeness, and evidence coverage</li>
              <li>High confidence verdicts are based on verified data, not assumptions</li>
            </ul>
          </div>
        </div>

        {/* Appendix: Portfolio Analytics - Hidden in Print */}
        <div data-testid="exec-pack-appendix" className="print-hide mt-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Appendix: Portfolio Analytics</h1>

          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-6">
              Visual analysis of portfolio performance and risk distribution across all initiatives.
            </p>
          </div>

          {/* Budget Variance Chart */}
          <div data-testid="exec-pack-chart-budget" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Variance by Initiative</h2>
            <div className="chart-wrap">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={controlRoomData.initiatives
                      .sort((a: any, b: any) => Math.abs(b.budgetVariancePct) - Math.abs(a.budgetVariancePct))
                      .slice(0, 10)
                      .map((i: any) => ({
                        name: i.name.substring(0, 15) + (i.name.length > 15 ? '...' : ''),
                        variance: i.budgetVariancePct
                      }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={10}
                      stroke="#6b7280"
                    />
                    <YAxis
                      label={{ value: 'Variance %', angle: -90, position: 'insideLeft' }}
                      fontSize={10}
                      stroke="#6b7280"
                    />
                    <Tooltip
                      formatter={(value: number | undefined) => value ? [`${value > 0 ? '+' : ''}${value}%`, 'Variance'] : ['N/A', 'Variance']}
                      labelStyle={{ color: '#1f2937' }}
                    />
                    <Bar dataKey="variance" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Timeline Slip Chart */}
          <div data-testid="exec-pack-chart-timeline" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline Slip by Initiative</h2>
            <div className="chart-wrap">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={controlRoomData.initiatives
                      .sort((a: any, b: any) => b.timelineSlipDays - a.timelineSlipDays)
                      .slice(0, 10)
                      .map((i: any) => ({
                        name: i.name.substring(0, 15) + (i.name.length > 15 ? '...' : ''),
                        slip: i.timelineSlipDays
                      }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={10}
                      stroke="#6b7280"
                    />
                    <YAxis
                      label={{ value: 'Days Late', angle: -90, position: 'insideLeft' }}
                      fontSize={10}
                      stroke="#6b7280"
                    />
                    <Tooltip
                      formatter={(value: number | undefined) => value ? [`${value} days`, 'Slip'] : ['N/A', 'Slip']}
                      labelStyle={{ color: '#1f2937' }}
                    />
                    <Bar dataKey="slip" fill="#dc2626" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quality Distribution Chart */}
          <div data-testid="exec-pack-chart-quality" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quality Signal Distribution</h2>
            <div className="chart-wrap">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={controlRoomData.initiatives.reduce((acc: any[], initiative: any) => {
                        const existing = acc.find(item => item.signal === initiative.qualitySignal);
                        if (existing) {
                          existing.count += 1;
                        } else {
                          acc.push({
                            signal: initiative.qualitySignal,
                            count: 1
                          });
                        }
                        return acc;
                      }, [])}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="signal"
                        fontSize={10}
                        stroke="#6b7280"
                      />
                      <YAxis
                        label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                        fontSize={10}
                        stroke="#6b7280"
                      />
                      <Tooltip
                        formatter={(value: number | undefined) => value ? [value, 'Initiatives'] : ['N/A', 'Initiatives']}
                        labelStyle={{ color: '#1f2937' }}
                      />
                      <Bar dataKey="count" fill="#1e40af" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={controlRoomData.initiatives.reduce((acc: any[], initiative: any) => {
                          const existing = acc.find(item => item.verdict === initiative.verdict);
                          if (existing) {
                            existing.value += 1;
                          } else {
                            acc.push({
                              verdict: initiative.verdict,
                              value: 1
                            });
                          }
                          return acc;
                        }, [])}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {controlRoomData.initiatives.reduce((acc: any[], initiative: any) => {
                          const existing = acc.find(item => item.verdict === initiative.verdict);
                          if (existing) {
                            existing.value += 1;
                          } else {
                            acc.push({
                              verdict: initiative.verdict,
                              value: 1
                            });
                          }
                          return acc;
                        }, []).map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={['#1e40af', '#dc2626', '#d97706'][index % 3]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number | undefined) => value ? [value, 'Initiatives'] : ['N/A', 'Initiatives']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-600">Verdict Breakdown</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </PageShell>
  );
}

