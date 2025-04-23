import { Sidebar } from '@/components/Sidebar';
import DashboardApp from '@/components/Home/DashboardApp';

const Dashboard = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      
      <main className="overflow-hidden flex-1">
        <div className="p-4 h-full">
          <DashboardApp />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;