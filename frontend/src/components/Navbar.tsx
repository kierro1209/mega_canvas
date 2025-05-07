import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  label: string;
  path: string;
}

const NavItem = ({ label, path }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link to={path}>
      <div 
        className={cn(
          "px-4 py-2 rounded-md transition-all cursor-pointer",
          isActive ? "text-white bg-purple" : "hover:bg-muted"
        )}
      >
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Calendar", path: "/calendar" },
    { label: "Assignments", path: "/assignments" },
    { label: "Grades", path: "/grades" },
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
        <span className="text-lg font-bold mr-6">Station</span>
        
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2">
        {rightItems.map((item) => (
          <NavItem
            key={item.path}
            label={item.label}
            path={item.path}
          />
        ))}
        
        <div 
          className="px-4 py-2 rounded-md transition-all cursor-pointer text-red-500 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <span className="text-sm font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
} 