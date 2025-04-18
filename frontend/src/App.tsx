import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import AssignmentView from './pages/AssignmentView';
import Portal from './pages/Portal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/assignments/:assignmentId',
    element: <AssignmentView />,
  },
  {
    path: '/submit/:assignmentId',
    element: <Portal />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
