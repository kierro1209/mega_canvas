import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 justify-end mt-6">
      <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
      <Button>Submit Assignment</Button>
    </div>
  );
};

export default ActionButtons; 