import { ResourceCard } from "./ResourceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAdmin } from "@/contexts/AdminContext";
import { Plus } from "lucide-react";

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
  week: number;
}

interface WeekAccordionProps {
  weekNumber: number;
  resources: Resource[];
}

export function WeekAccordion({ weekNumber, resources }: WeekAccordionProps) {
  const { isAdminMode } = useAdmin();
  
  return (
    <Accordion type="single" collapsible defaultValue={`week-${weekNumber}`} className="mb-6">
      <AccordionItem value={`week-${weekNumber}`}>
        <AccordionTrigger className="py-4 text-xl font-semibold">
          <div className="flex justify-between w-full items-center pr-4">
            <span>Week {weekNumber}</span>
            {isAdminMode && (
              <button 
                className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Add resource to Week ${weekNumber}`);
                }}
              >
                <Plus className="h-4 w-4" />
                Add to Week
              </button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
