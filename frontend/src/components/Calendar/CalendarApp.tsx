import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AgendaView from './AgendaView';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 14));
  const [view, setView] = useState('Month');
  
  return (
    <div className="h-full">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-white border hover:bg-muted/20">
              Today
            </button>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-muted/20">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted/20">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-1 bg-muted/20 p-1 rounded-lg">
              <button className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'Day' ? 'bg-white shadow' : ''}`}>
                Day
              </button>
              <button className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'Week' ? 'bg-white shadow' : ''}`}>
                Week
              </button>
              <button className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'Month' ? 'bg-white shadow' : ''}`}>
                Month
              </button>
              <button className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'Agenda' ? 'bg-white shadow' : ''}`}>
                Agenda
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <MonthView currentDate={currentDate} events={[]} />
      </div>
    </div>
  );
};

export default CalendarApp;
