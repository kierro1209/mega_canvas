import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

interface NavItemProps {
  label: string;
  path: string;
  hasDropdown?: boolean;
  onClick?: () => void;
}

interface Course {
  id: string;
  name: string;
  title: string;
}

const NavItem = ({ label, path, hasDropdown, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <div 
      className={cn(
        "relative px-4 py-2 rounded-md transition-all cursor-pointer flex items-center h-10",
        isActive ? "text-white bg-purple" : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <span className="text-sm font-medium">{label}</span>
      {hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
    </div>
  );
};

// Sample courses data - in a real app you would fetch this from an API
const courses: Course[] = [
  {
    id: 'math32b',
    name: 'MATH32B',
    title: 'Calculus With Multiple Variables'
  },
  {
    id: 'math33a',
    name: 'MATH33A',
    title: 'Linear Algebra and Applications'
  },
  {
    id: 'desma28',
    name: 'DESMA28',
    title: 'Interactivity'
  }
];

export function Navbar() {
  const navigate = useNavigate();
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowClassDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Calendar", path: "/calendar" },
    { label: "Assignments", path: "/assignments" },
    { label: "Gradebook", path: "/grades" },
    { label: "Messages", path: "/messages" },
  ];

  const rightItems = [
    { label: "Settings", path: "/settings" },
    { label: "Profile", path: "/profile" },
  ];

  const handleSignOut = () => {
    // TODO: Implement sign out logic here
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center h-16 px-4 border-b border-border bg-sidebar z-10">
      <div className="flex items-center">
        <Link to="/">
          <span className="text-lg font-bold mr-6 cursor-pointer hover:text-purple transition-colors flex items-center h-10">Station</span>
        </Link>
        
        <div className="flex space-x-2 items-center">
          <div ref={dropdownRef} className="relative">
            <NavItem
              label="Home"
              path="/"
              hasDropdown={true}
              onClick={() => setShowClassDropdown(!showClassDropdown)}
            />
            
            {showClassDropdown && (
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-border z-20">
                <Link to="/" className="block px-4 py-2 text-sm hover:bg-muted">Dashboard</Link>
                <div className="py-1 border-t border-border">
                  <div className="px-4 py-1 text-xs font-semibold text-gray-500">
                    My Classes
                  </div>
                  {courses.map((course) => (
                    <Link 
                      key={course.id} 
                      to={`/class/${course.id}`} 
                      className="block px-4 py-2 text-sm hover:bg-muted"
                    >
                      <div className="font-medium">{course.name}</div>
                      <div className="text-xs text-gray-500 truncate">{course.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <NavItem
                label={item.label}
                path={item.path}
              />
            </Link>
          ))}
          
          <div 
            className={cn(
              "px-4 py-2 rounded-md transition-all cursor-pointer text-white flex items-center h-10",
              isAdminMode ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            )}
            onClick={toggleAdminMode}
          >
            <span className="text-sm font-medium">{isAdminMode ? "Admin Mode: ON" : "Admin Mode: OFF"}</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 items-center">
        {rightItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <NavItem
              label={item.label}
              path={item.path}
            />
          </Link>
        ))}
        
        <div 
          className="px-4 py-2 rounded-md transition-all cursor-pointer text-red-500 hover:bg-red-50 flex items-center h-10"
          onClick={handleSignOut}
        >
          <span className="text-sm font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
}