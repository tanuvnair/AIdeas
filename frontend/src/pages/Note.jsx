import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import ColorSwatches from "../components/ColorSwatches";
import { useEffect, useState, useRef } from "react";

const Note = () => {
    const canvasRef = useRef(null);
    const [canvasBackground, setCanvasBackground] = useState("#FFFFFF");
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEraser, setIsEraser] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FF5733");

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

            // This basically stores the image date, then updates the canvas width and height to updated size, then puts the data back in the canvas
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
                // Moves the starting position of the brush to the mouse position
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
        <div className="bg-background-50 h-screen rounded-none px-8 py-4">
            <div className="flex gap-4 items-center">
                <ArrowLeftCircleIcon className="text-text-950 w-12 cursor-pointer" />
                <h1 className="text-text-950 text-4xl font-semibold">Note</h1>
            </div>

            <div className="flex gap-6 mt-5 h-[calc(100%-8rem)]">
                <div
                    id="canvasContainer"
                    className="flex-grow border-4 border-text-950"
                >
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
                    <div className="flex flex-col gap-6">
                        <ColorSwatches
                            className="flex flex-col gap-4"
                            canvasBackgroundColor={canvasBackground}
                            selectedColor={selectedColor}
                            onSelectColor={handleColorChange}
                            onSelectEraser={handleSelectEraser}
                            canvasBackground={canvasBackground}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            label={"Calculate"}
                            onClick={() => console.log("CALCULATE")}
                        />
                        <Button
                            label={"Save"}
                            onClick={() => console.log("SAVE")}
                        />
                        <Button label={"Reset Canvas"} onClick={resetCanvas} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note;
