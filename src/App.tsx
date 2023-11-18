import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";




//Public Routes
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

import Recruiter from "./pages/Recruiter/Recruiter";
import Offres3 from "./pages/Recruiter/Offres/Offres";
import Candidatures from "./pages/Recruiter/Candidatures/Candidatures";

import Candidat from "./pages/Candidat/Candidat";
import Candidatures2 from "./pages/Candidat/Candidatures/Candidatures";
import Offres4 from "./pages/Candidat/Offres/Offres";

//Layouts
import Layout from "./pages/layout/Layout";
import AdminLayout from "./pages/layout/AdminLayout";
import ConsultantLayout from "./pages/layout/ConsultantLayout";
import RecruiterLayout from "./pages/layout/RecruiterLayout";
import CandidatLayout from "./pages/layout/CandidatLayout";

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
                <Route index path=":id" element={<Admin />} />
                <Route path="consultants" element={<Consultants />} />
            </Route>
            <Route path="/consultant" element={<ConsultantLayout />}>
                <Route path=":id" element={<Consultant />} />
                <Route path=":id/candidats" element={<Candidats />} />
                <Route path=":id/offres" element={<Offres2 />} />
            </Route>
            <Route path="/recruiter" element={<RecruiterLayout />}>
                <Route path=":id" element={<Recruiter />} />
                <Route path=":id/nos-offres" element={<Offres3 />} />
                <Route path=":id/les-candidatures" element={<Candidatures />} />
            </Route>
            <Route path="/candidat" element={<CandidatLayout />}>
                <Route path=":id" element={<Candidat />} />
                <Route path=":id/les-offres" element={<Offres4 />} />
                <Route path=":id/mes-candidatures" element={<Candidatures2 />} />
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
