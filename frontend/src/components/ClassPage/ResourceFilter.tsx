import { Button } from "@/components/ui/button";
import { ResourceTag } from "./ResourceTag";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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


export function ResourceFilter({
  selectedType,
  setSelectedType,
  selectedCourse,
  setSelectedCourse,
  courses,
}: ResourceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <div className="flex space-x-1">
        <Button
          variant={selectedType === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("all")}
          className="rounded-full"
        >
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium">View All</span>
        </Button>
        <Button
          variant={selectedType === "Assignment" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Assignment")}
          className="rounded-full"
        >
          <ResourceTag variant="type" value="Assignment" noBorder />
        </Button>
        <Button
          variant={selectedType === "Lecture" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Lecture")}
          className="rounded-full"
        >
          <ResourceTag variant="type" value="Lecture" noBorder />
        </Button>
        <Button
          variant={selectedType === "Reading" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Reading")}
          className="rounded-full"
        >
          <ResourceTag variant="type" value="Reading" noBorder />
        </Button>
        <Button
          variant={selectedType === "Slides" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Slides")}
          className="rounded-full"
        >
          <ResourceTag variant="type" value="Slides" noBorder />
        </Button>
        <Button
          variant={selectedType === "Exam" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Exam")}
          className="rounded-full"
        >
          <ResourceTag variant="type" value="Exam" noBorder />
        </Button>
      </div>
    </div>
  );
}
