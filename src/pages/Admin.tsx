import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuth from "@/components/AdminAuth";
import AdminDashboard from "@/components/AdminDashboard";
import { isAdminAuthenticated, clearAdminSession, setAdminAuthenticated } from "@/lib/admin-utils";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutPage, setShowLogoutPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    setIsAuthenticated(isAdminAuthenticated());
    setIsLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setAdminAuthenticated();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearAdminSession();
    setShowLogoutPage(true);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show logout confirmation page
  if (showLogoutPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative">
        {/* Return to Home button in top left corner */}
        <div className="absolute top-6 left-6 z-10">
          <Button 
            onClick={handleReturnHome}
            variant="outline"
            className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-slate-900 px-4 py-2"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
        
        {/* Main logout content centered */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <LogOut className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-white">Successfully Logged Out</h1>
              <p className="text-slate-300 text-lg max-w-md mx-auto">
                You have been successfully logged out of the admin dashboard. Thank you for your session.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setShowLogoutPage(false);
                  setIsAuthenticated(false);
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Login Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminAuth onAuthenticated={handleAuthenticated} />
      )}
    </>
  );
};

export default Admin;