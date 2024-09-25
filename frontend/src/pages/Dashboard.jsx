import Button from "../components/Button";
import {
    PlusIcon,
    UserCircleIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";

const notes = [
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
    { id: 3, title: "Note 3" },
    { id: 4, title: "Note 4" },
    { id: 5, title: "Note 5" },
    { id: 6, title: "Note 6" },
    { id: 7, title: "Note 7" },
];

const Dashboard = () => {
    return (
        <div className="bg-background-50 h-screen rounded-none px-8 py-4">
            <div className="flex justify-between items-center align-middle">
                <h1 className="text-accent-500 text-5xl font-bold">AIdeas</h1>

                <UserCircleIcon className="text-text-950 w-16 cursor-pointer" />
            </div>

            <hr className="h-1 w-1/6  my-8 bg-gray-800 border-0"></hr>

            <h1 className="text-text-950 text-3xl font-semibold mt-8">
                Your Notes
            </h1>

            <div className="grid grid-cols-4 gap-4 mt-4 cursor-pointer h-auto">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="bg-secondary-100 text-text-950 p-5 rounded-md flex items-center justify-between"
                        onClick={() => console.log("NAVIGATE TO NOTE USING")}
                    >
                        <h1 className="text-xl font-medium">{note.title}</h1>
                        <div className="flex gap-4 text-primary-500">
                            <PencilIcon
                                onClick={() => console.log("EDIT")}
                                className="w-6 transition-all duration-200 hover:text-primary-700"
                            />
                            <TrashIcon
                                onClick={() => console.log("DELETE")}
                                className="w-6 transition-all duration-200 hover:text-primary-700"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                className="absolute bottom-6 right-6 rounded-full w-16 h-16"
                label={<PlusIcon />}
            />
        </div>
    );
};

export default Dashboard;
