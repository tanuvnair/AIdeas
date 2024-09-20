const Textbox = ({ label, value, onChange, placeholder, type = "text" }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-base font-medium text-text-950">
                    {label}
                </label>
            )}{" "}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-3 border rounded bg-background-50 border-accent-50 text-text-950  placeholder-gray-500 focus:outline-none focus:border-accent-600"
            />
        </div>
    );
};

export default Textbox;
