import AuthWrapper from "../../components/Wrapper/AuthWrapper";

export default function Admin() {
    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Portail administrateur
                </h1>
                <section className="mt-10">
                    <h3 className="text-lg font-medium underline underline-offset-2">
                        Enregistrer un consultant
                    </h3>
                    <form
                        action=""
                        className="flex flex-col items-center justify-between form rounded-md p-5 mt-4 md:w-1/2 xl:w-1/4"
                    >
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="firstName"
                            >
                                Prénom :
                            </label>
                            <input
                                type="firstName"
                                name="firstName"
                                id="firstName"
                                placeholder="Saisir un prénom"
                                className="rounded-md p-3 placeholder:text-slate-300"
                            />
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="lastName"
                            >
                                Nom :
                            </label>
                            <input
                                type="lastName"
                                name="lastName"
                                id="lastName"
                                placeholder="Saisir un Nom"
                                className="rounded-md p-3 placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Valider</button>
                        </div>
                    </form>
                </section>
            </div>
        </AuthWrapper>
    );
}
