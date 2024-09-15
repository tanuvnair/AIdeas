import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import "./App.css";
import Home from "./screens/home";

const paths = [
    {
        path: "/",
        element: <Home />,
    },
];

const BrowserRouter = createBrowserRouter(paths);

function App() {
    return (
        <MantineProvider>
            <RouterProvider router={BrowserRouter} />
        </MantineProvider>
    );
}

export default App;
