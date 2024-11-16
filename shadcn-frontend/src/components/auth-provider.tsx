export interface User {
    id: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const clearError = () => setError(null);

    const handleError = (error: any) => {
        if (error.response) {
            setError(
                error.response.data.message || `Error: ${error.response.status}`
            );
        } else if (error.request) {
            setError("No response from the server. Please try again later.");
        } else {
            setError(error.message || "An unexpected error occurred");
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.post("/auth/verify-token");

                if (response.status === 200) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                localStorage.removeItem("token");
                handleError(error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.post("/auth/sign-in", {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            setIsAuthenticated(true);

            const userData = await api.post("/auth/verify-token");
            setUser(userData.data.user);

            navigate("/dashboard");
        } catch (error) {
            handleError(error);
            throw error; // Re-throw to handle in the UI
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                error,
                login,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
