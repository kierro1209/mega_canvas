import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Download, Upload, PenSquare } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GradesPage = () => {
  const { isAdminMode } = useAdmin();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  
  const mockStudentGrades = [
    { id: '1', course: 'MATH32B', assignment: 'Midterm Exam', dueDate: '2025-05-01', points: 85, totalPoints: 100, feedback: 'Good work!' },
    { id: '2', course: 'MATH32B', assignment: 'Homework 3', dueDate: '2025-04-15', points: 18, totalPoints: 20, feedback: 'Well done!' },
    { id: '3', course: 'MATH33A', assignment: 'Quiz 2', dueDate: '2025-04-22', points: 24, totalPoints: 25, feedback: 'Excellent!' },
    { id: '4', course: 'DESMA28', assignment: 'Project 1', dueDate: '2025-04-10', points: 92, totalPoints: 100, feedback: 'Creative work!' },
  ];

  const mockAdminGrades = [
    { id: '1', course: 'MATH32B', assignment: 'Midterm Exam', dueDate: '2025-05-01', submitted: 45, graded: 30, pending: 15 },
    { id: '2', course: 'MATH32B', assignment: 'Homework 3', dueDate: '2025-04-15', submitted: 50, graded: 50, pending: 0 },
    { id: '3', course: 'MATH33A', assignment: 'Quiz 2', dueDate: '2025-04-22', submitted: 48, graded: 35, pending: 13 },
    { id: '4', course: 'DESMA28', assignment: 'Project 1', dueDate: '2025-04-10', submitted: 40, graded: 40, pending: 0 },
  ];

  const filteredStudentGrades = selectedClass
    ? mockStudentGrades.filter((grade) => grade.course === selectedClass)
    : [];

  const filteredAdminGrades = selectedClass
    ? mockAdminGrades.filter((grade) => grade.course === selectedClass)
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{isAdminMode ? 'Grading Dashboard' : 'My Grades'}</h1>
          
          {isAdminMode ? (
            <div className="flex gap-2">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Import Grades
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Grades
              </Button>
            </div>
          ) : (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          )}
        </div>

        <div className="mb-6">
          <Select onValueChange={setSelectedClass}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="MATH32B">MATH32B</SelectItem>
              <SelectItem value="MATH33A">MATH33A</SelectItem>
              <SelectItem value="DESMA28">DESMA28</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isAdminMode ? (
          <div className="bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdminGrades.map((grade) => (
                  <tr key={grade.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{grade.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.assignment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.submitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.graded}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.pending}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button variant="ghost" size="sm">
                        <PenSquare className="h-4 w-4 mr-1" />
                        Grade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudentGrades.map((grade) => (
                  <tr key={grade.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{grade.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.assignment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.points}/{grade.totalPoints}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradesPage;