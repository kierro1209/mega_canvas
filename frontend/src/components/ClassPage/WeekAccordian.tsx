import { ResourceCard } from "./ResourceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <Accordion type="single" collapsible defaultValue={`week-${weekNumber}`} className="mb-6">
      <AccordionItem value={`week-${weekNumber}`}>
        <AccordionTrigger className="py-4 text-xl font-semibold">
          Week {weekNumber}
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
