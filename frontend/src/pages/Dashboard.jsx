import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/utility.js";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/note`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
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
        navigate("/");
    };

    const handleCreateNote = () => {
        
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

            <div className="grid grid-cols-4 gap-4 mt-4 h-auto">
                {notes.map((note, index) => (
                    <Card
                        key={note.id || index}
                        className="flex flex-auto justify-content-start relative"
                    >
                        <h1 className="text-2xl font-medium cursor-pointer">
                            {note.noteTitle}
                        </h1>
                        <div className="flex gap-2 absolute bottom-0 right-0 mb-3 mr-3">
                            <Button
                                icon="pi pi-pencil"
                                onClick={() => console.log("EDIT")}
                                className="p-button-text"
                            />
                            <Button
                                icon="pi pi-trash"
                                onClick={() => console.log("DELETE")}
                                className="p-button-text"
                            />
                        </div>
                    </Card>
                ))}
            </div>

            <Button
                icon="pi pi-plus"
                className="absolute bottom-0 right-0 mb-6 mr-6 w-1 "
                onClick={handleCreateNote}
            />
        </div>
    );
};

export default Dashboard;
