import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-background-50">
            <div className="flex flex-col gap-6 w-1/3 bg-secondary-100 p-8 rounded-xl">
                <h1 className="text-4xl font-semibold text-text-950">Login</h1>
                <Textbox label={"Username"} placeholder={"Username"} />
                <Textbox
                    label={"Password"}
                    placeholder={"Password"}
                    type="password"
                />

                <p className="text-text-950">
                    {"Don't have an account? "}
                    <Link
                        className="text-accent-500 hover:text-accent-800"
                        to={"/signup"}
                    >
                        Click here
                    </Link>
                </p>

                <Button label={"Login"} onClick={handleRedirect} />
            </div>
        </div>
    );
};

export default Login;
