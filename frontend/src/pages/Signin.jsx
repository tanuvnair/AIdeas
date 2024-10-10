import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/sign-in`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } else {
            showToastWithMessage(data.message || "An error occurred");
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
                onSubmit={handleSignIn}
                className="flex flex-col gap-6 w-1/3 bg-secondary-100 p-8 rounded-xl"
            >
                <h1 className="text-4xl font-semibold text-text-950">
                    Sign In
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
                    {"Don't have an account? "}
                    <Link
                        className="text-accent-500 hover:text-accent-800"
                        to={"/sign-up"}
                    >
                        Click here
                    </Link>
                </p>

                <Button label={"Sign In"} />
            </form>

            {showToast && (
                <Toast message={toastMessage} onClose={handleCloseToast} />
            )}
        </div>
    );
};

export default Signin;
