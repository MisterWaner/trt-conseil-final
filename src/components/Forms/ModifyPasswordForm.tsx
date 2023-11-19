/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema } from "../../lib/Validations/user.schema";
import { SuccessModal } from "../../components/Modal/SuccessModal";
import { FailedModal } from "../../components/Modal/FailedModal";
import { updatePassword } from "../../lib/services/updateDatas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModifyPasswordForm({ id, closeModal }: { id: string | undefined, closeModal: () => void }) {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = id;

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePasswordSchema>({
        resolver: zodResolver(UpdatePasswordSchema),
        mode: "onSubmit",
    });

    const onInvalid = (errors: unknown) => console.error(errors);

    const updateUserPassword = async (data: any) => {
        try {
            const response = await updatePassword(data, userId);
            onInvalid(errors);
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage("Le mot de passe a bien été modifié");
            } else {
                setIsSuccess(false);
                setMessage(
                    "Une erreur est survenue, veuillez réessayer plus tard"
                );
                console.log(
                    "Une erreur est survenue lors de la mise à jour du mot de passe",
                    response.status
                );
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
            setIsSuccess(false);
            setMessage(`Une erreur est survenue réessayer plus tard`);
        }
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
            reset();
            closeModal();
        }, 3000)
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(updateUserPassword, onInvalid)}
                className="flex flex-col w-full items-center"
            >
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="currentPassword">Mot de passe actuel</label>
                    <input
                        type="password"
                        {...register("currentPassword")}
                        id="currentPassword"
                        className="bg-indigo-300/50 focus:ring-indigo-300 p-2 rounded-md focus:outline-none focus:ring"
                    />
                    {errors.currentPassword ? (
                        <p className="text-center error-msg">
                            {errors.currentPassword?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="newPassword">Mot de passe</label>
                    <input
                        type="password"
                        {...register("newPassword")}
                        id="newPassword"
                        className="bg-indigo-300/50 focus:ring-indigo-300 p-2 rounded-md focus:outline-none focus:ring"
                    />
                    {errors.newPassword ? (
                        <p className="text-center error-msg">
                            {errors.newPassword?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="confirmation">Confirmation</label>
                    <input
                        type="password"
                        {...register("confirmation")}
                        id="confirmation"
                        className="bg-indigo-300/50 focus:ring-indigo-300 p-2 rounded-md focus:outline-none focus:ring"
                    />
                    {errors.confirmation ? (
                        <p className="text-center error-msg">
                            {errors.confirmation?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <button
                        type="submit"
                        className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                    >
                        Valider
                    </button>
                </div>
            </form>
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
        </>
    );
}
