import { useState, useEffect } from "react";
import { FaTrashCan, FaCheck, FaXmark } from "react-icons/fa6";
import { Application, Offer } from "../../lib/types/types";
import Axios from "../../lib/axios";

export function OffersMadeInTable({ id }: { id: string }) {
    const [offers, setOffers] = useState<Offer[]>([]);
    const userId = id;

    //Get data from API
    useEffect(() => {
        const getOffers = async () => {
            try {
                const response = await Axios.get(
                    `/recruiters/${userId}/offers`,
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
                    console.log(response.data);
                    setOffers(response.data);
                } else {
                    console.log(response.status);
                    console.error(response, "Une erreur est survenue");
                }
            } catch (error) {
                console.error(error, "Une erreur est survenue");
            }
        };
        getOffers();
    }, [userId]);

    //Delete offer
    const handleDelete = async (id: string) => {
        try {
            const response = await Axios.delete(`/offers/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setOffers(offers.filter((offer) => offer.id !== id));
            } else {
                console.error(response, "Une erreur est survenue");
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
                                    <div className="flex justify-around items-center">
                                        {offer.isApproved ? (
                                            <FaCheck className="text-green-500 hover:text-green-800 cursor-pointer w-5 h-5" />
                                        ) : (
                                            <FaXmark className="text-red-500 hover:text-red-800 cursor-pointer w-5 h-5" />
                                        )}
                                    </div>
                                </td>

                                <td className="py-2 px-4">
                                    <div className="flex justify-around items-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(offer.id)
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
export function ApplicationsMadeTable({ id }: { id: string }) {
    const [applications, setApplications] = useState<Application[]>([]);
    const userId = id;

    //Get data from API
    useEffect(() => {
        const getApplications = async () => {
            try {
                const response = await Axios.get(
                    `/recruiters/${userId}/applications`
                );
                if (response.status === 200) {
                    console.log(response.data);
                } else {
                    console.error(response, "Une erreur est survenue");
                }
                setApplications(response.data);
            } catch (error) {
                console.error(error, "Une erreur est survenue");
            }
        };
        getApplications();
    }, [userId]);

    //Delete offer
    const deleteApplication = async (id: string) => {
        try {
            const response = await Axios.delete(`/applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setApplications(
                    applications.filter((application) => application.id !== id)
                );
            } else {
                console.error(response, "Une erreur est survenue");
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
                            Id
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Prénom
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Nom
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Email
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Titre
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Action
                        </th>
                    </tr>
                </thead>
                {applications.length > 0 ? (
                    <tbody className="bg-white divide-y divide-slate-400">
                        {applications.map((application, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-slate-200"
                            >
                                <td className="py-2 px-4">{application.id}</td>
                                <td className="py-2 px-4">
                                    {application.user.lastname}
                                </td>
                                <td className="py-2 px-4">
                                    {application.user.firstname}
                                </td>
                                <td className="py-2 px-4">
                                    {application.user.email}
                                </td>
                                <td className="py-2 px-4">
                                    {application.offer.title}
                                </td>
                                <td className="py-2 px-4">
                                    <div className="flex justify-around items-center">
                                        <button
                                            onClick={() =>
                                                deleteApplication(
                                                    application.id
                                                )
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
