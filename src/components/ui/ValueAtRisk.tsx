import React from 'react';

interface ValueAtRiskProps {
  amount: number;
  showCascade?: boolean;
  cascadeAmount?: number;
  size?: 'sm' | 'md';
}

export default function ValueAtRisk({
  amount,
  showCascade = false,
  cascadeAmount = 0,
  size = 'sm'
}: ValueAtRiskProps) {
  const formatAmount = (usd: number) => {
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(1)}M`;
    } else if (usd >= 1000) {
      return `$${(usd / 1000).toFixed(0)}K`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className={`font-semibold text-[var(--text)] ${textSize}`}>
      {formatAmount(amount)} at risk
      {showCascade && cascadeAmount > 0 && (
        <span className="ml-2 text-xs text-[var(--danger)] font-normal">
          +{formatAmount(cascadeAmount)} cascade
        </span>
      )}
    </div>
  );
}
