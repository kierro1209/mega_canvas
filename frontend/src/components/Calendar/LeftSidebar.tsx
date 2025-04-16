
import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Percent, 
  Settings, 
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, isActive = false, isCollapsed }: SidebarItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-all",
        isActive ? "bg-purple text-white" : "hover:bg-muted"
      )}
    >
      <div className="text-xl">{icon}</div>
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
};

const LeftSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen flex flex-col border-r border-border bg-sidebar transition-all",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <span className="text-lg font-bold">EduHub</span>}
        {isCollapsed && <div className="mx-auto">
          <span className="text-lg font-bold text-purple">E</span>
        </div>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-full hover:bg-muted"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex-1 px-2 py-4 space-y-1">
        <SidebarItem icon={<BookOpen />} label="Classes" isCollapsed={isCollapsed} />
        <SidebarItem icon={<Calendar />} label="Calendar" isActive={true} isCollapsed={isCollapsed} />
        <SidebarItem icon={<Percent />} label="Grades" isCollapsed={isCollapsed} />
        <SidebarItem icon={<MessageSquare />} label="Messages" isCollapsed={isCollapsed} />
      </div>
      
      <div className="p-2 border-t border-border">
        <SidebarItem icon={<Settings />} label="Settings" isCollapsed={isCollapsed} />
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-md hover:bg-muted cursor-pointer">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
          {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
