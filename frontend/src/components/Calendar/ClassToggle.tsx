import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface Class {
  id: number;
  name: string;
  color: string;
}

interface ClassToggleProps {
  class: Class;
  isActive: boolean;
  onToggle: (id: number) => void;
}

const ClassToggle = ({ class: classItem, isActive, onToggle }: ClassToggleProps) => {
  return (
    <button
      onClick={() => onToggle(classItem.id)}
      className="flex items-center gap-3 w-full py-2 px-1 rounded-sm hover:bg-muted/10"
    >
      <div
        className={cn(
          "w-4 h-4 rounded transition-colors",
          isActive ? classItem.color : "bg-gray-200"
        )}
      />
      <span className="text-sm">{classItem.name}</span>
    </button>
  );
};

export default ClassToggle; 