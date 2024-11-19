import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillRect(0, 0, canvas.width, canvas.height); // Placeholder rectangle
                ctx.font = "16px Arial";
                ctx.fillText("Canvas Area", 10, 20); // Placeholder text
            }
        }
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <header className="p-4 border-b">
                <h1 className="text-2xl font-bold">
                    {note?.noteTitle || "Loading..."}
                </h1>
                <p className="text-sm">
                    Created at: {note?.createdAt || "Unknown"}
                </p>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full h-full max-w-4xl max-h-screen border"
                ></canvas>
            </main>
            <footer className="p-4 border-t text-sm text-center">
                {note
                    ? "Feel free to draw on the canvas above."
                    : "Fetching note data..."}
            </footer>
        </div>
    );
};
