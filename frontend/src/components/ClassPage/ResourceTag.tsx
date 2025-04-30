import { cn } from "@/lib/utils";
type ResourceStatus = 'NO SUBMISSION' | 'SUBMITTED' | 'OVERDUE';
type ResourceType = 'reading' | 'assignment' | 'exam' | 'lecture' | 'slides';

interface TagProps {
  variant: "type" | "status";
  value: ResourceType | ResourceStatus;
  className?: string;
  noBorder?: boolean;
}

export function ResourceTag({ variant, value, className, noBorder }: TagProps) {
  const getTypeStyles = (type: ResourceType) => {
    const baseStyles = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
    const border = noBorder ? "" : "border";
    const styles: Record<ResourceType, string> = {
      reading: `bg-resource-reading/10 text-resource-reading ${border} border-resource-reading/30`,
      assignment: `bg-resource-assignment/10 text-resource-assignment ${border} border-resource-assignment/30`,
      exam: `bg-resource-exam/10 text-resource-exam ${border} border-resource-exam/30`,
      lecture: `bg-resource-lecture/10 text-resource-lecture ${border} border-resource-lecture/30`,
      slides: `bg-resource-slides/10 text-resource-slides ${border} border-resource-slides/30`,
    };
    return `${baseStyles} ${styles[type]}`;
  };
  
  const getStatusStyles = (status: ResourceStatus) => {
    const border = noBorder ? "" : "border";
    const baseStyles = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase";
    
    const styles: Record<ResourceStatus, string> = {
      'OVERDUE': "bg-status-overdue/10 text-status-overdue",
      'SUBMITTED': "bg-status-submitted/10 text-status-submitted",
      'NO SUBMISSION': "bg-status-upcoming/10 text-status-upcoming",

    };
    
    return `${baseStyles} ${styles[status]}`;
  };
  
  if (variant === "type") {
    return (
      <span className={cn(getTypeStyles(value as ResourceType), className)}>
        {getResourceTypeLabel(value as ResourceType)}
      </span>
    );
  }
  
  return (
    <span className={cn(getStatusStyles(value as ResourceStatus), className)}>
      {value}
    </span>
  );
}

function getResourceTypeLabel(type: ResourceType): string {
  const labels: Record<ResourceType, string> = {
    reading: "Reading",
    assignment: "Assignment",
    exam: "Exam",
    lecture: "Lecture Notes",
    slides: "Slides"
  };
  
  return labels[type];
}
