/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessModal } from "../../components/Modal/SuccessModal";
import { FailedModal } from "../../components/Modal/FailedModal";
import { postOffer } from "../../lib/services/postDatas";
import { OfferSchema } from "../../lib/Validations/offer.schema";
import { useState } from "react";


export default function AddOfferForm({ id }: { id: string }) {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userId: string = id;
    console.log(userId);
    if (!userId || typeof userId !== 'string') {
        // Handle error: User ID is required and must be a string
        console.log("BOOOOOO !");
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<OfferSchema>({
        resolver: zodResolver(OfferSchema),
        mode: "onSubmit",
    });

    const onInvalid = (errors: unknown) => console.error(errors);

    const onSubmit = async (data: any, event: { target: HTMLFormElement | undefined; }) => {
        try {

            const postOfferData = new FormData(event.target);
            
            const response = await postOffer(postOfferData, userId);
            console.log(response.data);
            onInvalid(errors)
            setIsSuccess(true);
            setMessage("L'offre a bien été envoyée");
            setIsModalOpen(true);
            reset();
            console.log(data)
            
        } catch (error) {
            console.error("Erreur d'envoi des données au back", error);
        }
    };

    return (
        <>
            <form
                // @ts-ignore
                onSubmit={handleSubmit((data, event) => onSubmit(data, event), onInvalid)}
                className="flex flex-col w-full items-center"
            >
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
