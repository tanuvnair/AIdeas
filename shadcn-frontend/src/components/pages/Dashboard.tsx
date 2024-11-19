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
import { FiMoon, FiSun } from "react-icons/fi";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface Note {
    _id: string;
    noteTitle: string;
    imageData: string;
    createdAt: string;
}

export const Dashboard = () => {
    const token = localStorage.getItem("token");
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();
    const [notes, setNotes] = useState<Note[]>([]);
    const [noteTitle, setNoteTitle] = useState("");
    const [currentNoteData, setCurrentNoteData] = useState<Note>();
    const [noteCreationDialog, setNoteCreationDialog] = useState(false);
    const [noteRenameDialog, setNoteRenameDialog] = useState(false);
    const [noteDeleteConfirmDialog, setNoteDeleteConfirmDialog] =
        useState(false);
    const navigate = useNavigate();

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
                    title: "Note created",
                    description: `The note "${noteTitle}" has been created successfully.`,
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
                    title: "Something went wrong!",
                    description: `${errorMessage}`,
                });
            });
    };

    const handleRenameNoteButton = (note: Note) => {
        setNoteRenameDialog(true);
        setCurrentNoteData(note);
    };

    const handleRenameNote = async (
        currentNoteData: Note,
        editedNoteTitle: string
    ) => {
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/note/${currentNoteData._id}`,
                { noteTitle: editedNoteTitle },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                toast({
                    title: "Note renamed",
                    description: `The note "${currentNoteData.noteTitle}" has been renamed to "${editedNoteTitle}" successfully.`,
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
                    title: "Something went wrong!",
                    description: `${errorMessage}`,
                });
            });
    };

    const handleDeleteNote = async (note: Note) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/note/${note._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                toast({
                    title: "Note deleted",
                    description: `The note "${note.noteTitle}" has been deleted successfully.`,
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
                    title: "Something went wrong!",
                    description: `${errorMessage}`,
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
                        {notes.map((note, index) => (
                            <ContextMenu key={index}>
                                <Card
                                    onClick={() =>
                                        navigate("/note/" + note._id)
                                    }
                                    className="cursor-pointer"
                                >
                                    <ContextMenuTrigger>
                                        <CardHeader>
                                            <CardTitle className="select-none">
                                                {note.noteTitle}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="aspect-square rounded-xl">
                                            <canvas
                                                id={`canvas-${note._id}`}
                                                className="w-full h-full border-2"
                                            ></canvas>
                                        </CardContent>
                                    </ContextMenuTrigger>
                                </Card>

                                <ContextMenuContent>
                                    <ContextMenuItem
                                        onClick={() =>
                                            handleRenameNoteButton(note)
                                        }
                                    >
                                        <FiEdit className="mr-2 text-lg" />
                                        Rename Note
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        onClick={() => {
                                            setNoteDeleteConfirmDialog(true);
                                            setCurrentNoteData(note);
                                        }}
                                    >
                                        <FiTrash2 className="mr-2 text-lg" />
                                        Delete Note
                                    </ContextMenuItem>
                                </ContextMenuContent>
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

                    <Dialog
                        open={noteRenameDialog}
                        onOpenChange={() => setNoteRenameDialog(false)}
                    >
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Rename your note</DialogTitle>
                                <DialogDescription>
                                    Give it a unique and descriptive name
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Input
                                        id="noteName"
                                        placeholder="Your new note name"
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
                                        onClick={() =>
                                            handleRenameNote(
                                                currentNoteData!,
                                                noteTitle
                                            )
                                        }
                                    >
                                        Rename note
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog
                        open={noteDeleteConfirmDialog}
                        onOpenChange={() => setNoteDeleteConfirmDialog(false)}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your note.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        handleDeleteNote(currentNoteData!)
                                    }
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
};
