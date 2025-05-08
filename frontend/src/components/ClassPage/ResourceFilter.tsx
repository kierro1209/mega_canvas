import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ResourceTag } from "./ResourceTag";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ResourceStatus = 'NO SUBMISSION' | 'SUBMITTED' | 'OVERDUE';
type ResourceType = 'Reading' | 'Assignment' | 'Exam' | 'Lecture' | 'Slides';

interface Course {
  id: string;
  name: string;
  title: string;
  color: string;
}

interface ResourceFilterProps {
  selectedStatus: ResourceStatus | "all";
  setSelectedStatus: (status: ResourceStatus | "all") => void;
  selectedType: ResourceType | "all";
  setSelectedType: (type: ResourceType | "all") => void;
  selectedCourse: string | "all";
  setSelectedCourse: (course: string | "all") => void;
  courses: Course[];
  onWeekFilterChange?: (weeks: number[]) => void;
}

export const courses: Course[] = [
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

export const Resources = [
  {
    id: "1",
    title: "Chapter 1 Template",
    type: "reading",
    course: "Introduction to Biology",
    postedDate: new Date("2025-04-20"),
    week: 1,
    fileUrl: "/files/chapter1_template.pdf",
  },
  {
    id: "2",
    title: "Lecture 01",
    type: "lecture",
    course: "Introduction to Biology",
    postedDate: new Date("2025-04-21"),
    week: 1,
    fileUrl: "/files/01_lec.pdf",
  },
  {
    id: "3",
    title: "Lecture 02",
    type: "lecture",
    course: "Introduction to Biology",
    postedDate: new Date("2025-04-22"),
    week: 1,
    fileUrl: "/files/02_lec.pdf",
  },
  {
    id: "4",
    title: "Homework 1",
    type: "assignment",
    status: "submitted",
    course: "Introduction to Biology",
    dueDate: new Date("2025-04-25"),
    postedDate: new Date("2025-04-22"),
    points: 15,
    week: 1,
    description: "Complete questions 1-10 from Chapter 1",
  },
  {
    id: "5",
    title: "Lecture 03",
    type: "lecture",
    course: "Introduction to Biology",
    postedDate: new Date("2025-04-23"),
    week: 1,
    fileUrl: "/files/03_lec.pdf",
  },
  {
    id: "6",
    title: "Homework 2",
    type: "assignment",
    status: "NOT SUBMITTED",
    course: "Introduction to Biology",
    dueDate: new Date("2025-04-28"),
    postedDate: new Date("2025-04-23"),
    points: 15,
    week: 1,
    description: "Complete the lab experiment and submit your findings",
  },
  {
    id: "7",
    title: "Midterm Study Guide",
    type: "slides",
    course: "Introduction to Biology",
    postedDate: new Date("2025-04-26"),
    week: 2,
    fileUrl: "/files/midterm_study_guide.pdf",
  },
  {
    id: "8",
    title: "Lecture 04",
    type: "lecture",
    course: "Introduction to Biology",
    postedDate: new Date("2025-04-28"),
    week: 2,
    fileUrl: "/files/04_lec.pdf",
  },
  {
    id: "9",
    title: "Midterm Exam",
    type: "exam",
    status: "OVERDUE",
    course: "Introduction to Biology",
    dueDate: new Date("2025-05-02"),
    postedDate: new Date("2025-04-20"),
    points: 100,
    week: 2,
    description: "Comprehensive exam covering weeks 1-2",
  },
  {
    id: "10",
    title: "Research Paper Outline",
    type: "assignment",
    status: "NOT SUBMITTED",
    course: "English Literature",
    dueDate: new Date("2025-05-05"),
    postedDate: new Date("2025-04-25"),
    points: 20,
    week: 2,
    description: "Submit a detailed outline for your research paper",
  },
  {
    id: "11",
    title: "Algorithm Implementation",
    type: "assignment",
    status: "SUBMITTED",
    course: "Computer Science",
    dueDate: new Date("2025-04-25"),
    postedDate: new Date("2025-04-18"),
    points: 50,
    week: 1,
    description: "Implement the sorting algorithm discussed in class",
  },
];

// Extract unique weeks from resources
const getAvailableWeeks = () => {
  const weeks = Resources.map(resource => resource.week);
  return [...new Set(weeks)].sort((a, b) => a - b);
};

// Define resource types
const resourceTypes: ResourceType[] = ['Reading', 'Assignment', 'Exam', 'Lecture', 'Slides'];

export function ResourceFilter({
  selectedType,
  setSelectedType,
  onWeekFilterChange,
}: ResourceFilterProps) {
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
  const [availableWeeks] = useState<number[]>(getAvailableWeeks());
  const [isWeekOpen, setIsWeekOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  
  // Update the parent component's filter when local filters change
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setSelectedType("all");
    } else if (selectedTypes.length === 1) {
      setSelectedType(selectedTypes[0]);
    } else {
      // When multiple types are selected, we still set the first one for compatibility
      // but the filtering logic will use the full array
      setSelectedType(selectedTypes[0]);
    }
  }, [selectedTypes, setSelectedType]);

  // Update parent component's week filter when local weeks change
  useEffect(() => {
    if (onWeekFilterChange) {
      onWeekFilterChange(selectedWeeks);
    }
  }, [selectedWeeks, onWeekFilterChange]);

  // Handle week selection
  const toggleWeek = (week: number) => {
    setSelectedWeeks(prevWeeks => 
      prevWeeks.includes(week)
        ? prevWeeks.filter(w => w !== week)
        : [...prevWeeks, week]
    );
  };

  // Handle type selection
  const toggleType = (type: ResourceType) => {
    setSelectedTypes(prevTypes => 
      prevTypes.includes(type)
        ? prevTypes.filter(t => t !== type)
        : [...prevTypes, type]
    );
  };

  // Clear all week filters
  const clearWeekFilters = () => {
    setSelectedWeeks([]);
  };

  // Clear all type filters
  const clearTypeFilters = () => {
    setSelectedTypes([]);
  };

  // Get display text for week dropdown button
  const getWeekButtonText = () => {
    if (selectedWeeks.length === 0) return "All Weeks";
    if (selectedWeeks.length === 1) return `Week ${selectedWeeks[0]}`;
    return `${selectedWeeks.length} Weeks Selected`;
  };

  // Get display text for type dropdown button
  const getTypeButtonText = () => {
    if (selectedTypes.length === 0) return "All Resource Types";
    if (selectedTypes.length === 1) return selectedTypes[0];
    return `${selectedTypes.length} Types Selected`;
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Week Filter Dropdown */}
      <div className="relative">
        <Popover open={isWeekOpen} onOpenChange={setIsWeekOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center justify-between gap-2 min-w-[180px]"
            >
              <span>{getWeekButtonText()}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-0 bg-white shadow-lg border border-border z-50" align="start">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Filter by Week</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearWeekFilters}
                  className="h-8 px-2 text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-2">
                {availableWeeks.map((week) => (
                  <div key={week} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`week-${week}`}
                      checked={selectedWeeks.includes(week)}
                      onCheckedChange={() => toggleWeek(week)}
                    />
                    <Label 
                      htmlFor={`week-${week}`}
                      className="text-sm cursor-pointer"
                    >
                      Week {week}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Resource Type Filter Dropdown */}
      <div className="relative">
        <Popover open={isTypeOpen} onOpenChange={setIsTypeOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center justify-between gap-2 min-w-[200px]"
            >
              <span>{getTypeButtonText()}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-0 bg-white shadow-lg border border-border z-50" align="start">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Filter by Type</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearTypeFilters}
                  className="h-8 px-2 text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-2">
                {resourceTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.toLowerCase()}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => toggleType(type)}
                    />
                    <Label 
                      htmlFor={`type-${type.toLowerCase()}`}
                      className="text-sm cursor-pointer flex items-center"
                    >
                      <ResourceTag variant="type" value={type} noBorder className="ml-1" />
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
