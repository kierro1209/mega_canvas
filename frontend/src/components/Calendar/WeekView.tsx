import React from 'react';
import { 
  startOfWeek, 
  addDays, 
  format, 
  isSameDay,
  addHours,
  startOfDay,
  isBefore,
  isAfter,
  endOfWeek
} from 'date-fns';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  date: Date;  
  classId: number;
  type: 'class' | 'assignment';
  startTime?: string;
  endTime?: string;
  dueTime?: string;
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onAssignmentClick: (assignmentId: string) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, events, onAssignmentClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const renderWeekDays = () => {
    return (
      <div className="grid grid-cols-8 border-b border-border">
        <div className="h-12 border-r border-border"></div>
        {weekDays.map((day, i) => (
          <div 
            key={i}
            className={cn(
              "text-center py-3 font-medium",
              isSameDay(day, new Date()) && "bg-purple/10 text-purple-dark"
            )}
          >
            <div className="text-sm">{format(day, 'EEE')}</div>
            <div className={cn(
              "w-8 h-8 mx-auto flex items-center justify-center rounded-full mt-1",
              isSameDay(day, new Date()) && "bg-purple text-white"
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getEventPosition = (event: Event, dayIndex: number) => {
    // Parse time strings to determine position and height
    const getTimeInMinutes = (timeString: string) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    // For classes with start and end times
    if (event.startTime && event.endTime) {
      const startMinutes = getTimeInMinutes(event.startTime);
      const endMinutes = getTimeInMinutes(event.endTime);
      
      const top = (startMinutes / 60) * 4;
      const height = ((endMinutes - startMinutes) / 60) * 4;
      
      return {
        top: `${top}rem`,
        height: `${height}rem`,
        left: `${dayIndex * (100 / 7)}%`,
        width: `${100 / 7}%`
      };
    }
    
    // For assignments with due time
    if (event.dueTime) {
      const dueMinutes = getTimeInMinutes(event.dueTime);
      const top = (dueMinutes / 60) * 4;
      
      return {
        top: `${top}rem`,
        height: '2rem',
        left: `${dayIndex * (100 / 7)}%`,
        width: `${100 / 7}%`
      };
    }
    
    // Default positioning if no specific time
    return {
      top: '1rem',
      height: '2rem',
      left: `${dayIndex * (100 / 7)}%`,
      width: `${100 / 7}%`
    };
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  return (
    <div className="bg-white rounded-md border border-border overflow-hidden h-[calc(100vh-12rem)]">
      {renderWeekDays()}
      
      <div className="grid grid-cols-8 overflow-y-auto h-full">
        <div className="col-span-1">
          {hours.map((hour) => (
            <div key={hour} className="week-view-time h-16">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          ))}
        </div>
        
        <div className="col-span-7 relative">
          {/* Hour grid lines */}
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-7 h-16">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="week-view-cell"></div>
              ))}
            </div>
          ))}
          
          {/* Events */}
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            
            return dayEvents.map(event => {
              const position = getEventPosition(event, dayIndex);
              
              return (
                <div
                  key={event.id}
                  className={cn(
                    "week-view-event",
                    `bg-class-${event.classId}`
                  )}
                  style={{
                    top: position.top,
                    height: position.height,
                    left: position.left,
                    width: position.width
                  }}
                  onClick={() => onAssignmentClick(event.id.toString())}
                >
                  {event.title}
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
