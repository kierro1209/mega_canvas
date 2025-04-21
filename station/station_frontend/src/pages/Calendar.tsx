import { Sidebar } from '@/components/Sidebar';
import RightSidebar from '@/components/Calendar/RightSidebar';
import CalendarApp from '@/components/Calendar/CalendarApp';

const Calendar = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-4">
          <CalendarApp />
        </div>
      </main>
      
      <RightSidebar />
    </div>
  );
};

export default Calendar;