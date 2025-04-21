import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  format, 
  isSameMonth, 
  isSameDay,
  eachDayOfInterval,
  isToday
} from 'date-fns';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  date: Date;
  classId: number;
  type: 'class' | 'assignment';
  dueTime?: string;
}

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onAssignmentClick: (assignmentId: string) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, events, onAssignmentClick }) => {
  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div 
          key={i} 
          className="text-center py-2 font-medium text-sm"
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const dayEvents = events.filter(event => 
          isSameDay(day, new Date(event.date))
        );
        
        days.push(
          <div
            key={day.toString()}
            className={cn(
              "calendar-cell",
              !isSameMonth(day, monthStart) && "different-month",
              isSameDay(day, new Date()) && "today"
            )}
          >
            <div className="flex justify-between">
              <span className={cn(
                "text-sm font-medium",
                !isSameMonth(day, monthStart) && "text-muted-foreground"
              )}>
                {formattedDate}
              </span>
              {dayEvents.length > 3 && (
                <span className="text-xs text-purple font-medium">
                  {dayEvents.length} events
                </span>
              )}
            </div>
            
            <div className="mt-1">
              {dayEvents.slice(0, 3).map(event => (
                <div 
                  key={event.id} 
                  className={cn(
                    "calendar-event",
                    `bg-class-${event.classId}`,
                    isToday(day) && "today"
                  )}
                  onClick={() => onAssignmentClick(event.id.toString())}
                >
                  {event.type === 'assignment' && event.dueTime && (
                    <span className="mr-1">{event.dueTime}</span>
                  )}
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-muted-foreground mt-1">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="overflow-y-auto">{rows}</div>;
  };

  return (
    <div className="bg-white rounded-md border border-border overflow-hidden">
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default MonthView;
