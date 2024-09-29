import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/sign-up`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (response.ok) {
            navigate("/");
        } else {
            const errorData = await response.json();
            showToastWithMessage(errorData.message || "An error occurred");
        }
    };

    const showToastWithMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-background-50">
            <form
                onSubmit={handleSignUp}
                className="flex flex-col gap-6 w-1/3 bg-secondary-100 p-8 rounded-xl"
            >
                <h1 className="text-4xl font-semibold text-text-950">
                    Sign Up
                </h1>
                <Textbox
                    label={"Email"}
                    placeholder={"Email"}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Textbox
                    label={"Password"}
                    placeholder={"Password"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-text-950">
                    {"Already have an account? "}
                    <Link
                        className="text-accent-500 hover:text-accent-800"
                        to={"/"}
                    >
                        Click here
                    </Link>
                </p>
                <Button label={"Sign Up"} />
            </form>

            {showToast && (
                <Toast message={toastMessage} onClose={handleCloseToast} />
            )}
        </div>
    );
};

export default Signup;
