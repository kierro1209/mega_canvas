import React from 'react';
import ClassList from './ClassList';
import UpcomingAssignments from './UpcomingAssignments';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
  return (
    <div className="h-full px-2">
      
      <div className="flex gap-6">
        {/* Left section - Class List */}
        <div className="flex-1">
          <DashboardHeader />
          <div className="flex-1">
            <ClassList />
          </div>
        </div>
        
        
        {/* Right section - Upcoming Assignments */}
        <div className="w-80">
          <UpcomingAssignments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;