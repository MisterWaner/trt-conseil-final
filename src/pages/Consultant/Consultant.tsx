import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "../../lib/axios";
import { UpdatePasswordSchema } from "../../lib/Validations/user.schema";
import { SuccessModal } from "../../components/Modal/SuccessModal";
import { FailedModal } from "../../components/Modal/FailedModal";
import Cookies from "js-cookie";

import AuthWrapper from "../../components/Wrapper/AuthWrapper";

export default function Consultant() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [id, setId] = useState("");

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePasswordSchema>({
        resolver: zodResolver(UpdatePasswordSchema),
        mode: "onSubmit",
    });

    useEffect(() => {
        const idCookie = Cookies.get("id");
        if (idCookie) {
            setId(idCookie);
        }
    }, [id]);
    

    //Handle form submit
    const updatePassword = async (data: UpdatePasswordSchema) => {
        try {
            const response = await Axios.put(
                `/users/${id}/reset-password`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage("Le mot de passe a bien été modifié");
                setIsModalOpen(true);
                reset();
            } else {
                setIsSuccess(false);
                setMessage(
                    "Une erreur est survenue, veuillez réessayer plus tard"
                );
                setIsModalOpen(true);
                console.log(
                    "Une erreur est survenue lors de la mise à jour du mot de passe",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Portail consultant
                </h1>
                <section className="mt-10">
                    <h2 className="text-lg font-medium underline underline-offset-2">
                        Modifier mon mot de passe
                    </h2>
                    <form
                        onSubmit={handleSubmit(updatePassword)}
                        className="flex flex-col items-center justify-between form rounded-md p-5 mt-4 md:w-1/2 xl:w-1/4"
                    >
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="currentPassword"
                            >
                                Ancien mot de passe:
                            </label>
                            <input
                                type="password"
                                {...register("currentPassword")}
                                id="currentPassword"
                                placeholder="Saisir votre ancien mot de passe"
                                className="rounded-md p-3 placeholder:text-slate-300"
                            />
                            {errors.currentPassword ? (
                                <p className="text-center error-msg">
                                    {errors.currentPassword?.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="newPassword"
                            >
                                Nouveau mot de passe:
                            </label>
                            <input
                                type="password"
                                {...register("newPassword")}
                                id="newPassword"
                                placeholder="Saisir votre nouveau mot de passe"
                                className="rounded-md p-3 placeholder:text-slate-300"
                            />
                            {errors.newPassword ? (
                                <p className="text-center error-msg">
                                    {errors.newPassword?.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label
                                className="font-bold mb-2"
                                htmlFor="confirmation"
                            >
                                Confirmation:
                            </label>
                            <input
                                type="password"
                                {...register("confirmation")}
                                id="confirmation"
                                placeholder="Confirmer votre nouveau mot de passe"
                                className="rounded-md p-3 placeholder:text-slate-300"
                            />
                            {errors.confirmation ? (
                                <p className="text-center error-msg">
                                    {errors.confirmation?.message}
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
            {isSuccess ? (
                <SuccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    content={message}
                />
            ) : (
                <FailedModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    content={message}
                />
            )}
        </AuthWrapper>
    );
}
