import { Clock, CalendarDays, FileText } from 'lucide-react';
import { Card } from '../ui/card';
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

import { Link } from "react-router-dom";

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
    <Link to={`/submit/${resource.id}`}>
      <Card className={`mb-4 border-l-4 ${getResourceTypeColor(resource.type)} hover:bg-muted`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2 items-center">
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            {resource.status && <Badge variant="outline">{resource.status}</Badge>}
          </div>
          
          <div className="mb-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{resource.course}</span>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
            {resource.dueDate && (
              <div className="flex gap-1 items-center">
                <CalendarDays className="w-3 h-3" />
                <span>Due: {format(parseISO(resource.dueDate), 'MMM d, yyyy')}</span>
              </div>
            )}
            {resource.postedDate && (
              <div className="flex gap-1 items-center">
                <Clock className="w-3 h-3" />
                <span>Posted: {format(parseISO(resource.postedDate), 'MMM d, yyyy')}</span>
              </div>
            )}
            {resource.points !== undefined && (
              <div className="flex gap-1 items-center">
                <FileText className="w-3 h-3" />
                <span>{resource.points} pts</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
