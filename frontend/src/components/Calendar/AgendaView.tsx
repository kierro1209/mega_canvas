import React from 'react';
import { format, isSameDay, isToday, addDays, isFuture } from 'date-fns';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
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
  completed?: boolean;
}

interface AgendaViewProps {
  events: Event[];
  onAssignmentClick: (assignmentId: string) => void;
}

const AgendaView: React.FC<AgendaViewProps> = ({ events, onAssignmentClick }) => {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Group events by date
  const groupedEvents: Record<string, Event[]> = {};
  
  sortedEvents.forEach(event => {
    const dateKey = format(new Date(event.date), 'yyyy-MM-dd');
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = [];
    }
    groupedEvents[dateKey].push(event);
  });
  
  // Get date keys and sort them
  const dateKeys = Object.keys(groupedEvents).sort();
  
  // Filter to show only today and future events
  const filteredDateKeys = dateKeys.filter(dateKey => {
    const date = new Date(dateKey);
    return isToday(date) || isFuture(date);
  });

  return (
    <div className="bg-white rounded-md border border-border p-4 overflow-y-auto h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-bold mb-4">Upcoming Tasks & Classes</h2>
      
      {filteredDateKeys.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="mx-auto mb-2 h-10 w-10" />
          <p>No upcoming tasks or classes</p>
        </div>
      ) : (
        filteredDateKeys.map(dateKey => {
          const date = new Date(dateKey);
          const isCurrentDay = isToday(date);
          
          return (
            <div key={dateKey} className="mb-6">
              <div className={cn(
                "flex items-center mb-2 pb-1 border-b",
                isCurrentDay ? "border-purple" : "border-border"
              )}>
                <h3 className={cn(
                  "text-lg font-semibold",
                  isCurrentDay && "text-purple"
                )}>
                  {isCurrentDay ? 'Today' : format(date, 'EEEE, MMMM d')}
                </h3>
                {isCurrentDay && (
                  <span className="ml-2 text-sm bg-purple text-white px-2 py-0.5 rounded-full">
                    {format(date, 'MMM d')}
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {groupedEvents[dateKey].map(event => (
                  <div 
                    key={event.id}
                    className="flex items-center p-3 rounded-md border border-border hover:bg-muted/20 transition-colors"
                    onClick={() => onAssignmentClick(event.id.toString())}
                  >
                    <div className={cn(
                      "w-1 self-stretch rounded-full mr-3",
                      `bg-class-${event.classId}`
                    )} />
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{event.title}</h4>
                        {event.type === 'assignment' && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-purple/10 text-purple rounded-full">
                            Assignment
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mt-1">
                        {event.type === 'class' && event.startTime && event.endTime && (
                          <span>{event.startTime} - {event.endTime}</span>
                        )}
                        {event.type === 'assignment' && event.dueTime && (
                          <span>Due at {event.dueTime}</span>
                        )}
                      </div>
                    </div>
                    
                    {event.type === 'assignment' && (
                      <button className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center",
                        event.completed ? "text-purple" : "text-muted-foreground hover:text-purple"
                      )}>
                        <CheckCircle2 size={20} />
                      </button>
                    )}
                    
                    {event.type === 'class' && (
                      <button className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-purple hover:bg-muted">
                        <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AgendaView;
