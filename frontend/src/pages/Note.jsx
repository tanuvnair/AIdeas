import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/utility";
import ColorSwatches from "../components/ColorSwatches"; // Keep your custom component for color selection

const Note = () => {
    const token = localStorage.getItem("token");
    const canvasRef = useRef(null);
    const [canvasBackground, setCanvasBackground] = useState("#FFFFFF");
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEraser, setIsEraser] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FF5733");
    const [noteData, setNoteData] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchNote = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/note/${id}`,
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
                setNoteData(data);
            } else {
                navigate("*");
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    useEffect(() => {
        const initializeNote = async () => {
            if (!token) {
                navigate("/");
                return;
            }

            const isTokenValid = await verifyToken(token);
            if (isTokenValid) {
                fetchNote();
            }
        };

        initializeNote();
    }, []);

    useEffect(() => {
        const appElement = document.getElementById("App");
        if (appElement) {
            if (appElement.classList.contains("dark")) {
                setCanvasBackground("#000000");
            } else {
                setCanvasBackground("#FFFFFF");
            }
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvas.style.background = canvasBackground;
                canvas.width =
                    document.getElementById("canvasContainer").offsetWidth;
                canvas.height =
                    document.getElementById("canvasContainer").offsetHeight;
                ctx.lineCap = "round";
                ctx.lineWidth = 4;
            }

            window.addEventListener("resize", () => {
                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                canvas.width =
                    document.getElementById("canvasContainer").offsetWidth;
                canvas.height =
                    document.getElementById("canvasContainer").offsetHeight;
                ctx.putImageData(imageData, 0, 0);
            });
        }
    }, [canvasBackground]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                setIsDrawing(true);
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            }
        }
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.strokeStyle = selectedColor;
                ctx.lineWidth = isEraser ? 30 : 4;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setIsEraser(false);
    };

    const handleSelectEraser = () => {
        setIsEraser(true);
    };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    return (
        <div className="p-4">
            <div className="flex gap-4 items-center">
                <Button
                    icon={<ArrowLeftCircleIcon />}
                    className="p-button-text"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-text-950 text-4xl font-semibold">
                    {noteData.noteTitle}
                </h1>
            </div>

            <div className="flex gap-6 mt-5 h-[calc(100%-8rem)]">
                <div id="canvasContainer" className="">
                    <canvas
                        ref={canvasRef}
                        id="noteCanvas"
                        className="h-full w-full"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                </div>

                <div className="flex flex-col justify-between flex-wrap gap-4">
                    <div>
                        <Button
                            label="Save"
                            onClick={() => console.log("SAVE")}
                        />
                        <Button label="Reset Canvas" onClick={resetCanvas} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note;
