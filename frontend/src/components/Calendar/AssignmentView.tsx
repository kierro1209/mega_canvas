import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import StatusSummary from "./StatusSummary";
import AssignmentTable from "./AssignmentTable";
import { Assignment, StatusCount } from "@/types";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAssignments } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AssignmentView = () => {
  const { hashedStudentId, logout } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [statusCount, setStatusCount] = useState<StatusCount>({
    submitted: 0,
    comingUp: 0,
    overdue: 0
  });

  useEffect(() => {
    const loadData = async () => {
      if (!hashedStudentId) {
        navigate('/login');
        return;
      }

      try {
        const data = await fetchAssignments(hashedStudentId);
        setAssignments(data);
        
        const counts = {
          submitted: data.filter(a => a.status === "SUBMITTED").length,
          comingUp: data.filter(a => a.status === "NO SUBMISSION").length,
          overdue: data.filter(a => a.status === "OVERDUE").length
        };
        setStatusCount(counts);
      } catch (error) {
        console.error("Failed to load assignments:", error);
      }
    };

    loadData();
  }, [hashedStudentId, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex flex-col flex-1">
          <header className="flex justify-between items-center p-4 bg-white border-b">
            <div className="flex items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">Class 1</h1>
                <div className="mx-4 h-6 border-r border-gray-300"></div>
                <span className="text-gray-500">Spring 2025</span>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="flex gap-2 items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <UserCircle className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </header>
          
          <div className="flex-1 p-6">
            <StatusSummary counts={statusCount} />
            <div className="bg-white rounded-lg shadow-sm">
              <AssignmentTable assignments={assignments} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AssignmentView;
