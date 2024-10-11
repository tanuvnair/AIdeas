import axios from "axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "primereact/button";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/utility";

import { Toast } from "primereact/toast";

const Note = () => {
    const token = localStorage.getItem("token");
    const toast = useRef(null);
    const canvasRef = useRef(null);
    const [canvasBackground] = useState("#000000");
    const [isDrawing, setIsDrawing] = useState(false);
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
                ctx.strokeStyle = "white";
                ctx.lineWidth = 4;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        toast.current.show({
            severity: "error",
            summary: "Canvas reset",
            detail: "The canvas has been reset",
            life: 3000,
        });
    };

    const handleSave = async () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const dataURL = canvas.toDataURL("image/png");

            try {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/note/${noteData._id}`,
                    { imageData: dataURL },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setNoteData((prevNoteData) => ({
                    ...prevNoteData,
                    imageData: dataURL,
                }));

                toast.current.show({
                    severity: "success",
                    summary: "Saved note",
                    detail: "The note has been saved",
                    life: 3000,
                });
            } catch (error) {
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
            }
        }
    };

    const handleLoad = async (note) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/note/${note._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            console.log("LOAD", data.imageData);

            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext("2d");

                const img = new Image();
                img.src = data.imageData;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                };
            }

            toast.current.show({
                severity: "success",
                summary: "Loaded note",
                detail: "The note has been loaded successfully",
                life: 3000,
            });
        } catch (error) {
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
        }
    };

    return (
        <div className="flex flex-column p-4 h-screen gap-2">
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

            <div id="canvasContainer" className="flex-1">
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

            <div className="flex flex-row-reverse gap-4 p-4">
                <Button label="Reset Canvas" onClick={resetCanvas} />
                <Button
                    label="Load from database"
                    onClick={() => handleLoad(noteData)}
                />
                <Button
                    label="Save to database"
                    onClick={() => handleSave(noteData)}
                />
            </div>

            <Toast ref={toast} position="top-right" />
        </div>
    );
};

export default Note;
