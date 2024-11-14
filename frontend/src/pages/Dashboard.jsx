import axios from "axios";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/utility.js";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const toast = useRef(null);
    const [notes, setNotes] = useState([]);
    const [noteCreationDialog, setNoteCreationDialog] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editedNoteTitle, setEditedNoteTitle] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const navigate = useNavigate();

    const fetchNotes = async () => {
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

                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage,
                    life: 3000,
                });
            });
    };

    useEffect(() => {
        const initializeDashboard = async () => {
            if (!token) {
                navigate("/");
                return;
            }

            const isTokenValid = await verifyToken(token);
            if (isTokenValid) {
                fetchNotes();
            }
        };

        initializeDashboard();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("");
    };

    const handleCreateNote = async () => {
        setNoteCreationDialog(false);

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
                toast.current.show({
                    severity: "success",
                    summary: "Created note",
                    detail: "New note has been created",
                    life: 3000,
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

                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage,
                    life: 3000,
                });
            });

        await fetchNotes();
    };

    const noteCreationDialogHeader = (
        <div>
            <h1>Note name</h1>
            <InputText
                id="noteName"
                className="w-full"
                onChange={(e) => setNoteTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        handleCreateNote();
                    }
                }}
                autoFocus
            />
        </div>
    );

    const noteCreationDialogFooter = (
        <div>
            <Button label="Create Note" onClick={handleCreateNote} />
        </div>
    );

    const handleEditNote = async (note) => {
        if (editedNoteTitle !== note.noteTitle) {
            await axios
                .put(
                    `${import.meta.env.VITE_API_URL}/note/${note._id}`,
                    { noteTitle: editedNoteTitle },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then(() => {
                    toast.current.show({
                        severity: "success",
                        summary: "Updated note",
                        detail: "The note has been updated",
                        life: 3000,
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

                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errorMessage,
                        life: 3000,
                    });
                });
        }
        setEditingNoteId(null);
        await fetchNotes();
    };

    const handleDeleteNote = (note) => {
        const accept = async () => {
            await axios
                .delete(`${import.meta.env.VITE_API_URL}/note/${note._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    toast.current.show({
                        severity: "error",
                        summary: "Deleted note",
                        detail: `The note "${note.noteTitle}" has been deleted`,
                        life: 3000,
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

                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: errorMessage,
                        life: 3000,
                    });
                });

            await fetchNotes();
        };

        confirmDialog({
            message: "Do you want to delete this note?",
            header: "Delete Note",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept,
        });
    };

    return (
        <div className="px-8">
            <div className="flex justify-content-between align-items-center relative">
                <h1 className="text-7xl">AIdeas</h1>
                <Dropdown
                    options={[{ label: "Sign Out", value: "signout" }]}
                    onChange={(e) => e.value === "signout" && handleSignOut()}
                    className="absolute right-0 mt-2 w-48"
                    placeholder="Options"
                />
            </div>

            <hr />

            <h1 className="text-5xl mt-6">Your Notes</h1>

            <div className="flex flex-row flex-wrap">
                {notes.map((note, index) => (
                    <div
                        className="col-12 md:col-6 lg:col-4"
                        key={note.id || index}
                    >
                        <Card className="flex flex-auto justify-content-start relative">
                            {editingNoteId === note._id ? (
                                <InputText
                                    value={editedNoteTitle}
                                    onChange={(e) =>
                                        setEditedNoteTitle(e.target.value)
                                    }
                                    onBlur={() => handleEditNote(note)}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            handleEditNote(note);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <h1
                                    className="text-2xl font-medium cursor-pointer"
                                    onClick={() => {
                                        navigate(`/note/${note._id}`);
                                    }}
                                >
                                    {note.noteTitle}
                                </h1>
                            )}

                            <div className="flex gap-2 absolute bottom-0 right-0 mb-3 mr-3">
                                <Button
                                    icon="pi pi-pencil"
                                    onClick={() => {
                                        setEditingNoteId(note._id);
                                        setEditedNoteTitle(note.noteTitle);
                                    }}
                                    className="p-button-text"
                                />
                                <Button
                                    icon="pi pi-trash"
                                    onClick={() => handleDeleteNote(note)}
                                    className="p-button-text"
                                />
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <Button
                icon="pi pi-plus"
                className="absolute bottom-0 right-0 mb-6 mr-6 w-1 "
                onClick={() => setNoteCreationDialog(true)}
            />

            <Dialog
                visible={noteCreationDialog}
                modal
                header={noteCreationDialogHeader}
                footer={noteCreationDialogFooter}
                style={{ width: "50rem" }}
                onHide={() => {
                    if (!noteCreationDialog) return;
                    setNoteCreationDialog(false);
                }}
            />
            <ConfirmDialog />
            <Toast ref={toast} position="top-right" />
        </div>
    );
};

export default Dashboard;
