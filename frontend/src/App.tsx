import { BrowserRouter } from "react-router-dom";
import CalendarApp from './components/Calendar/CalendarApp';
import { Sidebar } from "./components/Sidebar";
import MiniCalendar from './components/Calendar/MiniCalendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background">
        {/* Left Sidebar */}
        <div className="w-64 border-r bg-white">
          <Sidebar />
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 bg-gray-50">
          <CalendarApp />
        </div>

        {/* Right Mini Calendar */}
        <div className="w-64 p-4 border-l bg-white">
          <div className="space-y-4">
            <MiniCalendar />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Calendars</h3>
                <button className="p-1 rounded-lg hover:bg-muted/20">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-accent focus:ring-accent" />
                  <span className="text-sm">Computer Science 101</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-accent focus:ring-accent" />
                  <span className="text-sm">Mathematics for Engineers</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-accent focus:ring-accent" />
                  <span className="text-sm">Introduction to Physics</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-accent focus:ring-accent" />
                  <span className="text-sm">English Composition</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
