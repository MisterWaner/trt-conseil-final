import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { User } from "../../lib/types/types";
import Axios from "../../lib/axios";
import { SuccessModal } from "../Modal/SuccessModal";
import { FailedModal } from "../Modal/FailedModal";

export function CandidatToApproveTable() {
    const [candidatsToApprove, setCandidatsToApprove] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    //Get data from API
    const getCandidatsToApprove = async () => {
        try {
            const response = await Axios.get("/candidats/unapproved");
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error(response, "Une erreur est survenue");
            }
            setCandidatsToApprove(response.data);
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };
    useEffect(() => {
        getCandidatsToApprove();
    }, []);

    //Approve Candidat
    const approveCandidat = async (id: string) => {
        try {
            const response = await Axios.put(`/candidats/${id}/approve`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage("Le candidat a bien été approuvé avec succès");
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
                            Email
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Nom
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Prénom
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Action
                        </th>
                    </tr>
                </thead>
                {candidatsToApprove.length > 0 ? (
                    <tbody className="bg-white divide-y divide-slate-400">
                        {candidatsToApprove.map((candidat, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-slate-200"
                            >
                                <td className="py-2 px-4">{candidat.email}</td>
                                <td className="py-2 px-4">
                                    {candidat.lastname}
                                </td>
                                <td className="py-2 px-4">
                                    {candidat.firstname}
                                </td>

                                <td className="py-2 px-4">
                                    <div className="flex justify-around items-center">
                                        <button
                                            onClick={() =>
                                                approveCandidat(candidat.id)
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
                            <td className="py-2 px-4" colSpan={4}>
                                Aucun candidat à approuver
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

export function ApprovedCandidatTable() {
    const [approvedCandidats, setApprovedCandidats] = useState<User[]>([]);

    //Get data from API
    const getApprovedCandidats = async () => {
        try {
            const response = await Axios.get("/candidats/approved");
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error(response, "Une erreur est survenue");
            }
            setApprovedCandidats(response.data);
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };
    useEffect(() => {
        getApprovedCandidats();
    }, []);

    return (
        <>
            <table className="min-w-full border border-black divide-y divide-black">
                <thead className="bg-black text-white text-center">
                    <tr>
                        <th scope="col" className="py-2 px-4">
                            Email
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Nom
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Prénom
                        </th>
                    </tr>
                </thead>
                {approvedCandidats.length > 0 ? (
                    <tbody className="bg-white divide-y divide-slate-400">
                        {approvedCandidats.map((candidat, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-slate-200"
                            >
                                <td className="py-2 px-4">{candidat.email}</td>
                                <td className="py-2 px-4">
                                    {candidat.lastname}
                                </td>
                                <td className="py-2 px-4">
                                    {candidat.firstname}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className="bg-white divide-y divide-slate-400">
                        <tr className="text-center hover:bg-slate-200">
                            <td className="py-2 px-4" colSpan={4}>
                                Aucun candidat approuvé
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </>
    );
}
