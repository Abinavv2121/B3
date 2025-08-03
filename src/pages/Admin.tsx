import { useState, useEffect } from "react";
import AdminAuth from "@/components/AdminAuth";
import AdminDashboard from "@/components/AdminDashboard";
import { isAdminAuthenticated, clearAdminSession, setAdminAuthenticated } from "@/lib/admin-utils";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsAuthenticated(false);
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