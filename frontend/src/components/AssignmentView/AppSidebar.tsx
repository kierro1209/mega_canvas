import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, List, Upload } from 'lucide-react';

const AppSidebar = () => {
  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h2 className="text-xl font-bold">Mega Canvas</h2>
      </div>
      <nav className="mt-4">
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Calendar
        </Link>
        <Link
          to="/assignments"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <List className="w-5 h-5 mr-2" />
          Assignments
        </Link>
        <Link
          to="/portal"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Upload className="w-5 h-5 mr-2" />
          Submission Portal
        </Link>
      </nav>
    </div>
  );
};

export default AppSidebar; 