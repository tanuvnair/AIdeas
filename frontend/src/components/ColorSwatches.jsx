const ColorSwatches = ({ className, selectedColor, onSelectColor }) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];

    return (
        <div className={`${className}`}>
            {colors.map((color) => (
                <div
                    key={color}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${
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
                className="w-10 h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{ borderRadius: "50%" }}
            />
        </div>
    );
};

export default ColorSwatches;
