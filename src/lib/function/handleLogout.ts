import Cookies from "js-cookie";

export default function handleLogout() {

    try {
        Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("roleId");

    window.location.href = "/";
    } catch (error) {
        console.error("Une erreur est survenue lors de la déconnexion",error);
    }
}
