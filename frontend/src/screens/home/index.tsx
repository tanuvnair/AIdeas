import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "../../../constants";
import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "@/components/ui/button";

import axios from "axios";

interface Response {
    expr: string;
    result: string;
    assign: boolean;
}

interface GeneratedResult {
    expression: string;
    answer: string;
}

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("rgb(255, 255, 255)");
    const [reset, setReset] = useState(false);
    const [result, setResult] = useState<GeneratedResult>();
    const [dictofVars, setDictOfVars] = useState<string[]>([]);

    useEffect(() => {
        if (reset) {
            resetCanvas();
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvas.style.background = "black";
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = "round";
                ctx.lineWidth = 3;
            }
        }
    }, []);

    const sendData = async () => {
        const canvas = canvasRef.current;

        if (canvas) {
            const response = await axios({
                method: "post",
                url: "${process.env.VITE_API_URL}/calculate",
                data: {
                    image: canvas.toDataURL("image/png"),
                    dict_of_vars: dictofVars,
                },
            });

            const loggedResponse = await response.data;
            console.log("Response:", loggedResponse);
        }
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

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-6 p-1">
                <Button
                    onClick={() => setReset(true)}
                    className="z-20 bg-black text-white"
                    variant="outline"
                >
                    Reset Canvas
                </Button>

                <Group className="z-20 ml-auto mr-auto">
                    {SWATCHES.map((color, index) => (
                        <ColorSwatch
                            key={index}
                            color={color}
                            onClick={() => setColor(color)}
                            className="cursor-pointer hover:outline outline-white hover:scale-110 hover:shadow-lg transition-transform duration-300 ease-in-out"
                        />
                    ))}
                </Group>

                <Button
                    onClick={() => setReset(true)}
                    className="z-20 bg-black text-white"
                    variant="outline"
                >
                    Calculate
                </Button>
            </div>

            <canvas
                ref={canvasRef}
                id="canvas"
                className="absolute top-0 left-0 w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseOut={stopDrawing}
                onMouseUp={stopDrawing}
            ></canvas>
        </>
    );
}
