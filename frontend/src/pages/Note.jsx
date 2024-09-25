import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import ColorSwatches from "../components/ColorSwatches";

const Note = () => {
    return (
        <div className="bg-background-50 h-screen rounded-none px-8 py-4">
            <div className="flex gap-4 items-center">
                <ArrowLeftCircleIcon className="text-text-950 w-12 cursor-pointer" />
                <h1 className="text-text-950 text-4xl font-semibold">Note</h1>
            </div>

            <div className="flex gap-6 mt-5 h-[calc(100%-8rem)]">
                <div className="flex-grow border-4 border-text-950">
                    <canvas className="w-full h-full" />
                </div>

                <div className="flex flex-col justify-between">
                    <ColorSwatches className="flex flex-col gap-4" />

                    <div className="flex flex-col gap-2">
                        <Button label={"Calculate"} />
                        <Button label={"Save"} />
                        <Button label={"Reset Canvas"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note;
