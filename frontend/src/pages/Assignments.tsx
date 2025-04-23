import { Sidebar } from '@/components/Sidebar';
import AssignmentsApp from '@/components/Assignments/AssignmentApp';

const Calendar = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-4">
          <AssignmentsApp />
        </div>
      </main>
    </div>
  );
};

export default Calendar;