import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import Portal from './pages/Portal';
import ErrorPage from './pages/ErrorPage';
import Calendar from './pages/Calendar';
import Assignments from './pages/Assignments';
import Login from './pages/Login';
import ClassPage from './pages/ClassPage';
import Grades from './pages/Grades';
import { AdminProvider } from './contexts/AdminContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/class/:classId/*',
    element: <ClassPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/assignments',
    element: <Assignments />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/submit/:assignmentId',
    element: <Portal />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/grades',
    element: <Grades />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
};

export default App;
