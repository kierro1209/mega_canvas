
import React, { useState } from "react";
import { Assignment } from "@/types";
import { 
  ArrowDownUp, 
  ArrowUp, 
  ArrowDown 
} from "lucide-react";

interface AssignmentTableProps {
  assignments: Assignment[];
}

type SortField = "name" | "status" | "dueDate" | "tags";
type SortDirection = "asc" | "desc" | "none";

export function AssignmentTable({ assignments }: AssignmentTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction
      const nextDirection = sortDirection === "asc" ? "desc" : 
                          sortDirection === "desc" ? "none" : "asc";
      setSortDirection(nextDirection);
      if (nextDirection === "none") {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowDownUp className="h-4 w-4 ml-1 text-gray-400" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4 ml-1" />;
    }
    if (sortDirection === "desc") {
      return <ArrowDown className="h-4 w-4 ml-1" />;
    }
    return <ArrowDownUp className="h-4 w-4 ml-1 text-gray-400" />;
  };
  
  const getSortedAssignments = () => {
    if (!sortField || sortDirection === "none") {
      return assignments;
    }
    
    return [...assignments].sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      if (sortField === "status") {
        return sortDirection === "asc" 
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      }
      if (sortField === "dueDate") {
        return sortDirection === "asc" 
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() 
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      if (sortField === "tags") {
        return sortDirection === "asc" 
          ? a.tags.join().localeCompare(b.tags.join()) 
          : b.tags.join().localeCompare(a.tags.join());
      }
      return 0;
    });
  };
  
  const getStatusBadge = (status: Assignment["status"]) => {
    if (status === "SUBMITTED") {
      return (
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-green-400 mr-2"></div>
          <span>SUBMITTED</span>
        </div>
      );
    }
    if (status === "OVERDUE") {
      return (
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-red-400 mr-2"></div>
          <span>OVERDUE</span>
        </div>
      );
    }
    if (status === "NO SUBMISSION") {
      return (
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-orange-300 mr-2"></div>
          <span>NO SUBMISSION</span>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full">
      <div className="border-b border-gray-300">
        <div className="grid grid-cols-4 py-3 font-medium text-gray-700">
          <button 
            className="text-left flex items-center pl-4"
            onClick={() => handleSort("name")}
          >
            Name {getSortIcon("name")}
          </button>
          <button 
            className="text-left flex items-center"
            onClick={() => handleSort("status")}
          >
            Status {getSortIcon("status")}
          </button>
          <button 
            className="text-left flex items-center"
            onClick={() => handleSort("dueDate")}
          >
            Due Date {getSortIcon("dueDate")}
          </button>
          <button 
            className="text-left flex items-center"
            onClick={() => handleSort("tags")}
          >
            Tags {getSortIcon("tags")}
          </button>
        </div>
      </div>
      <div>
        {getSortedAssignments().map((assignment) => (
          <div 
            key={assignment.id} 
            className="grid grid-cols-4 py-4 border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="pl-4">{assignment.name}</div>
            <div>{getStatusBadge(assignment.status)}</div>
            <div>{assignment.dueDate}</div>
            <div className="flex gap-2 flex-wrap">
              {assignment.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={`px-2 py-1 text-xs rounded ${
                    tag === "Extra Credit" ? "bg-gray-100" : 
                    tag === "Urgent" ? "bg-red-100" : 
                    tag === "Late Submission" ? "bg-blue-100" :
                    tag === "Group" ? "bg-green-100" :
                    tag === "Due Today" ? "bg-purple-100" :
                    tag === "Due This Week" ? "bg-yellow-100" :
                    "bg-gray-100"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
