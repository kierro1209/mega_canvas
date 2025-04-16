import { BrowserRouter } from "react-router-dom";
import CalendarApp from './components/Calendar/CalendarApp';
import { Sidebar } from "./components/Sidebar";
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
            <div className="text-sm font-medium">
              April 2025
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Calendars</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Computer Science 101</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Mathematics for Engineers</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Introduction to Physics</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
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
