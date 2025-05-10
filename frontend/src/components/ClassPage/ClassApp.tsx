import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Sidebar } from './ClassSidebar';
import ClassHome from './ClassHome';
import ClassResources from './ClassResources';
import ClassGrades from './ClassGrades';
import ClassSettings from './ClassSettings';

export function ClassApp() {
  const { classId } = useParams();

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="home" element={<ClassHome />} />
          <Route path="resources" element={<ClassResources />} />
          <Route path="grades" element={<ClassGrades />} />
          <Route path="settings" element={<ClassSettings />} />
          <Route path="" element={<Navigate to={`/class/${classId}/home`} />} />
          <Route path="*" element={<Navigate to={`/class/${classId}/home`} />} />
        </Routes>
      </div>
    </div>
  );
}

export default ClassApp;