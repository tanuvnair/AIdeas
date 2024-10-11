import "primereact/resources/themes/lara-dark-purple/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Note from "./pages/Note";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Signin} />
                <Route exact path="/sign-up" Component={Signup} />
                <Route exact path="/dashboard" Component={Dashboard} />
                <Route exact path="/note/:id" Component={Note} />
                <Route path="*" Component={NotFound} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
