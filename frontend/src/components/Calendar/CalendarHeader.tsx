import { 
  ChevronLeft, 
  ChevronRight, 
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const viewOptions = ['Day', 'Week', 'Month', 'Agenda'];

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  view: string;
  onViewChange: (view: string) => void;
}

const CalendarHeader = ({
  currentDate,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange
}: CalendarHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4 px-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">
          {format(currentDate, 
            view === 'Day' ? 'MMMM d, yyyy' :
            view === 'Week' ? "'Week of' MMM d, yyyy" : 
            'MMMM yyyy'
          )}
        </h1>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrev}
            className="calendar-nav-button"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNext}
            className="calendar-nav-button"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToday}
          className="text-sm"
        >
          Today
        </Button>
        
        <div className="flex rounded-md overflow-hidden border border-border">
          {viewOptions.map((option) => (
            <button
              key={option}
              onClick={() => onViewChange(option)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium",
                view === option 
                  ? "bg-purple text-white" 
                  : "bg-white hover:bg-muted"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
