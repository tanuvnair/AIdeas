import axios from "axios";

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
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError("");
        }

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/auth/sign-in`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Authorization: "Bearer token",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            })
            .catch((error) => {
                let errorMessage = "An error occurred.";

                if (error.response) {
                    errorMessage =
                        error.response.data.message ||
                        `Error: ${error.response.status}`;
                } else if (error.request) {
                    errorMessage =
                        "No response from the server. Please try again later.";
                } else {
                    errorMessage = error.message;
                }

                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage,
                    life: 3000,
                });
            });
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
            } else {
                navigate("/");
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
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                {emailError && <small className="p-error">{emailError}</small>}

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

            <Toast ref={toast} position="top-right" />
        </div>
    );
};

export default SignIn;
