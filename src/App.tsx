import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import Home from "./pages/public/Home/Home";
import Offres from "./pages/public/Offres/Offres";
import Connexion from "./pages/public/Connexion/Connexion";
import Inscription from "./pages/public/Inscription/Inscription";

import Layout from "./pages/layout/Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/offres" element={<Offres />} />
            <Route path="/login" element={<Connexion />} />
            <Route path="/register" element={<Inscription />} />
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
