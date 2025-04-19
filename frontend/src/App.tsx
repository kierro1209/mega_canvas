import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import Portal from './pages/Portal';
import ErrorPage from './pages/ErrorPage';
import Calendar from './pages/Calendar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/submit/:assignmentId',
    element: <Portal />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
