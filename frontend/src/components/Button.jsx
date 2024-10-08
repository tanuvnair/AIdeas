const Button = ({ label, onClick, variant = "primary", className }) => {
    const baseClasses = "py-3 px-4 rounded transition-all duration-200";
    const variantClasses = {
        primary: "bg-primary-500 text-white  hover:bg-primary-600",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
        accent: "bg-secondary-400 text-white hover:bg-accent-600",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;
