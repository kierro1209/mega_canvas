import React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const courses = [
  {
    id: 'math32b',
    name: 'MATH32B',
    title: 'Calculus With Multiple Variables',
    color: 'red-500'
  },
  {
    id: 'math33a',
    name: 'MATH33A',
    title: 'Linear Algebra and Applications',
    color: 'green-500'
  },
  {
    id: 'desma28',
    name: 'DESMA28',
    title: 'Interactivity',
    color: 'purple-500'
  }
];

interface AssignmentFilterProps {
  statusFilter: string | null;
  onStatusFilterChange: (status: string | null) => void;
  classFilter: string | null;
  onClassFilterChange: (classId: string | null) => void;
}

const AssignmentFilter: React.FC<AssignmentFilterProps> = ({
  statusFilter,
  onStatusFilterChange,
  classFilter,
  onClassFilterChange
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <button 
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-colors",
            statusFilter === null 
              ? "bg-purple text-white border-purple" 
              : "bg-white border-border hover:bg-gray-100"
          )}
          onClick={() => onStatusFilterChange(null)}
        >
          All
        </button>

        <button 
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-colors",
            statusFilter === 'SUBMITTED' 
              ? "bg-green-100 text-green-800 border-green-200" 
              : "bg-white border-border hover:bg-gray-100"
          )}
          onClick={() => onStatusFilterChange(statusFilter === 'SUBMITTED' ? null : 'SUBMITTED')}
        >
          Submitted
        </button>

        <button 
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-colors",
            statusFilter === 'NO SUBMISSION' 
              ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
              : "bg-white border-border hover:bg-gray-100"
          )}
          onClick={() => onStatusFilterChange(statusFilter === 'NO SUBMISSION' ? null : 'NO SUBMISSION')}
        >
          Upcoming
        </button>

        <button 
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-colors",
            statusFilter === 'OVERDUE' 
              ? "bg-red-100 text-red-800 border-red-200" 
              : "bg-white border-border hover:bg-gray-100"
          )}
          onClick={() => onStatusFilterChange(statusFilter === 'OVERDUE' ? null : 'OVERDUE')}
        >
          Overdue
        </button>

        <div>
          <Select
            value={classFilter || "all-classes"}
            onValueChange={(value) => onClassFilterChange(value === "all-classes" ? null : value)}
          >
            <SelectTrigger className="min-w-[180px] border-border text-sm bg-white">
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Classes</SelectLabel>
                <SelectItem value="all-classes">All Classes</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}: {course.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilter;