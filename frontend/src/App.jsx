import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Note from "./pages/Note";

function App() {
    return (
        <div id="App" className="dark">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Signin} />
                    <Route exact path="/sign-up" Component={Signup} />
                    <Route exact path="/dashboard" Component={Dashboard} />
                    <Route exact path="/note/:id" Component={Note} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
