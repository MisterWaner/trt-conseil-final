import Footer from "../../components/Footer/Footer";
import CandidatNavbar from "../../components/Navbars/CandidatNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <CandidatNavbar />
            <Outlet />
            <Footer />
        </div>
    );
}
