import {
    PlusIcon,
    UserCircleIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";

const notes = [
    { title: "Note 1" },
    { title: "Note 2" },
    { title: "Note 3" },
    { title: "Note 4" },
];

const Dashboard = () => {
    return (
        <div className="bg-background-50 h-screen rounded-none px-8 py-4">
            <div className="flex justify-between">
                <h1 className="text-accent-500 text-4xl font-bold">AIdeas</h1>

                <UserCircleIcon className="text-text-950 w-12 cursor-pointer" />
            </div>

            <h1 className="text-text-950 text-3xl font-semibold mt-8">
                Your Notes
            </h1>

            <div className="grid grid-cols-4 gap-4 mt-4 cursor-pointer h-auto">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="bg-secondary-500 text-text-50 p-5 rounded-md flex items-end justify-between transition-all duration-200 hover:bg-secondary-400"
                    >
                        <h1 className="text-l text-text-950">{note.title}</h1>
                        <div className="flex gap-4">
                            <PencilIcon className="w-6 text-text-950 transition-all duration-200 hover:text-text-800" />
                            <TrashIcon className="w-6 text-text-950 transition-all duration-200 hover:text-text-800" />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                className="absolute bottom-6 right-6 rounded-full text-text-50 w-16 h-16"
                label={<PlusIcon />}
            />
        </div>
    );
};

export default Dashboard;
