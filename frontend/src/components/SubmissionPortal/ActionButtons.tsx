import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

const ActionButtons = () => {
  const navigate = useNavigate();
  const { isAdminMode } = useAdmin();

  return (
    <div className="flex gap-4 justify-end mt-6">
      {isAdminMode ? (
        <>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="destructive">Reject</Button>
          <Button variant="secondary">Request Revision</Button>
          <Button>Grade & Approve</Button>
        </>
      ) : (
        <>
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button>Submit Assignment</Button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;