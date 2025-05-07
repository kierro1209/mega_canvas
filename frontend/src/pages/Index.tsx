import { Navbar } from '@/components/Navbar';
import Dashboard from '@/components/Home/DashboardApp';

const Index = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <main className="flex-1 overflow-hidden mt-16">
        <div className="h-full p-4">
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default Index;
