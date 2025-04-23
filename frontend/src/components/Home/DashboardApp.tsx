import React from 'react';
import DashboardHeader from './DashboardHeader';
import ClassList from './ClassList';

const Dashboard = () => {
  return (
    <div className="h-full">
      <DashboardHeader />
      <ClassList />
    </div>
  );
};

export default Dashboard;