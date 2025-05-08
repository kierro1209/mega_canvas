import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import axios from 'axios';

const LoginApp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use the new token endpoint for authentication
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://localhost:8001/token', formData);
      
      if (response.data.access_token) {
        // Store the token and hashed ID
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('hashedStudentId', response.data.hashed_student_id);
        
        // Set up axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        
        // Proceed with login
        await login(username);
        if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
        }
        navigate('/dashboard');
      }
    } catch (err: any) {
      // Handle specific error messages from the backend
      if (err.response?.data?.detail === "Account not found. Please register first.") {
        setError('Account not found. Please register first.');
      } else if (err.response?.data?.detail === "Incorrect student ID or password") {
        setError('Incorrect student ID or password');
      } else {
        setError('An error occurred during login. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple">Mega Canvas</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          <div className="bg-white rounded-lg border border-border shadow-sm p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-purple hover:text-purple-dark"
                      onClick={() => alert('Password reset functionality would go here')}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple pr-10"
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe}
                      onCheckedChange={() => setRememberMe(!rememberMe)}
                    />
                    <label 
                      htmlFor="remember-me" 
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className={cn(
                    "w-full bg-purple hover:bg-purple-dark text-white",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button 
                  className="text-purple hover:text-purple-dark font-medium"
                  onClick={() => alert('Registration functionality would go here')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mega Canvas. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Decorative right side */}
      <div className="hidden lg:block lg:w-1/2 bg-purple">
        <div className="flex items-center justify-center h-full p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">Welcome to Mega Canvas</h2>
            <p className="text-white/80 text-lg">
              Your centralized platform for academic success. Access all your assignments, schedule, and resources in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginApp;