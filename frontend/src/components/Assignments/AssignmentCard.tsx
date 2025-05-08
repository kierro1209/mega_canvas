import React from 'react';
import { format, parseISO, isToday, isBefore } from 'date-fns';
import { Clock, FileText, Edit, Eye, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

interface ExtendedAssignment {
  id: string;
  name: string;
  className: string;
  classColor: string;
  status: 'SUBMITTED' | 'OVERDUE' | 'NO SUBMISSION';
  dueDate: string;
  description?: string;
  pointsPossible?: number;
  pointsEarned?: number;
}

interface AssignmentCardProps {
  assignment: ExtendedAssignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const navigate = useNavigate();
  const { isAdminMode } = useAdmin();
  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'red-500': 'bg-red-500',
      'green-500': 'bg-green-500',
      'blue-500': 'bg-blue-500',
      'purple-500': 'bg-purple-500',
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-green-100 text-green-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusLineColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-green-500';
      case 'OVERDUE':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getDueDateStatus = (dateString: string) => {
    const date = parseISO(dateString);
    if (isBefore(date, new Date()) && assignment.status !== 'SUBMITTED') {
      return 'text-red-600';
    } else if (isToday(date)) {
      return 'text-purple font-medium';
    }
    return 'text-gray-600';
  };

  return (
    <div className="relative bg-white rounded-lg border border-border hover:bg-muted" onClick={() => navigate(`/submit/${assignment.id}`)}>
      <div className="flex">
        <div className={cn('w-2 self-stretch rounded-l-lg', getColorClass(assignment.classColor))}></div>
        <div className="flex-1 p-3">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <h3 className="text-base font-medium truncate">{assignment.name}</h3>
            
            <div className="flex gap-2 items-center">
              <div className="flex items-center whitespace-nowrap">
                <div className={cn('w-2 h-2 rounded-full mr-1', getColorClass(assignment.classColor))}></div>
                <span className="text-xs text-gray-600">{assignment.className}</span>
              </div>
              
              <span
                className={cn(
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  getStatusClasses(assignment.status)
                )}
              >
                {assignment.status === 'NO SUBMISSION' ? 'UPCOMING' : assignment.status}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="flex items-center whitespace-nowrap">
              <Clock size={12} className="flex-shrink-0 mr-1" />
              <span className={getDueDateStatus(assignment.dueDate)}>
                {format(parseISO(assignment.dueDate), 'MMM d, h:mm a')}
              </span>
            </div>
            
            {assignment.pointsPossible && (
              <div className="flex items-center">
                <FileText size={12} className="flex-shrink-0 mr-1" />
                <span className="text-xs">
                  {assignment.pointsEarned !== undefined 
                    ? `${assignment.pointsEarned}/${assignment.pointsPossible}` 
                    : `${assignment.pointsPossible}pts`}
                </span>
              </div>
            )}
          </div>

          {isAdminMode && (
            <div className="flex gap-3 mt-3">
              <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline" onClick={() => navigate(`/edit/${assignment.id}`)}>
                <Edit size={12} /> Edit
              </button>
              <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline" onClick={() => navigate(`/view/${assignment.id}`)}>
                <Eye size={12} /> View
              </button>
              <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline" onClick={() => navigate(`/manage/${assignment.id}`)}>
                <Users size={12} /> Manage
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;