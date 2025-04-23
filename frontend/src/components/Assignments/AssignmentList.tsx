import React from 'react';
import { format, parseISO, isToday, isBefore, isAfter } from 'date-fns';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import AssignmentCard from './AssignmentCard';

interface ExtendedAssignment {
  id: string;
  name: string;
  className: string;
  classId?: string; // Optional field for direct matching with class IDs
  classColor: string;
  status: 'SUBMITTED' | 'OVERDUE' | 'NO SUBMISSION';
  dueDate: string;
  description?: string;
  pointsPossible?: number;
  pointsEarned?: number;
  tags: string[];
}

interface AssignmentListProps {
  searchQuery: string;
  statusFilter: string | null;
  classFilter: string | null;
  sortOrder: 'asc' | 'desc';
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  searchQuery,
  statusFilter,
  classFilter,
  sortOrder
}) => {
  // Sample class ID mapping for filtering
  const classIdToName: Record<string, string> = {
    'math32b': 'Mathematics',
    'math33a': 'Mathematics',
    'desma28': 'English Literature',
    'cs101': 'Computer Science'
  };

  const assignments: ExtendedAssignment[] = [
    {
      id: '1',
      name: 'Research Paper Outline',
      className: 'English Literature',
      classId: 'desma28',
      classColor: 'red-500',
      dueDate: '2025-04-30T23:59:00',
      status: 'NO SUBMISSION',
      description: 'Submit a detailed outline for your final research paper including thesis statement and supporting arguments.',
      pointsPossible: 20,
      tags: []
    },
    {
      id: '2',
      name: 'Algorithm Implementation',
      className: 'Computer Science',
      classId: 'cs101',
      classColor: 'green-500',
      dueDate: '2025-04-25T11:59:00',
      status: 'SUBMITTED',
      description: 'Implement the sorting algorithm discussed in class using the programming language of your choice.',
      pointsPossible: 50,
      pointsEarned: 47,
      tags: []
    },
    {
      id: '3',
      name: 'Midterm Exam',
      className: 'Mathematics',
      classId: 'math32b',
      classColor: 'purple-500',
      dueDate: '2025-04-22T10:00:00',
      status: 'OVERDUE',
      description: 'Comprehensive exam covering all material from weeks 1-8. Calculators permitted.',
      pointsPossible: 100,
      tags: []
    }
  ];

  const filteredAssignments = assignments
    .filter(assignment => 
      assignment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      assignment.className.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(assignment => 
      statusFilter === null || assignment.status === statusFilter
    )
    .filter(assignment =>
      classFilter === null || 
      assignment.classId === classFilter || 
      (classIdToName[classFilter || ''] === assignment.className)
    )
    .sort((a, b) => {
      const dateA = parseISO(a.dueDate);
      const dateB = parseISO(b.dueDate);
      return sortOrder === 'asc' 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    });

  const processedAssignments = filteredAssignments.map(assignment => {
    const date = parseISO(assignment.dueDate);
    
    return {
      ...assignment
    };
  });

  return (
    <div className="p-4">
      {filteredAssignments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No assignments found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-2">
          {processedAssignments.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;