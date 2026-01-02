"use client";

import { useState } from "react";

interface HealthExplanationProps {
  children: React.ReactNode;
}

export default function HealthExplanation({ children }: HealthExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-help text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Health score explanation"
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
          <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">What is Health?</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div>
                <div className="font-medium text-gray-900 mb-1">Health is confidence-weighted</div>
                <p>Progress scores are adjusted by data quality and evidence completeness.</p>
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-1">Confidence reflects evidence coverage</div>
                <p>Higher confidence requires more data points and fresher information.</p>
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-1">Decisions and risks influence delivery</div>
                <p>Pending decisions and active risks reduce overall health and delivery likelihood.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

