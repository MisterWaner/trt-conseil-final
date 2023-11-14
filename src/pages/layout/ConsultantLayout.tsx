import Footer from "../../components/Footer/Footer";
import ConsultantNavbar from "../../components/Navbars/ConsultantNavbar";
import { ConsultantRouteGuard } from "../../lib/routeGuard";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <ConsultantRouteGuard>
                <ConsultantNavbar />
                <Outlet />
                <Footer />
            </ConsultantRouteGuard>
        </div>
    );
}
