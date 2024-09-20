import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <div className="dark">
            <BrowserRouter>
                {/* The switch ensures only one route is rendered at a time  */}
                <Routes>
                    <Route exact path="/" Component={Login} />
                    <Route exact path="/signup" Component={Signup} />
                    <Route exact path="/dashboard" Component={Dashboard} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
