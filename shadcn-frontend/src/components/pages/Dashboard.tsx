import axios from "axios";
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
import { FiMoon, FiSun } from "react-icons/fi"; // Added FiPlus for "Add Note" button icon
import { useTheme } from "../theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Note {
    _id: string;
    noteTitle: string;
    imageData: string;
    createdAt: string;
}

export const Dashboard = () => {
    const token = localStorage.getItem("token");
    const { theme, setTheme } = useTheme();
    const [noteTitle, setNoteTitle] = useState("");
    const { toast } = useToast();
    const [notes, setNotes] = useState<Note[]>([]);
    const [noteCreationDialog, setNoteCreationDialog] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const getNotes = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/note`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setNotes(response.data);
            })
            .catch((error) => {
                let errorMessage = "An error occurred.";

                if (error.response) {
                    errorMessage =
                        error.response.data.message ||
                        `Error: ${error.response.status}`;
                } else if (error.request) {
                    errorMessage =
                        "No response from the server. Please try again later.";
                } else {
                    errorMessage = error.message;
                }

                console.log(errorMessage);
            });
    };

    useEffect(() => {
        getNotes();
    }, [notes]);

    const handleCreateNoteButton = () => {
        setNoteCreationDialog(true);
    };

    const handleCreateNote = async () => {
        console.log("Creating note....");
        await axios
            .post(
                `${import.meta.env.VITE_API_URL}/note/`,
                {
                    noteTitle: noteTitle,
                    noteData: "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                toast({
                    title: "Note successfully created",
                });
            })
            .catch((error) => {
                let errorMessage = "An error occurred.";

                if (error.response) {
                    errorMessage =
                        error.response.data.message ||
                        `Error: ${error.response.status}`;
                } else if (error.request) {
                    errorMessage =
                        "No response from the server. Please try again later.";
                } else {
                    errorMessage = error.message;
                }

                toast({
                    variant: "destructive",
                    title: errorMessage,
                });
            });
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" onCreateNote={handleCreateNoteButton} />
            <SidebarInset>
                <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 justify-between">
                    {/* Left side - Sidebar Trigger and Breadcrumb */}
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Your Notes</BreadcrumbPage>
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
                        {notes.map((note, i) => (
                            <ContextMenu key={i}>
                                <Card>
                                    <ContextMenuTrigger>
                                        <CardHeader>
                                            <CardTitle>
                                                {note.noteTitle}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1"></CardContent>
                                    </ContextMenuTrigger>

                                    <ContextMenuContent>
                                        <ContextMenuItem>
                                            <FiEdit className="mr-2 text-lg" />
                                            Rename Note
                                        </ContextMenuItem>
                                        <ContextMenuItem>
                                            <FiTrash2 className="mr-2 text-lg" />
                                            Delete Note
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </Card>
                            </ContextMenu>
                        ))}
                    </div>
                    <Dialog
                        open={noteCreationDialog}
                        onOpenChange={() => setNoteCreationDialog(false)}
                    >
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Name your note</DialogTitle>
                                <DialogDescription>
                                    Give it a unique and descriptive name
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Input
                                        id="noteName"
                                        placeholder="Your note name"
                                        onChange={(e) => {
                                            setNoteTitle(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant={"default"}
                                        onClick={handleCreateNote}
                                    >
                                        Create Note
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
};
