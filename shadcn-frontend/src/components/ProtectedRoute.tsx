import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
