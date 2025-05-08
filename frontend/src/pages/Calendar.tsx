import { Navbar } from '@/components/Navbar';
import RightSidebar from '@/components/Calendar/RightSidebar';
import CalendarApp from '@/components/Calendar/CalendarApp';

const Calendar = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden mt-16">
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-4">
            <CalendarApp />
          </div>
        </main>
        
        <RightSidebar />
      </div>
    </div>
  );
};

export default Calendar;