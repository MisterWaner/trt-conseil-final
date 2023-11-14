import Footer from "../../components/Footer/Footer";
import CandidatNavbar from "../../components/Navbars/CandidatNavbar";
import { CandidatRouteGuard } from "../../lib/routeGuard";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <CandidatRouteGuard>
                <CandidatNavbar />
                <Outlet />
                <Footer />
            </CandidatRouteGuard>
        </div>
    );
}
