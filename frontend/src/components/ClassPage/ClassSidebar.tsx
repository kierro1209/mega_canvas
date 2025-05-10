import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Home,  
  Percent, 
  Settings, 
  BookOpenText,
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
  const { classId } = useParams();

  const navItems = [
    { icon: <Home />, label: "Home", path: `/class/${classId}/home` },
    { icon: <BookOpenText />, label: "Resources", path: `/class/${classId}/resources` },
    { icon: <Percent />, label: "Grades", path: `/class/${classId}/grades` },
  ];

  const bottomItems = [
    { icon: <Settings />, label: "Settings", path: `/class/${classId}/settings` },
  ];

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
      </div>
    </div>
  );
}