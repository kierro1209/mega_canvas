import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";

const Assignments = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Assignments</h1>
            <p>Please implement assignment components here.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Assignments;