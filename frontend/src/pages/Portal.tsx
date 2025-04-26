import React from 'react';
import AssignmentHeader from '@/components/SubmissionPortal/AssignmentHeader';
import FileUploadArea from '@/components/SubmissionPortal/FileUploadArea';
import ActionButtons from '@/components/SubmissionPortal/ActionButtons';
import { Sidebar } from '@/components/Sidebar';

const Portal = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="flex-1 w-full h-full">
        <AssignmentHeader />
        <div className="container px-4 py-8 mx-auto">
          <div className="flex gap-2 items-center mb-6 text-gray-700">
            <span className="flex justify-center items-center w-6 h-6 text-sm rounded-full border-2 border-current">?</span>
            <p className="text-lg">Upload all files for your submission</p>
          </div>
          <FileUploadArea />
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default Portal; 