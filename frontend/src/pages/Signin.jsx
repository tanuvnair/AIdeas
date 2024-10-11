import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Signin = () => {
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
            // SHOW TOAST HERE USING DATA.MESSAGE
        }
    };

    return (
        <div className="flex justify-content-center align-items-center h-screen">
            <form onSubmit={handleSignIn} className="flex flex-column gap-3">
                <h1 className="text-6xl">Sign In</h1>
                <label htmlFor="username">Username</label>
                <InputText id="username" aria-describedby="username-help" />

                <label htmlFor="password">Password</label>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    feedback={false}
                    tabIndex={1}
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
        </div>
    );
};

export default Signin;
