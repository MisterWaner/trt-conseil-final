import Wrapper from "../../../components/Wrapper/Wrapper";
import { Link } from "react-router-dom";

export default function Inscription() {
    return (
        <Wrapper>
            <main className="container-xl mx-auto h-full">
                <section className="flex flex-col justify-center items-center h-full">
                    <h3 className="font-medium white-shadow text-3xl">
                        Inscription
                    </h3>
                    <form
                        className="flex flex-col items-center justify-between form rounded-md p-10 mt-4"
                    >
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-md p-3"
                                name="email"
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-md p-3"
                                name="password"
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="font-bold" htmlFor="confirmation">
                                Confirmation du mot de passe
                            </label>
                            <input
                                type="password"
                                id="confirmation"
                                className="rounded-md p-3"
                                name="confirmation"
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label htmlFor="role" className="font-bold">
                                Qui êtes vous ?
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="rounded-md p-3"
                            >
                                <option value="">--Choisir--</option>
                                <option value="3">Recruteur</option>
                                <option value="4">Candidat</option>
                            </select>
                        </div>
                        <div className="w-full flex justify-between gap-2">
                            <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                                <Link to="/" type="submit">
                                    Annuler
                                </Link>
                            </div>
                            <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                                <button type="submit">
                                    Valider
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </Wrapper>
    );
}
