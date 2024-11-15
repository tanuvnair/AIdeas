import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../theme-provider";

export const Dashboard = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"; // Toggle theme
        setTheme(newTheme);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 justify-between">
                    {/* Left side - Sidebar Trigger and Breadcrumb */}
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        October 2024
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Right side - Theme toggle button */}
                    <Button
                        onClick={toggleTheme}
                        className="p-3 rounded-full flex items-center justify-center"
                        variant={"outline"}
                    >
                        {theme === "dark" ? (
                            <FiSun size={24} />
                        ) : (
                            <FiMoon size={24} />
                        )}
                    </Button>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-xl bg-muted/50"
                            />
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
