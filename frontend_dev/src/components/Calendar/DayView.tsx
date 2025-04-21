import React from 'react';
import { format, isSameDay } from 'date-fns';
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

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onAssignmentClick: (assignmentId: string) => void;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, events, onAssignmentClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const dayEvents = events.filter(event => 
    isSameDay(new Date(event.date), currentDate)
  );

  const getEventPosition = (event: Event) => {
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
      };
    }
    
    // For assignments with due time
    if (event.dueTime) {
      const dueMinutes = getTimeInMinutes(event.dueTime);
      const top = (dueMinutes / 60) * 4;
      
      return {
        top: `${top}rem`,
        height: '2rem',
      };
    }
    
    // Default positioning if no specific time
    return {
      top: '1rem',
      height: '2rem',
    };
  };

  return (
    <div className="bg-white rounded-md border border-border overflow-hidden h-[calc(100vh-12rem)]">
      <div className="text-center py-3 font-medium border-b border-border">
        <div className="text-lg font-semibold">{format(currentDate, 'EEEE')}</div>
        <div className={cn(
          "w-10 h-10 mx-auto flex items-center justify-center rounded-full mt-1",
          isSameDay(currentDate, new Date()) && "bg-purple text-white"
        )}>
          {format(currentDate, 'd')}
        </div>
      </div>
      
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
            <div key={hour} className="h-16 border-b border-border"></div>
          ))}
          
          {/* Events */}
          {dayEvents.map(event => {
            const position = getEventPosition(event);
            
            return (
              <div
                key={event.id}
                className={cn(
                  "absolute left-4 right-4 rounded px-2 py-1 text-sm font-medium text-white overflow-hidden",
                  `bg-class-${event.classId}`
                )}
                style={{
                  top: position.top,
                  height: position.height
                }}
                onClick={() => onAssignmentClick(event.id.toString())}
              >
                <div className="font-semibold">{event.title}</div>
                {event.type === 'class' && event.startTime && event.endTime && (
                  <div className="text-xs opacity-90">{event.startTime} - {event.endTime}</div>
                )}
                {event.type === 'assignment' && event.dueTime && (
                  <div className="text-xs opacity-90">Due at {event.dueTime}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayView;
