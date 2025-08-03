// Admin authentication utilities

export const clearAdminSession = () => {
  localStorage.removeItem("admin_authenticated");
  localStorage.removeItem("admin_auth_timestamp");
};

export const isAdminAuthenticated = (): boolean => {
  const authStatus = localStorage.getItem("admin_authenticated");
  const authTimestamp = localStorage.getItem("admin_auth_timestamp");
  
  if (authStatus === "true" && authTimestamp) {
    // Check if the session is still valid (24 hours)
    const now = Date.now();
    const authTime = parseInt(authTimestamp);
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    if (now - authTime < sessionDuration) {
      return true;
    } else {
      // Session expired, clear storage
      clearAdminSession();
      return false;
    }
  }
  
  return false;
};

export const setAdminAuthenticated = () => {
  localStorage.setItem("admin_authenticated", "true");
  localStorage.setItem("admin_auth_timestamp", Date.now().toString());
}; 