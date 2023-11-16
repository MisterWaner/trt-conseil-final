import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthWrapper from "../../components/Wrapper/AuthWrapper";
import { FailedModal } from "../../components/Modal/FailedModal";
import Axios from "../../lib/axios";
import { RegisterConsultantSchema } from "../../lib/Validations/user.schema";
import { SuccessModal } from "../../components/Modal/SuccessModal";

export default function Admin() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterConsultantSchema>({
        resolver: zodResolver(RegisterConsultantSchema),
        mode: "onSubmit",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [modalContent, setModalContent] = useState({
        message: "",
    });

    const onInvalid = (errors: unknown) => console.error(errors);

    const onSubmit = async (data: unknown) => {
        try {
            const response = await Axios.post("/consultants", data);
            console.log(response.data);
            if (response.status === 201) {
                setModalContent({
                    message: "Consultant ajouté avec succès",
                });
                reset();
                setIsModalOpen(true);
            } else {
                setError(true);
                setModalContent({
                    message: "Une erreur est survenue, veuillez réessayer",
                });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Une erreur est survenue", error);
        }
    };

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
                        onSubmit={handleSubmit(onSubmit, onInvalid)}
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
                                id="firstName"
                                placeholder="Saisir un prénom"
                                className="rounded-md p-3 placeholder:text-slate-300"
                                {...register("firstname")}
                            />
                            {errors.firstname ? (
                                <p className="text-center error-msg">
                                    {errors.firstname?.message}
                                </p>
                            ) : (
                                ""
                            )}
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
                                {...register("lastname")}
                                id="lastName"
                                placeholder="Saisir un Nom"
                                className="rounded-md p-3 placeholder:text-slate-300"
                            />
                            {errors.lastname ? (
                                <p className="text-center error-msg">
                                    {errors.lastname?.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Valider</button>
                        </div>
                    </form>
                </section>
            </div>
            {error ? (
                <FailedModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    content={modalContent.message}
                />
            ) : (
                <SuccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    content={modalContent.message}
                />
            )}
        </AuthWrapper>
    );
}
