import React, { useState } from 'react';
import { format, addDays, addWeeks, addMonths, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { useNavigate } from 'react-router-dom';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AssignmentTable from './AssignmentTable';
import StatusSummary from './StatusSummary';

const CalendarApp = () => {
  const navigate = useNavigate();
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

  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/assignments/${assignmentId}`);
  };

  const renderView = () => {
    switch (view) {
      case 'Day':
        return <DayView currentDate={currentDate} events={[]} onAssignmentClick={handleAssignmentClick} />;
      case 'Week':
        return <WeekView currentDate={currentDate} events={[]} onAssignmentClick={handleAssignmentClick} />;
      case 'Month':
        return <MonthView currentDate={currentDate} events={[]} onAssignmentClick={handleAssignmentClick} />;
      case 'Agenda':
        return (
          <div className="space-y-4">
            <StatusSummary counts={{ submitted: 0, comingUp: 0, overdue: 0 }} />
            <AssignmentTable assignments={[]} />
          </div>
        );
      default:
        return <MonthView currentDate={currentDate} events={[]} onAssignmentClick={handleAssignmentClick} />;
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
