
import React from 'react';
import LeftSidebar from '@/components/Calendar/LeftSidebar';
import RightSidebar from '@/components/Calendar/RightSidebar';
import CalendarApp from '@/components/Calendar/CalendarApp';

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftSidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-4">
          <CalendarApp />
        </div>
      </main>
      
      <RightSidebar />
    </div>
  );
};

export default Index;
