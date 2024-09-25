import { useState } from "react";

const ColorSwatches = ({ className }) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleCustomColorChange = (e) => {
        const customColor = e.target.value;
        setSelectedColor(customColor);
    };

    return (
        <div className={`${className}`}>
            {colors.map((color) => (
                <div
                    key={color}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${
                        selectedColor === color
                            ? "outline outline-4 outline-text-950"
                            : "outline-none"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                />
            ))}

            <input
                type="color"
                value={selectedColor}
                onChange={handleCustomColorChange}
                className="w-10 h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{ borderRadius: "50%" }}
            />
        </div>
    );
};

export default ColorSwatches;
