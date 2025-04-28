import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // User is not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // This is just a fallback that shouldn't be visible
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hostify</h1>
        <p className="text-xl text-gray-600">Loading your hostel management dashboard...</p>
      </div>
    </div>
  );
};

export default Index;