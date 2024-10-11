import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import axios from "axios";

const SignUp = () => {
    const toast = useRef(null);
    const [successDialog, setSuccessDialog] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError("");
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        } else {
            setPasswordError("");
        }

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/auth/sign-up`,
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
            .then(() => {
                setSuccessDialog(true);
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

    const successDialogFooter = (
        <div>
            <Button
                label="Ok"
                icon="pi pi-check"
                onClick={() => navigate("/")}
                autoFocus
            />
        </div>
    );

    return (
        <div className="flex justify-content-center align-items-center h-screen">
            <form onSubmit={handleSignUp} className="flex flex-column gap-3">
                <h1 className="text-6xl">Sign Up</h1>

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
                {passwordError && (
                    <small className="p-error">{passwordError}</small>
                )}

                <p>
                    {"Already have an account? "}
                    <Link to={"/"}>Click here</Link>
                </p>
                <Button label={"Sign Up"} onClick={handleSignUp} />
            </form>

            <Toast ref={toast} position="bottom-right" />
            <Dialog
                header="Your account has been successfully created"
                visible={successDialog}
                footer={successDialogFooter}
                style={{ width: "25vw" }}
                onHide={() => {
                    if (!successDialog) return;
                    setSuccessDialog(false);
                }}
            ></Dialog>
        </div>
    );
};

export default SignUp;
