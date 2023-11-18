import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import handleLogout from "../../lib/function/handleLogout";


export default function ConsultantNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { id } = useParams<{ id: string }>();

    const links: Array<{ label: string; href: string }> = [
        { label: "Accueil", href: `/consultant/${id}` },
        { label: "les candidats", href: `/consultant/${id}/candidats` },
        { label: "les offres", href: `/consultant/${id}/offres` },
    ];
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 z-40 w-full bg-white">
            <nav className="flex items-center justify-between text-black p-4">
                <span className="pacifico text-3xl white-shadow">
                    TRT Conseil
                </span>
                <div className="w-50">
                    <ul
                        className={`h-fit absolute left-0 top-0 transition-all duration-300 ease-in flex flex-col items-center py-5 space-y-5 z-[-1] list-none lg:z-auto lg:flex-row lg:space-y-0 lg:py-0 lg:static lg:justify-around ${
                            isMenuOpen
                                ? "w-full top-[50px] z-40 bg-white"
                                : "w-full top-[-490px]"
                        }`}
                    >
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className="lg:mr-2 font-bold text-black hover:text-blue-500"
                            >
                                <Link to={link.href} onClick={toggleMenu}>
                                    <p className="p-2 capitalize">
                                        {link.label}
                                    </p>
                                </Link>
                            </li>
                        ))}
                        <li className="lg:mr-2 font-bold text-black hover:text-blue-500">
                            <Link to="/" onClick={handleLogout}>
                                <p className="p-2 capitalize">Déconnexion</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="absolute select-none top-6 right-6 border-0 icone-toggle bg-transparent p-1"
                >
                    {isMenuOpen ? (
                        <FaXmark className="lg:hidden w-8" />
                    ) : (
                        <FaBars className="lg:hidden w-8" />
                    )}
                </button>
            </nav>
        </header>
    );
}
