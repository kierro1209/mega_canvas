import React from 'react';
import { StatusCount } from '@/types';

interface StatusSummaryProps {
  counts: StatusCount;
}

const StatusSummary = ({ counts }: StatusSummaryProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500">Submitted</div>
        <div className="text-2xl font-bold text-green-600">{counts.submitted}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500">Coming Up</div>
        <div className="text-2xl font-bold text-yellow-600">{counts.comingUp}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500">Overdue</div>
        <div className="text-2xl font-bold text-red-600">{counts.overdue}</div>
      </div>
    </div>
  );
};

export default StatusSummary; 