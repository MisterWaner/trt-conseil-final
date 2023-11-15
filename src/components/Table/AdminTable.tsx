import { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { User } from "../../lib/types/types";
import Axios from "../../lib/axios";
import { SuccessModal } from "../Modal/SuccessModal";
import { FailedModal } from "../Modal/FailedModal";

const AdminTable = () => {
    const [consultants, setConsultants] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    //Get data from API
    const getConsultants = async () => {
        try {
            const response = await Axios.get("/consultants");
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error(response, "Une erreur est survenue");
            }
            setConsultants(response.data);
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    };
    useEffect(() => {
        getConsultants();
    }, []);

    //Delete data from API
    const deleteConsultant = async (id: string) => {
        try {
            const response = await Axios.delete(`/consultants/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage("Le consultant a bien été supprimé");
                setIsModalOpen(true);
                setTimeout(() => {
                    getConsultants()
                }, 2000);
            } else {
                setIsSuccess(false);
                setMessage("Une erreur est survenue");
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
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-400">
                    {consultants.map((consultant, index) => (
                        <tr
                            key={index}
                            className="text-center hover:bg-slate-200"
                        >
                            <td className="py-2 px-4">{consultant.email}</td>

                            <td className="py-2 px-4">
                                <div className="flex justify-around items-center">
                                    <button onClick={() => deleteConsultant(consultant.id)}>
                                        <FaTrashCan className="text-red-500 hover:text-red-800 cursor-pointer w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
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
};

export default AdminTable;
