import React from 'react';
import ExecutiveCard from './ExecutiveCard';

const controlRoomData = require('../../../data/demo/control_room.json');

export default function WhatChangedStrip() {
  const formatAmount = (usd: number) => {
    if (usd >= 1000000) {
      return `$${(usd / 1000000).toFixed(0)}M`;
    } else if (usd >= 1000) {
      return `$${(usd / 1000).toFixed(0)}K`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-default mb-6 tracking-tight">
        What Changed Since {formatDate(controlRoomData.previousAsOfDate)}
      </h2>
      <div className="space-y-3">
        {controlRoomData.whatChanged.map((change: any, index: number) => {
          const isNegative = change.type === 'DEGRADED' || change.type === 'NEW_RISK';
          return (
            <ExecutiveCard
              key={index}
              accent={isNegative ? 'danger' : 'neutral'}
              className="p-4"
            >
              <div className="flex items-start gap-3">
                <div className={`px-2 py-1 rounded-sm text-xs font-medium ${
                  change.type === 'IMPROVED' ? 'bg-success-bg text-success' :
                  change.type === 'DEGRADED' ? 'bg-danger-bg text-danger' :
                  'bg-warning-bg text-warning'
                }`}>
                  {change.type.replace('_', ' ')}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isNegative ? 'text-default' : 'text-muted'}`}>
                    {change.initiativeId ? (
                      <a href={`/rocks/${change.initiativeId}#rationale`} className="hover:underline">
                        {change.headline}
                      </a>
                    ) : (
                      change.headline
                    )}
                  </div>
                  {change.impactUsd && (
                    <div className="text-sm text-muted mt-1">
                      Impact: {formatAmount(change.impactUsd)}
                    </div>
                  )}
                  <div className="text-xs text-muted mt-1 leading-relaxed">
                    {change.note}
                  </div>
                  {change.initiativeId && (
                    <div className="text-xs text-primary mt-1">
                      Related: {change.initiativeId}
                    </div>
                  )}
                </div>
              </div>
            </ExecutiveCard>
          );
        })}
      </div>
    </div>
  );
}
