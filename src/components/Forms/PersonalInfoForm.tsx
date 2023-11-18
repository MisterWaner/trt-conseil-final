/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidatSchema } from "../../lib/Validations/user.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessModal } from "../../components/Modal/SuccessModal";
import { FailedModal } from "../../components/Modal/FailedModal";
import { updateCandidateDatas } from "../../lib/services/updateDatas";

export default function PersonalInfoForm({
    id,
    closeModal,
}: {
    id: string;
    closeModal: () => void;
}) {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId: string = id;

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<CandidatSchema>({
        resolver: zodResolver(CandidatSchema),
        mode: "onSubmit",
    });

    const onInvalid = (errors: unknown) => console.error(errors);

    const updatePersonalInfo = async (data: any) => {
        const response = await updateCandidateDatas(data, userId);
        try {
            onInvalid(errors);
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage("Les informations ont bien été modifiées");
            } else {
                setIsSuccess(false);
                setMessage("Une erreur est survenue, veuillez réessayer");
                console.log(
                    "Une erreur est survenue lors de la mise à jour du mot de passe",
                    response.status
                );
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
            setIsSuccess(false);
            setMessage(`Une erreur est survenue : ${response.data.message}`);
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
                onSubmit={handleSubmit(updatePersonalInfo, onInvalid)}
                className="flex flex-col w-full items-center"
            >
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        {...register("firstname")}
                        id="firstname"
                        className="bg-indigo-300/50 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    {errors.firstname ? (
                        <p className="text-center error-msg">
                            {errors.firstname?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="lastname">Nom</label>
                    <input
                        type="text"
                        {...register("lastname")}
                        id="lastname"
                        className="bg-indigo-300/50 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    {errors.lastname ? (
                        <p className="text-center error-msg">
                            {errors.lastname?.message}
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
