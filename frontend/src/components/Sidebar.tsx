import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Percent, 
  Settings, 
  User,
  BookOpenText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, path, isCollapsed }: SidebarItemProps) => {
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
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: <Home />, label: "Home", path: "/" },
    { icon: <Calendar />, label: "Calendar", path: "/calendar" },
    { icon: <BookOpenText />, label: "Assignments", path: "/assignments" },
    { icon: <Percent />, label: "Grades", path: "/grades" },
    { icon: <Send />, label: "Messages", path: "/messages" },
  ];

  const bottomItems = [
    { icon: <Settings />, label: "Settings", path: "/settings" },
    { icon: <User />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen border-r transition-all border-border bg-sidebar",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && <span className="text-lg font-bold">Station</span>}
        {isCollapsed && <div className="mx-auto">
          <span className="text-lg font-bold text-purple">S</span>
        </div>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-full hover:bg-muted"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      
      <div className="p-2 border-t border-border">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
}