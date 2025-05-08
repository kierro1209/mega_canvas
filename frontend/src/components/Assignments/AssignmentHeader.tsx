import React from 'react';
import { Search, SortAsc, SortDesc, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';

interface AssignmentHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (order: 'asc' | 'desc') => void;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({
  searchQuery,
  onSearch,
  sortOrder,
  onSortChange
}) => {
  const { isAdminMode } = useAdmin();

  return (
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold">Assignments</h1>
      
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assignments..."
            className="pl-10 pr-4 py-2 h-10 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className={cn(
            "p-2 h-10 w-10 rounded-md border border-border hover:bg-muted flex items-center justify-center",
            sortOrder !== 'asc' && "text-purple"
          )}
          title={sortOrder === 'asc' ? "Sort oldest to newest" : "Sort newest to oldest"}
        >
          {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
        </button>

        {isAdminMode && (
          <Button variant="outline" className="h-10">
            <Plus className="mr-2 h-4 w-4" />
            Add Assignment
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssignmentHeader;