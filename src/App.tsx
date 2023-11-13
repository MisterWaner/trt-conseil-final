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
//Auth Routes
import Admin from "./pages/Admin/Admin";
import Consultants from "./pages/Admin/Consultants/Consultants";

import Consultant from "./pages/Consultant/Consultant";
import Candidats from "./pages/Consultant/Candidats/Candidats";
import Offres2 from "./pages/Consultant/Offres/Offres";

import Layout from "./pages/layout/Layout";
import AdminLayout from "./pages/layout/AdminLayout";
import ConsultantLayout from "./pages/layout/ConsultantLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="offres" element={<Offres />} />
                <Route path="login" element={<Connexion />} />
                <Route path="register" element={<Inscription />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="consultants" element={<Consultants />} />
            </Route>
            <Route path="/consultant" element={<ConsultantLayout />}>
                <Route index element={<Consultant />} />
                <Route path="candidats" element={<Candidats />} />
                <Route path="offres" element={<Offres2 />} />
            </Route>
        </>
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
