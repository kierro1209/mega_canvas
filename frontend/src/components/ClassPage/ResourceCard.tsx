import { Clock, CalendarDays, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Resource {
  id: string;
  type: string;
  title: string;
  dueDate?: string;
  releaseDate?: string;
  status?: string;
  course?: string;
  postedDate?: string;
  points?: number;
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const navigate = useNavigate();
  const getResourceTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      reading: "border-l-resource-reading",
      assignment: "border-l-resource-assignment",
      exam: "border-l-resource-exam",
      lecture: "border-l-resource-lecture",
      slides: "border-l-resource-slides",
    };
    
    return colors[type] || "border-l-gray-300";
  };
  
  return (
    <div
      className="relative mb-2 bg-white rounded-lg border cursor-pointer border-border hover:bg-muted"
      onClick={() => navigate(`/submit/${resource.id}`)}
    >
      <div className="flex">
        <div className={cn('w-2 self-stretch rounded-l-lg', getResourceTypeColor(resource.type).replace('border-l-', 'bg-'))}></div>
        <div className="flex-1 p-3">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap justify-between">
            <div className="flex gap-2 items-center min-w-0">
              <h3 className="text-base font-medium truncate">{resource.title}</h3>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center whitespace-nowrap">
                <div className={cn('w-2 h-2 rounded-full mr-1', getResourceTypeColor(resource.type).replace('border-l-', 'bg-'))}></div>
              </div>

            </div>
          </div>

          <div className="flex gap-3 items-center mt-1">
            {resource.postedDate && (
              <div className="flex items-center whitespace-nowrap">
                <Clock className="mr-1 w-3 h-3" />
                <span className="text-xs text-muted-foreground">
                  Posted: {format(parseISO(resource.postedDate), 'MMM d')}
                </span>
              </div>
            )}
            {resource.dueDate && (
              <div className="flex items-center whitespace-nowrap">
                <CalendarDays className="mr-1 w-3 h-3" />
                <span
                  className={
                    resource.status === 'OVERDUE'
                      ? 'text-xs text-red-600'
                      : 'text-xs text-muted-foreground'
                  }
                >
                  Due: {format(parseISO(resource.dueDate), 'MMM d')}
                </span>
                {resource.status === 'SUBMITTED' && (
                  <Check className="ml-1 w-4 h-4 text-green-600" />
                )}
              </div>
            )}
            {resource.points !== undefined && (
              <div className="flex items-center">
                <FileText className="mr-1 w-3 h-3" />
                <span className="text-xs text-muted-foreground">{resource.points} pts</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
