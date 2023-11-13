import Footer from "../../components/Footer/Footer";
import RecruiterNavbar from "../../components/Navbars/RecruiterNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <RecruiterNavbar />
            <Outlet />
            <Footer />
        </div>
    );
}
