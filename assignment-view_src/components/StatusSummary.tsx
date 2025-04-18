
import React from "react";
import { StatusCount } from "@/types";

interface StatusSummaryProps {
  counts: StatusCount;
}

export function StatusSummary({ counts }: StatusSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Current Class Status</h2>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="h-4 w-4 rounded-full bg-green-400 mr-2"></div>
            <span className="text-2xl font-semibold">{counts.submitted}</span>
          </div>
          <span className="text-sm text-gray-600">SUBMITTED</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="h-4 w-4 rounded-full bg-orange-300 mr-2"></div>
            <span className="text-2xl font-semibold">{counts.comingUp}</span>
          </div>
          <span className="text-sm text-gray-600">COMING UP</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="h-4 w-4 rounded-full bg-red-400 mr-2"></div>
            <span className="text-2xl font-semibold">{counts.overdue}</span>
          </div>
          <span className="text-sm text-gray-600">OVERDUE</span>
        </div>
      </div>
    </div>
  );
}
