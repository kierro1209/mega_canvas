import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AssignmentView/AppSidebar";
import StatusSummary from "@/components/AssignmentView/StatusSummary";
import AssignmentTable from "@/components/AssignmentView/AssignmentTable";
import { Assignment, StatusCount } from "@/types";
import { UserCircle } from "lucide-react";

// Sample data
const statusCount: StatusCount = {
  submitted: 4,
  comingUp: 2,
  overdue: 1
};

const assignments: Assignment[] = [
  {
    id: "1",
    name: "Laboratory Reflection #1",
    status: "OVERDUE",
    dueDate: "Mar 16 at 11:59PM",
    tags: ["Extra Credit", "Urgent", "+1"]
  },
  {
    id: "2",
    name: "Homework #4",
    status: "SUBMITTED",
    dueDate: "Mar 20 at 11:59PM",
    tags: ["Late Submission"]
  },
  {
    id: "3",
    name: "Groupwork Assignment",
    status: "NO SUBMISSION",
    dueDate: "Apr 20 at 11:59PM",
    tags: ["Group", "Due This Week"]
  },
  {
    id: "4",
    name: "Midterm Exam",
    status: "SUBMITTED",
    dueDate: "Mar 16 at 11:59PM",
    tags: ["Due Today"]
  },
  {
    id: "5",
    name: "Section 3 Quiz",
    status: "SUBMITTED",
    dueDate: "Mar 8 at 11:59PM",
    tags: ["Extra Credit"]
  },
  {
    id: "6",
    name: "Laboratory Reflection #2",
    status: "SUBMITTED",
    dueDate: "Mar 29 at 11:59PM",
    tags: ["Due This Week"]
  },
  {
    id: "7",
    name: "Syllabus Quiz",
    status: "NO SUBMISSION",
    dueDate: "Mar 30 at 11:59PM",
    tags: ["Extra Credit"]
  },
  {
    id: "8",
    name: "Final Exam",
    status: "NO SUBMISSION",
    dueDate: "Mar 30 at 11:59PM",
    tags: []
  }
];

const AssignmentView = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <AppSidebar />
        <main className="flex flex-col flex-1">
          <header className="flex justify-between items-center p-4 border-b bg-white">
            <div className="flex items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">Class 1</h1>
                <div className="mx-4 h-6 border-r border-gray-300"></div>
                <span className="text-gray-500">Spring 2025</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded">
                <UserCircle className="h-5 w-5" />
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