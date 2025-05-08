import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,  
  Send, 
  Percent, 
  Settings, 
  BookOpenText,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const SidebarItem = ({ icon, label, path }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link to={path}>
      <div 
        className={cn(
          "flex gap-3 items-center px-3 py-3 rounded-md transition-all cursor-pointer",
          isActive ? "text-white bg-purple" : "hover:bg-muted"
        )}
      >
        <div className="text-xl">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home />, label: "Home", path: "/class/home" },
    { icon: <BookOpenText />, label: "Resources", path: "/class/resources" },
    { icon: <Percent />, label: "Grades", path: "/class/grades" },
    { icon: <Send />, label: "Messages", path: "/class/messages" },
  ];

  const bottomItems = [
    { icon: <Settings />, label: "Settings", path: "/class/settings" },
  ];

  const handleSignOut = () => {
    // TODO: Implement sign out logic here
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full w-[240px] border-r border-border bg-sidebar">
      <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
      
      <div className="p-2 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
        
        <div 
          className="flex gap-3 items-center px-3 py-3 rounded-md transition-all cursor-pointer text-red-500 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <div className="text-xl"><LogOut /></div>
          <span className="text-sm font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
}