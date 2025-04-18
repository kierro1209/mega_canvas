import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import AssignmentView from './pages/AssignmentView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/assignments/:assignmentId',
    element: <AssignmentView />,
  },
]); 