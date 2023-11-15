import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { Offer } from "../../lib/types/types";
import Axios from "../../lib/axios";
import { SuccessModal } from "../Modal/SuccessModal";
import { FailedModal } from "../Modal/FailedModal";

export function OffersToApproveTable() {
    const [offersToApprove, setOffersToApprove] = useState<Offer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    //Get data from API
    const getOffersToApprove = async () => {
        try {
            const response = await Axios.get("/offers/unapproved");
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error(response, "Une erreur est survenue");
            }
            setOffersToApprove(response.data);
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };
    useEffect(() => {
        getOffersToApprove();
    }, []);

    //Approve Candidat
    const approveOffer = async (id: string) => {
        try {
            const response = await Axios.put(`/offers/${id}/approve`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage("L'offre a bien été approuvée avec succès");
                setIsModalOpen(true);
            } else {
                setIsSuccess(false);
                setMessage("Une erreur est survenue, veuillez réessayer");
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };

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
                            Action
                        </th>
                    </tr>
                </thead>
                {offersToApprove.length > 0 ? (
                    <tbody className="bg-white divide-y divide-slate-400">
                        {offersToApprove.map((offer, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-slate-200"
                            >
                                <td className="py-2 px-4">{offer.reference}</td>
                                <td className="py-2 px-4">
                                    {offer.title}
                                </td>
                                <td className="py-2 px-4">
                                    {offer.place}
                                </td>
                                <td className="py-2 px-4">
                                    {offer.contractType}
                                </td>
                                <td className="py-2 px-4">
                                    {offer.salary}
                                </td>

                                <td className="py-2 px-4">
                                    <div className="flex justify-around items-center">
                                        <button
                                            onClick={() =>
                                                approveOffer(offer.reference)
                                            }
                                        >
                                            <FaCheck className="text-lime-500 hover:text-lime-800 cursor-pointer w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className="bg-white divide-y divide-slate-400">
                        <tr className="text-center hover:bg-slate-200">
                            <td className="py-2 px-4" colSpan={6}>
                                Aucune offre à approuver
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
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

export function ApprovedOffersTable() {
    const [approvedOffers, setApprovedOffers] = useState<Offer[]>([]);

    //Get data from API
    const getApprovedOffers = async () => {
        try {
            const response = await Axios.get("/offers/approved");
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error(response, "Une erreur est survenue");
            }
            setApprovedOffers(response.data);
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };
    useEffect(() => {
        getApprovedOffers();
    }, []);

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
                    </tr>
                </thead>
                {approvedOffers.length > 0 ? (
                    <tbody className="bg-white divide-y divide-slate-400">
                        {approvedOffers.map((offer, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-slate-200"
                            >
                                <td className="py-2 px-4">{offer.reference}</td>
                                <td className="py-2 px-4">
                                    {offer.title}
                                </td>
                                <td className="py-2 px-4">
                                    {offer.place}
                                </td>
                                <td className="py-2 px-4">
                                    {offer.contractType}
                                </td>
                                <td className="py-2 px-4">
                                    {offer.salary}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className="bg-white divide-y divide-slate-400">
                        <tr className="text-center hover:bg-slate-200">
                            <td className="py-2 px-4" colSpan={4}>
                                Aucune offre approuvée
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </>
    );
}
