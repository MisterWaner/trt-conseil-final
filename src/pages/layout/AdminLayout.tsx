import Footer from "../../components/Footer/Footer";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <AdminNavbar />
            <Outlet />
            <Footer />
        </div>
    );
}
