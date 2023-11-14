import Footer from "../../components/Footer/Footer";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import { AdminRouteGuard } from "../../lib/routeGuard";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <AdminRouteGuard>
                <AdminNavbar />
                <Outlet />
                <Footer />
            </AdminRouteGuard>
        </div>
    );
}
