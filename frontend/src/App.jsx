import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Note from "./pages/Note";

function App() {
    return (
        <div className="dark">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Login} />
                    <Route exact path="/signup" Component={Signup} />
                    <Route exact path="/dashboard" Component={Dashboard} />
                    <Route exact path="/note/:id" Component={Note} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
