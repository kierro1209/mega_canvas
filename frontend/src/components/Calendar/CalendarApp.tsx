import React, { useState } from 'react';
import { format, addDays, addWeeks, addMonths, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AgendaView from './AgendaView';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  
  const handlePrevious = () => {
    switch (view) {
      case 'Day':
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case 'Week':
        setCurrentDate(prev => addWeeks(prev, -1));
        break;
      case 'Month':
        setCurrentDate(prev => addMonths(prev, -1));
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'Day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'Week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'Month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
      default:
        break;
    }
  };

  const handleToday = () => {
    setCurrentDate(startOfDay(new Date()));
  };

  const renderView = () => {
    switch (view) {
      case 'Day':
        return <DayView currentDate={currentDate} events={[]} />;
      case 'Week':
        return <WeekView currentDate={currentDate} events={[]} />;
      case 'Month':
        return <MonthView currentDate={currentDate} events={[]} />;
      case 'Agenda':
        return <AgendaView events={[]} />;
      default:
        return <MonthView currentDate={currentDate} events={[]} />;
    }
  };

  return (
    <div className="h-full">
      <CalendarHeader
        currentDate={currentDate}
        onPrev={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        view={view}
        onViewChange={setView}
      />
      <div className="p-4">
        {renderView()}
      </div>
    </div>
  );
};

export default CalendarApp;
