import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';

// Sample assignment data - would normally come from API/context
const upcomingAssignments = [
  {
    id: '1',
    name: 'Laboratory Reflection #1',
    class: 'MATH32B',
    classId: 'math32b',
    dueDate: 'Mar 16 at 11:59PM'
  },
  {
    id: '2',
    name: 'Homework #4',
    class: 'MATH33A',
    classId: 'math33a',
    dueDate: 'Mar 20 at 11:59PM'
  },
  {
    id: '3',
    name: 'Groupwork Assignment',
    class: 'DESMA28',
    classId: 'desma28',
    dueDate: 'Apr 20 at 11:59PM'
  },
  {
    id: '4',
    name: 'Midterm Exam',
    class: 'MATH32B',
    classId: 'math32b',
    dueDate: 'Today at 11:59PM'
  }
];

const UpcomingAssignments = () => {
  return (
    <div className="bg-white rounded-lg border shadow-sm border-border">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Upcoming Assignments</h2>
        <Link to="/assignments" className="text-sm text-purple hover:underline">
          View All
        </Link>
      </div>
      
      <div className="p-2">
        {upcomingAssignments.length > 0 ? (
          <div className="divide-y divide-border">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="py-3 px-3 hover:bg-muted rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="font-medium truncate">{assignment.name}</h3>
                    <Link to={`/class/${assignment.classId}`} className="text-sm text-gray-500 hover:text-purple">
                      {assignment.class}
                    </Link>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                    <CalendarClock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{assignment.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No upcoming assignments</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAssignments; 