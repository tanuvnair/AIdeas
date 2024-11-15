// CSS
import "./App.css";

// ContextAPI's and routing
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import ProtectedRoute from "@/components/protected-route";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { LandingPage } from "@/components/pages/landing-page";
import { Login } from "@/components/pages/login";
import { SignUp } from "@/components/pages/sign-up";
import { Dashboard } from "@/components/pages/dashboard";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<LandingPage />} />

                        {/* Auth routes - redirects to dashboard if already logged it */}
                        <Route
                            element={
                                <ProtectedRoute
                                    requireAuth={false}
                                    redirectTo="/dashboard"
                                />
                            }
                        >
                            <Route path="/sign-in" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Route>

                        {/* Protected routes - require authentication */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
