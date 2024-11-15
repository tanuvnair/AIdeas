import * as React from "react";
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
        <div className="flex flex-col min-h-screen p-6">
            <header className="flex justify-between items-center py-8 px-6 border-b">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <div className="flex items-center gap-4">
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

            <main className="grid gap-4 p-6 lg:grid-cols-3 md:grid-cols-2">
                {cardData.map((card, index) => (
                    <Card key={index} className="hover:shadow-lg">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>
                                {card.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>{card.content}</CardContent>
                    </Card>
                ))}
            </main>
        </div>
    );
};
