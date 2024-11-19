import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Note {
    _id: string;
    noteTitle: string;
    imageData: string;
    createdAt: string;
}

export const Note = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [note, setNote] = useState<Note>();

    const fetchNote = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/note/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setNote(response.data);
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    };

    useEffect(() => {
        fetchNote();
    }, []);

    return (
        <>
            <div>
                {JSON.stringify(note)}
                <h1>Note {note?.noteTitle}</h1>
            </div>
        </>
    );
};
