import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft,
  Home, 
  ListTodo, 
  CalendarDays, 
  Percent, 
  FolderClosed, 
  Send, 
  CircleUser, 
  Settings 
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: <Home className="w-4 h-4" />, label: "Home", path: "/home" },
    { icon: <ListTodo className="w-4 h-4" />, label: "To-do", path: "/todo" },
    { icon: <CalendarDays className="w-4 h-4" />, label: "Calendar", path: "/calendar", isActive: true },
    { icon: <Percent className="w-4 h-4" />, label: "Grades", path: "/grades" },
    { icon: <FolderClosed className="w-4 h-4" />, label: "My Submissions", path: "/submissions" },
    { icon: <Send className="w-4 h-4" />, label: "Messages", path: "/messages" },
  ];

  const bottomItems = [
    { icon: <Settings className="w-4 h-4" />, label: "Settings", path: "/settings" },
    { icon: <CircleUser className="w-4 h-4" />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className={`flex flex-col h-full border-r bg-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center p-4 border-b">
        {!isCollapsed && <div className="text-xl font-semibold flex-1">Station</div>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-muted/20"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center ${!isCollapsed ? 'space-x-3' : ''} p-2 rounded-lg ${
              item.isActive 
                ? 'bg-accent text-accent-foreground' 
                : 'hover:bg-muted/20'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 space-y-2">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center ${!isCollapsed ? 'space-x-3' : ''} p-2 rounded-lg hover:bg-muted/20 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}