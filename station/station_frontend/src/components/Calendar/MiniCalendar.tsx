
import React, { useState } from 'react';
import { 
  addMonths, 
  endOfMonth, 
  endOfWeek, 
  format, 
  isSameDay, 
  isSameMonth, 
  startOfMonth, 
  startOfWeek, 
  subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MiniCalendarProps {
  onDateSelect?: (date: Date) => void;
}

const MiniCalendar = ({ onDateSelect }: MiniCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const renderDays = () => {
    const dateFormat = 'EEEEE';
    const days = [];
    const startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-xs font-medium text-center text-muted-foreground">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            key={day.toString()}
            className={cn(
              "mini-calendar-day",
              !isSameMonth(day, monthStart) && "different-month",
              isSameDay(day, selectedDate) && "selected",
              isSameDay(day, new Date()) && "today"
            )}
            onClick={() => onDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="rounded-md border border-border p-3 bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{format(currentDate, 'MMMM yyyy')}</h3>
        <div className="flex space-x-1">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-muted">
            <ChevronLeft size={14} />
          </button>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-muted">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      
      {renderDays()}
      {renderCells()}
    </div>
  );
};

// Helper function to add days to a date
function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default MiniCalendar;
