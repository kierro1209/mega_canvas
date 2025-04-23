import React, { useState } from 'react';
import AssignmentHeader from './AssignmentHeader';
import AssignmentList from './AssignmentList';
import AssignmentFilter from './AssignmentFilter';
import StatusSummary from '../Calendar/StatusSummary';
import { StatusCount } from '@/types';

const AssignmentApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const statusCount: StatusCount = {
    submitted: 1,
    comingUp: 1,
    overdue: 1
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleClassFilter = (classId: string | null) => {
    setClassFilter(classId);
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <AssignmentHeader 
        searchQuery={searchQuery}
        onSearch={handleSearch}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      
      <div className="flex-1 overflow-auto">
        <StatusSummary counts={statusCount} />
        
        <div className="bg-white rounded-lg border border-border shadow-sm">
          <div className="p-4 border-b border-border">
            <AssignmentFilter 
              statusFilter={statusFilter}
              onStatusFilterChange={handleStatusFilter}
              classFilter={classFilter}
              onClassFilterChange={handleClassFilter}
            />
          </div>
          
          <AssignmentList 
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            classFilter={classFilter}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentApp;