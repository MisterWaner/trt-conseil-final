import Footer from "../../components/Footer/Footer";
import RecruiterNavbar from "../../components/Navbars/RecruiterNavbar";
import { RecruiterRouteGuard } from "../../lib/routeGuard";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <RecruiterRouteGuard>
                <RecruiterNavbar />
                <Outlet />
                <Footer />
            </RecruiterRouteGuard>
        </div>
    );
}
