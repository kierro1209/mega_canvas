import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="text-xl font-semibold mb-8">Station</div>
      
      <nav className="space-y-4">
        <Link to="/classes" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20">
          <span>📚</span>
          <span>Classes</span>
        </Link>
        
        <Link to="/calendar" className="flex items-center space-x-3 p-2 rounded-lg bg-accent text-accent-foreground">
          <span>📅</span>
          <span>Calendar</span>
        </Link>
        
        <Link to="/grades" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20">
          <span>📊</span>
          <span>Grades</span>
        </Link>
        
        <Link to="/messages" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20">
          <span>💬</span>
          <span>Messages</span>
        </Link>
      </nav>
      
      <div className="mt-auto space-y-4">
        <Link to="/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20">
          <span>⚙️</span>
          <span>Settings</span>
        </Link>
        
        <Link to="/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20">
          <span>👤</span>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}