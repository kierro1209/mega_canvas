
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import MiniCalendar from './MiniCalendar';
import { Checkbox } from '@/components/ui/checkbox';

const classCalendars = [
  { id: 1, name: 'Computer Science 101', color: 'class-1' },
  { id: 2, name: 'Mathematics for Engineers', color: 'class-2' },
  { id: 3, name: 'Introduction to Physics', color: 'class-3' },
  { id: 4, name: 'English Composition', color: 'class-4' },
];

const RightSidebar = () => {
  const [selectedCalendars, setSelectedCalendars] = useState<number[]>(
    classCalendars.map(cal => cal.id)
  );

  const toggleCalendar = (id: number) => {
    setSelectedCalendars(prev => 
      prev.includes(id) 
        ? prev.filter(calId => calId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="h-screen w-[300px] border-l border-border bg-white p-4 overflow-y-auto">
      <div className="mb-6">
        <MiniCalendar />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Calendars</h3>
          <button className="text-purple hover:text-purple-dark">
            <Plus size={20} />
          </button>
        </div>
        
        <div className="space-y-2">
          {classCalendars.map((cal) => (
            <div key={cal.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`calendar-${cal.id}`}
                checked={selectedCalendars.includes(cal.id)}
                onCheckedChange={() => toggleCalendar(cal.id)}
                className={`border-${cal.color} bg-${cal.color} text-white`}
              />
              <div className={`w-3 h-3 rounded-sm bg-${cal.color}`} />
              <label 
                htmlFor={`calendar-${cal.id}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {cal.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
