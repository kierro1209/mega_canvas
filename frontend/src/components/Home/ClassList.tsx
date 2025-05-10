import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Course {
    id: string;
    name: string;
    title: string;
    term: string;
    color: string;
}

// Replace with database data
const courses: Course[] = [
    {
        id: 'math32b',
        name: 'MATH32B',
        title: 'Calculus With Multiple Variables',
        term: 'Spring 2025',
        color: 'red-500'
    },
    {
        id: 'math33a',
        name: 'MATH33A',
        title: 'Linear Algebra and Applications',
        term: 'Spring 2025',
        color: 'green-500'
    },
    {
        id: 'desma28',
        name: 'DESMA28',
        title: 'Interactivity',
        term: 'Spring 2025',
        color: 'purple-500'
    }
];

{/* Color Mapping */}
const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
        'red-500': 'bg-red-500',
        'green-500': 'bg-green-500',
        'blue-500': 'bg-blue-500',
        'purple-500': 'bg-purple-500',    };
    return colorMap[color] || 'bg-gray-500';
};

{/* Class Card Template */}
const ClassCard = ({ course }: { course: Course }) => {
    const navigate = useNavigate();
    const { isAdminMode } = useAdmin();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    // Close menu when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setShowMenu(false);
        }
      }
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
    const handleMenuToggle = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click event
      setShowMenu(!showMenu);
    };
    
    const handleMenuAction = (e: React.MouseEvent, action: string) => {
      e.stopPropagation(); // Prevent card click event
      setShowMenu(false);
      console.log(`${action} for ${course.name}`);
      // Future implementation of actions will go here
    };
    
    return (
      <div
        onClick={() => navigate(`/class/${course.id}`)}
        className="flex relative flex-col items-start p-4 space-y-2 w-64 bg-white rounded-lg border shadow-sm transition-shadow cursor-pointer border-border hover:bg-muted"
      >
        {isAdminMode && (
          <div className="absolute top-5 right-4.5 z-10" ref={menuRef}>
            <button 
              onClick={handleMenuToggle} 
              className="p-1 rounded-full focus:outline-none"
            >
              <MoreVertical size={20} className="text-white" />
            </button>
            
            {showMenu && (
              <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleMenuAction(e, "Class settings")}
                  >
                    Class settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleMenuAction(e, "Rename class")}
                  >
                    Rename class
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleMenuAction(e, "Manage people")}
                  >
                    Manage people
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className={cn('mb-3 w-full rounded-md h-36', getColorClass(course.color))}></div>
        <h2 className="w-full text-base font-semibold text-gray-900 truncate">{course.name}: <span className="font-normal text-gray-700">{course.title}</span></h2>
        <div className="text-xs font-medium text-gray-500">{course.term}</div>
      </div>
    );
};

const ClassList = () => {
    const { isAdminMode } = useAdmin();
    
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-start space-x-4 space-y-2">
                {/* Header */}
                <h1 className="text-xl font-bold">
                    Class List
                </h1>
                {/* Class Row */}
                <div className="flex flex-row space-x-2">
                    {courses.map(course => (
                        <ClassCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassList;