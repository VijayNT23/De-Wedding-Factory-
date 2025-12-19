
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
