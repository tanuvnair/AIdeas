import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { Progress } from "@/components/ui/progress";

interface ProtectedRouteProps {
    requireAuth?: boolean;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requireAuth = true,
    redirectTo = "/login",
}) => {
    const { isAuthenticated, isLoading } = useAuth(); // Assume loading is part of useAuth
    const [progress, setProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isLoading) {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress < 100) {
                        return prevProgress + 10;
                    }
                    clearInterval(interval!);
                    return 100;
                });
            }, 500);
        } else {
            setProgress(100);
            if (interval) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto gap-4">
                <Progress value={progress} />
                <h1 className="text-xl text-muted-foreground">Loading</h1>
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
