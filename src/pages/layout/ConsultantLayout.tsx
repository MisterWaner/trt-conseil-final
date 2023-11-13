import Footer from "../../components/Footer/Footer";
import ConsultantNavbar from "../../components/Navbars/ConsultantNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <ConsultantNavbar />
            <Outlet />
            <Footer />
        </div>
    );
}
