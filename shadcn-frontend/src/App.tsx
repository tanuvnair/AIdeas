// CSS
import "./App.css";

// ContextAPI's and routing
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { LandingPage } from "@/components/pages/LandingPage";
import { SignIn } from "@/components/pages/SignIn";
import { Dashboard } from "@/components/pages/Dashboard";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
