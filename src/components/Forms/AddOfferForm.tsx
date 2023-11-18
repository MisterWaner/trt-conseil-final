/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessModal } from "../../components/Modal/SuccessModal";
import { FailedModal } from "../../components/Modal/FailedModal";
import { postOffer } from "../../lib/services/postDatas";
import { OfferSchema } from "../../lib/Validations/offer.schema";
import { useState } from "react";

export default function AddOfferForm({id, closeModal}: {id: string, closeModal: () => void}) {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId: string = id;

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<OfferSchema>({
        resolver: zodResolver(OfferSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await postOffer(data, userId);

            if (response.status === 201) {
                console.log(response.data);
                setIsSuccess(true);
                setMessage("L'offre a bien été envoyée");
            } else {
                setIsSuccess(false);
                setMessage("Cette offre existe déjà");
            }

            console.log(data);
        } catch (error) {
            console.error("Erreur d'envoi des données au back", error);
            setIsSuccess(false);
            setMessage("Une erreur est survenue, réessayer plus tard");
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
                // @ts-ignore
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full items-center"
            >
                {/* <input type="hidden" name="userId" value={userId} /> */}
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="title">Intitulé</label>
                    <input
                        type="text"
                        {...register("title")}
                        id="title"
                        className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    {errors.title ? (
                        <p className="text-center error-msg">
                            {errors.title?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="place">Lieu</label>
                    <input
                        type="text"
                        {...register("place")}
                        id="place"
                        className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    {errors.place ? (
                        <p className="text-center error-msg">
                            {errors.place?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="salary">Salaire</label>
                    <input
                        type="number"
                        {...register("salary")}
                        id="salary"
                        className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    {errors.salary ? (
                        <p className="text-center error-msg">
                            {errors.salary?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="contractType">Contrat</label>
                    <select
                        {...register("contractType")}
                        id="contractType"
                        className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        <option value="">Choisir une valeur</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                    {errors.contractType ? (
                        <p className="text-center error-msg">
                            {errors.contractType?.message}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="schedules">Horaires</label>
                    <input
                        type="text"
                        {...register("schedules")}
                        id="schedules"
                        className="bg-indigo-300/50  p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    {errors.schedules ? (
                        <p className="text-center error-msg">
                            {errors.schedules?.message}
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
