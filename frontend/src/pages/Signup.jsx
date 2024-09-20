import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-background-50">
            <div className="flex flex-col gap-6 w-1/3 bg-secondary-100 p-8 rounded-xl">
                <h1 className="text-4xl font-semibold text-text-950">
                    Sign Up
                </h1>
                <Textbox label={"Username"} placeholder={"Username"} />
                <Textbox label={"Email"} placeholder={"Email"} type="email" />
                <Textbox
                    label={"Password"}
                    placeholder={"Password"}
                    type="password"
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
            </div>
        </div>
    );
};

export default Signup;
