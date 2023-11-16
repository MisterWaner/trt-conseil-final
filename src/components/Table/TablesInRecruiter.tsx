import { useState, useEffect } from "react";
import { FaTrashCan, FaCheck, FaXmark } from "react-icons/fa6";
import { Offer } from "../../lib/types/types";
import Axios from "../../lib/axios";

export function OffersMadeInTable({ id }: { id: string }) {
    const [offers, setOffers] = useState<Offer[]>([]);

    //Get data from API
    useEffect(() => {
        const getOffers = async () => {
            try {
                const response = await Axios.get(`/recruiters/${id}/offers`);
                if (response.status === 200) {
                    console.log(response.data);
                } else {
                    console.error(response, "Une erreur est survenue");
                }
                setOffers(response.data);
            } catch (error) {
                console.error(error, "Une erreur est survenue");
            }
        };
        getOffers();
    }, [id]);

    //Delete offer
    const deleteOffer = async (reference: string) => { 
        try {
            const response = await Axios.delete(`/offers/${reference}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setOffers(offers.filter((offer) => offer.reference !== reference));
            } else {
                console.error(response, "Une erreur est survenue");
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    }

    return (
        <>
            <table className="min-w-full border border-black divide-y divide-black">
                <thead className="bg-black text-white text-center">
                    <tr>
                        <th scope="col" className="py-2 px-4">
                            Référence
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Titre
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Lieu
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Contrat
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Salaire
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Status
                        </th>

                        <th scope="col" className="py-2 px-4">
                            Action
                        </th>
                    </tr>
                </thead>
                {offers.length > 0 ? (
                    <tbody className="bg-white divide-y divide-slate-400">
                        {offers.map((offer, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-slate-200"
                            >
                                <td className="py-2 px-4">{offer.reference}</td>
                                <td className="py-2 px-4">{offer.title}</td>
                                <td className="py-2 px-4">{offer.place}</td>
                                <td className="py-2 px-4">
                                    {offer.contractType}
                                </td>
                                <td className="py-2 px-4">{offer.salary}</td>
                                <td className="py-2 px-4">
                                    {offer.isApproved ? (
                                        <FaCheck className="text-green-500 hover:text-green-800 cursor-pointer w-5 h-5" />
                                    ) : (
                                        <FaXmark className="text-red-500 hover:text-red-800 cursor-pointer w-5 h-5" />
                                    )}
                                </td>

                                <td className="py-2 px-4">
                                    <div className="flex justify-around items-center">
                                        <button
                                            onClick={() =>
                                                deleteOffer(offer.reference)
                                            }
                                        >
                                            <FaTrashCan className="text-red-500 hover:text-red-800 cursor-pointer w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className="bg-white divide-y divide-slate-400">
                        <tr className="text-center hover:bg-slate-200">
                            <td className="py-2 px-4" colSpan={7}>
                                Aucune offre à afficher
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </>
    );
}
