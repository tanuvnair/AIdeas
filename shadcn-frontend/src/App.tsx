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
import { Note } from "@/components/pages/note";
import { NotFound } from "@/components/pages/not-found";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="*" element={<NotFound />} />

                        {/* Auth routes - redirects to dashboard if already logged it */}
                        <Route
                            element={
                                <ProtectedRoute
                                    requireAuth={false}
                                    redirectTo="/dashboard"
                                />
                            }
                        >
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Route>

                        {/* Protected routes - require authentication */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="note/:id" element={<Note />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
