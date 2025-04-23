import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import StatusSummary from "./StatusSummary";
import AssignmentTable from "./AssignmentTable";
import { Assignment, StatusCount } from "@/types";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8000";

const AssignmentView = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [statusCount, setStatusCount] = useState<StatusCount>({
    submitted: 0,
    comingUp: 0,
    overdue: 0
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // TODO: Replace with actual student ID from auth context
        const studentId = "your-student-id";
        const response = await fetch(`${API_BASE_URL}/todo_short?stu_id=${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const data = await response.json();
        setAssignments(data);
        
        // Calculate status counts
        const counts = {
          submitted: data.filter((a: Assignment) => a.status === "SUBMITTED").length,
          comingUp: data.filter((a: Assignment) => a.status === "NO SUBMISSION").length,
          overdue: data.filter((a: Assignment) => a.status === "OVERDUE").length
        };
        setStatusCount(counts);
      } catch (error) {
        console.error("Failed to load assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

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
              <button className="flex gap-2 items-center px-4 py-2 bg-gray-200 rounded">
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
