import { Sidebar } from '@/components/Sidebar';
import Dashboard from '@/components/Home/Dashboard';

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-4">
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default Index;
