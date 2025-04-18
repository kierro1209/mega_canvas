import React from 'react';
import { Button } from '@/components/ui/button';

const ActionButtons = () => {
  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button variant="outline">Cancel</Button>
      <Button>Submit Assignment</Button>
    </div>
  );
};

export default ActionButtons; 