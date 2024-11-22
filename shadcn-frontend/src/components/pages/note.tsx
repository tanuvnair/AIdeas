import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brush, Eraser, Palette } from "lucide-react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Note {
    _id: string;
    noteTitle: string;
    imageData: string;
    createdAt: string;
}

interface CursorPosition {
    x: number;
    y: number;
}

export const Note = () => {
    const { theme, setTheme } = useTheme();
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [note, setNote] = useState<Note>();
    const [currentTool, setCurrentTool] = useState<"brush" | "eraser">("brush");
    const [currentColor, setCurrentColor] = useState("#000000");
    const [isDrawing, setIsDrawing] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
        x: 0,
        y: 0,
    });
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const navigate = useNavigate();

    const colors = [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FF8800",
        "#88FF00",
        "#0088FF",
        "#8800FF",
        "#FF0088",
    ];

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

    const initializeCanvas = () => {
        const canvas = canvasRef.current;
        const overlayCanvas = overlayCanvasRef.current;

        if (canvas && overlayCanvas) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            overlayCanvas.width = canvas.width;
            overlayCanvas.height = canvas.height;

            const context = canvas.getContext("2d");
            if (context) {
                context.lineCap = "round";
                context.strokeStyle =
                    currentTool === "brush" ? currentColor : "white";
                context.lineWidth = currentTool === "brush" ? 5 : 30;
                contextRef.current = context;

                const savedImageData = localStorage.getItem(`noteCanvas-${id}`);
                if (savedImageData) {
                    const img = new Image();
                    img.onload = () => {
                        context.drawImage(img, 0, 0);
                    };
                    img.src = savedImageData;
                }
            }
        }
    };

    useEffect(() => {
        initializeCanvas();
    }, [theme, currentTool, currentColor, id]);

    const drawEraserOutline = (x: number, y: number) => {
        const overlayCanvas = overlayCanvasRef.current;
        if (overlayCanvas) {
            const ctx = overlayCanvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

                if (currentTool === "eraser") {
                    ctx.beginPath();
                    ctx.arc(x, y, 10, 0, Math.PI * 2);
                    ctx.strokeStyle = theme === "dark" ? "white" : "black";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setCursorPosition({ x, y });
            drawEraserOutline(x, y);
        }

        if (isDrawing) {
            draw(event);
        }
    };

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            context.beginPath();
            context.moveTo(x, y);
            context.strokeStyle =
                currentTool === "brush" ? currentColor : "white";
            setIsDrawing(true);
        }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            context.lineTo(x, y);

            if (currentTool === "eraser") {
                context.globalCompositeOperation = "destination-out";
            } else {
                context.globalCompositeOperation = "source-over";
            }

            context.stroke();
        }
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (context && canvas) {
            context.closePath();
            setIsDrawing(false);

            const imageData = canvas.toDataURL();
            localStorage.setItem(`noteCanvas-${id}`, imageData);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const handleToolChange = (tool: "brush" | "eraser") => {
        setCurrentTool(tool);
        const overlayCanvas = overlayCanvasRef.current;
        if (overlayCanvas) {
            const ctx = overlayCanvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button onClick={() => navigate(-1)} variant="outline">
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
                    variant="outline"
                >
                    {theme === "dark" ? (
                        <FiSun size={24} />
                    ) : (
                        <FiMoon size={24} />
                    )}
                </Button>
            </header>
            <main className="flex flex-grow overflow-hidden">
                <div className="flex-grow overflow-hidden relative">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full max-h-full max-w-full border bg-white dark:bg-black absolute top-0 left-0"
                        onMouseDown={startDrawing}
                        onMouseMove={handleMouseMove}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        style={{
                            cursor:
                                currentTool === "brush" ? "default" : "none",
                        }}
                    />
                    <canvas
                        ref={overlayCanvasRef}
                        className="w-full h-full max-h-full max-w-full pointer-events-none absolute top-0 left-0"
                    />
                </div>
                <div>
                    <div className="flex flex-col gap-4 p-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`p-0 rounded-full`}
                                    style={{
                                        backgroundColor: currentColor,
                                    }}
                                ></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className="grid grid-cols-5 gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            className={`w-8 h-8 rounded-full border-2 ${
                                                color === currentColor
                                                    ? "border-gray-400"
                                                    : "border-transparent"
                                            }`}
                                            style={{
                                                backgroundColor: color,
                                            }}
                                            onClick={() =>
                                                setCurrentColor(color)
                                            }
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="color"
                                        value={currentColor}
                                        onChange={(e) =>
                                            setCurrentColor(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                        <ToggleGroup
                            type="single"
                            className="flex flex-col gap-2"
                            value={currentTool}
                            onValueChange={(value) =>
                                value &&
                                handleToolChange(value as "brush" | "eraser")
                            }
                        >
                            <ToggleGroupItem
                                value="brush"
                                className={`rounded-full ${
                                    currentTool === "brush" ? "bg-gray-200" : ""
                                }`}
                            >
                                <Brush size={24} />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="eraser"
                                className={`rounded-full ${
                                    currentTool === "eraser"
                                        ? "bg-gray-200"
                                        : ""
                                }`}
                            >
                                <Eraser size={24} />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </main>
            <footer className="p-4 border-t text-sm text-center">
                {note
                    ? `Feel free to draw on the canvas above.`
                    : "Fetching note data..."}
            </footer>
        </div>
    );
};
