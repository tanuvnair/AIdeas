import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { verifyToken } from "../utils/utility.js";

const SignIn = () => {
    const token = localStorage.getItem("token");
    const toast = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: data.message,
                life: 3000,
            });
        }
    };

    useEffect(() => {
        const handleExistingToken = async () => {
            if (!token) {
                navigate("/");
                return;
            }

            const isTokenValid = await verifyToken(token);
            if (isTokenValid) {
                navigate("/dashboard");
            }
        };

        handleExistingToken();
    }, []);

    return (
        <div className="flex justify-content-center align-items-center h-screen">
            <form onSubmit={handleSignIn} className="flex flex-column gap-3">
                <h1 className="text-6xl">Sign In</h1>
                <label htmlFor="email">Email</label>
                <InputText
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />

                <label htmlFor="password">Password</label>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    feedback={false}
                    toggleMask
                />

                <p>
                    {"Don't have an account? "}
                    <Link to={"/sign-up"}>Click here</Link>
                </p>

                <Button label="Sign In" onClick={handleSignIn} />
            </form>

            <Toast ref={toast} position="bottom-right" />
        </div>
    );
};

export default SignIn;
