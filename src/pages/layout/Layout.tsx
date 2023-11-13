import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbars/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
