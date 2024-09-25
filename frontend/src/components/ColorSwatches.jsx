import { FaEraser } from "react-icons/fa";

const ColorSwatches = ({ className, selectedColor, onSelectColor }) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];

    return (
        <div className={`${className}`}>
            {colors.map((color) => (
                <div
                    key={color}
                    className={`w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${
                        selectedColor === color
                            ? "outline outline-4 outline-text-950" // Highlight the selected color
                            : "outline-none"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => onSelectColor(color)} // Update selected color when clicked
                />
            ))}

            <input
                type="color"
                value={selectedColor}
                onChange={(e) => onSelectColor(e.target.value)}
                className="w-12 h-12 cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{ borderRadius: "50%" }}
            />

            <FaEraser
                className={`bg-text-950 text-text-50 w-12 h-12 p-2 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${
                    selectedColor === ""
                        ? "outline outline-4 outline-text-950"
                        : "outline-none"
                }`}
                onClick={() => onSelectColor("")}
            />
        </div>
    );
};

export default ColorSwatches;
