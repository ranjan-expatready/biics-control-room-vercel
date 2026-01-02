import React from 'react';

interface EvidenceMetrics {
  budgetApprovedUsd: number;
  budgetForecastUsd: number;
  budgetVariancePct: number;
  timelineSlipDays: number;
  qualitySignal: 'STABLE' | 'DEGRADING' | 'CRITICAL';
  valueConfidence: number;
}

interface EvidenceStripProps {
  metrics: EvidenceMetrics;
  compact?: boolean;
}

export default function EvidenceStrip({ metrics, compact = false }: EvidenceStripProps) {
  const formatAmount = (usd: number) => {
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(1)}M`;
    } else if (usd >= 1000) {
      return `$${(usd / 1000).toFixed(0)}K`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const isCritical = metrics.budgetVariancePct >= 20 ||
                    metrics.timelineSlipDays >= 30 ||
                    metrics.qualitySignal === 'CRITICAL';

  const textSize = compact ? 'text-xs' : 'text-sm';
  const containerClass = isCritical
    ? 'flex gap-4 p-2 rounded-sm border border-danger bg-danger-bg'
    : 'flex gap-4 p-2';

  return (
    <div className={containerClass}>
      <div className="flex-1">
        <div className={`text-muted ${textSize} font-medium`}>Budget</div>
        <div className={`text-default ${textSize}`}>
          {formatAmount(metrics.budgetApprovedUsd)} → {formatAmount(metrics.budgetForecastUsd)}
          {metrics.budgetVariancePct > 0 && (
            <span className="text-danger ml-1">({metrics.budgetVariancePct}% over)</span>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className={`text-muted ${textSize} font-medium`}>Timeline</div>
        <div className={`text-default ${textSize}`}>
          {metrics.timelineSlipDays === 0 ? 'On track' :
           metrics.timelineSlipDays > 0 ? `${metrics.timelineSlipDays} days slip` :
           `${Math.abs(metrics.timelineSlipDays)} days ahead`}
        </div>
      </div>

      <div className="flex-1">
        <div className={`text-muted ${textSize} font-medium`}>Quality</div>
        <div className={`text-default ${textSize} ${
          metrics.qualitySignal === 'CRITICAL' ? 'text-danger' :
          metrics.qualitySignal === 'DEGRADING' ? 'text-warning' :
          ''
        }`}>
          {metrics.qualitySignal}
        </div>
      </div>

      <div className="flex-1">
        <div className={`text-muted ${textSize} font-medium`}>Value Conf.</div>
        <div className={`text-default ${textSize}`}>{metrics.valueConfidence}%</div>
      </div>
    </div>
  );
}
