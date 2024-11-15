import { FiSun, FiMoon } from "react-icons/fi";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const cardData = [
    {
        title: "Profile Overview",
        description: "Your recent account activity",
        content: (
            <p className="text-sm text-muted-foreground">No recent activity.</p>
        ),
    },
    {
        title: "Statistics",
        description: "Overview of usage stats",
        content: (
            <p className="text-sm text-muted-foreground">No data available.</p>
        ),
    },
    {
        title: "Settings",
        description: "Adjust your preferences",
        content: <Button variant="primary">Go to Settings</Button>,
    },
];

export const Dashboard = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <div className="flex flex-col min-h-screen w-full ">
                <header className="flex justify-between items-center p-8 ">
                    <SidebarTrigger />
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={toggleTheme}
                            className="p-2"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <FiSun size={24} />
                            ) : (
                                <FiMoon size={24} />
                            )}
                        </Button>
                        <Button variant="ghost" onClick={logout}>
                            Log out
                        </Button>
                    </div>
                </header>

                {/* Main content should take remaining space */}
                <main className="flex-grow p-6">
                    {/* Your main content goes here */}
                </main>
            </div>
        </SidebarProvider>
    );
};
