"use client";

import { useState } from "react";

interface ScoringExplanationProps {
  children: React.ReactNode;
}

export default function ScoringExplanation({ children }: ScoringExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-help text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Scoring explanation"
      >
        ℹ️
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">How Scoring Works</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div>
                <div className="font-medium text-gray-900 mb-1">Health Score</div>
                <p>Confidence-weighted combination of KPI performance, risk exposure, action completion, and timeline adherence.</p>
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-1">Confidence</div>
                <p>Evidence coverage measuring data freshness, completeness, and reliability. Higher confidence increases health score impact.</p>
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-1">Roll-up Logic</div>
                <p>Portfolio health combines individual rock scores weighted by confidence. Decisions older than 10 days reduce readiness.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

