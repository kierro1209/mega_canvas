import { Navbar } from '@/components/Navbar';
import DashboardApp from '@/components/Home/DashboardApp';

const Dashboard = () => {
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Navbar />
      
      <main className="overflow-hidden flex-1 mt-16">
        <div className="p-4 h-full">
          <DashboardApp />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;