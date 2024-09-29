import { useEffect } from "react";

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="px-16 py-8 fixed bottom-8 right-8 bg-red-600 text-white rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
            {message}
        </div>
    );
};

export default Toast;
