import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
    PlusIcon,
    UserCircleIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle the dropdown
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem("token");
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
            }
        };

        fetchNotes();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="bg-background-50 h-screen rounded-none px-8 py-4">
            <div className="flex justify-between items-center align-middle relative">
                <h1 className="text-accent-500 text-5xl font-bold">AIdeas</h1>
                <div className="relative">
                    <UserCircleIcon
                        className=" text-primary-500  hover:text-primary-600 w-16 cursor-pointer transition-all duration-200"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 bg-secondary-200   hover:bg-secondary-300 transition-all duration-200 ">
                            <ul className="py-1">
                                <li
                                    className="block  px-4 py-2 text-text-950 cursor-pointer"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <hr className="h-1 w-1/6 my-8 bg-gray-800 border-0" />

            <h1 className="text-text-950 text-3xl font-semibold mt-8">
                Your Notes
            </h1>

            <div className="grid grid-cols-4 gap-4 mt-4 cursor-pointer h-auto">
                {notes.map((note, index) => (
                    <div
                        key={note.id || index}
                        className="bg-secondary-100 text-text-950 p-5 rounded-md flex items-center justify-between flex-wrap gap-6"
                        onClick={() => console.log("NAVIGATE TO NOTE USING")}
                    >
                        <h1 className="text-xl font-medium">
                            {note.noteTitle}
                        </h1>
                        <div className="flex gap-4 text-primary-500">
                            <PencilIcon
                                onClick={() => console.log("EDIT")}
                                className="w-6 transition-all duration-200 hover:text-primary-700"
                            />
                            <TrashIcon
                                onClick={() => console.log("DELETE")}
                                className="w-6 transition-all duration-200 hover:text-primary-700"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                className="absolute bottom-6 right-6 rounded-full w-16 h-16"
                label={<PlusIcon />}
            />
        </div>
    );
};

export default Dashboard;
