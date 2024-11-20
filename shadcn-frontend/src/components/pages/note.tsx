import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brush, Eraser } from "lucide-react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Note {
    _id: string;
    noteTitle: string;
    imageData: string;
    createdAt: string;
}

export const Note = () => {
    const { theme, setTheme } = useTheme();
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [note, setNote] = useState<Note>();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const navigate = useNavigate();

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

    const renderCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const currentImageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                ctx.fillStyle = theme === "dark" ? "#333" : "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.putImageData(currentImageData, 0, 0);

                ctx.font = "16px Arial";
                ctx.fillStyle = theme === "dark" ? "#fff" : "#000";
                ctx.fillText("Canvas Area", 10, 20);
            }
        }
    };

    useEffect(() => {
        renderCanvas();
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button onClick={() => navigate(-1)} variant={"outline"}>
                        <ArrowLeft />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {note?.noteTitle || "Loading..."}
                        </h1>
                        <p className="text-sm">
                            Created at: {note?.createdAt || "Unknown"}
                        </p>
                    </div>
                </div>
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
            <main className="flex flex-grow overflow-hidden">
                <div className="flex-grow overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        className="w-full h-full max-h-full max-w-full border"
                    ></canvas>
                </div>
                <div>
                    <ToggleGroup
                        type="single"
                        className="flex flex-col gap-2 w-sm p-4"
                    >
                        <ToggleGroupItem value="brush" className="rounded-full">
                            <Brush size={24} />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="eraser"
                            className="rounded-full"
                        >
                            <Eraser size={24} />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </main>
            <footer className="p-4 border-t text-sm text-center">
                {note
                    ? "Feel free to draw on the canvas above."
                    : "Fetching note data..."}
            </footer>
        </div>
    );
};
