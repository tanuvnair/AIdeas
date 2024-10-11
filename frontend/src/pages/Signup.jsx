import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const SignUp = () => {
    const toast = useRef(null);
    const [successDialog, setSuccessDialog] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            setSuccessDialog(true);
        } else {
            const errorData = await response.json();
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: errorData.message || "An error occurred",
                life: 3000,
            });
        }
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
