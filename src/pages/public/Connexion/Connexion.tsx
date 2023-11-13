export default function Connexion() {
    return (
        <main className="relative min-h-screen flex flex-col wrapper">
            <div className="container-xl mx-auto flex-grow flex flex-col justify-center items-center">
                <section className="flex flex-col justify-center items-center h-full">
                    <h3 className="font-medium white-shadow text-3xl">
                        Connexion
                    </h3>
                    <form className="flex flex-col items-center justify-between form rounded-md p-10 mt-4">
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
                                required
                                className="rounded-md p-3"
                                name="password"
                            />
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
