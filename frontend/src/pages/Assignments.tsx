import { Navbar } from '@/components/Navbar';
import AssignmentsApp from '@/components/Assignments/AssignmentApp';

const Assignments = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <main className="flex-1 overflow-hidden mt-16">
        <div className="h-full p-4">
          <AssignmentsApp />
        </div>
      </main>
    </div>
  );
};

export default Assignments;