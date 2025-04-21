import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred.';
  let statusCode = '500';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || 'Page not found';
    statusCode = error.status.toString();
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">{statusCode}</h1>
        <p className="text-xl text-gray-600 mb-8">{errorMessage}</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-purple text-white rounded-md hover:bg-purple/90 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
