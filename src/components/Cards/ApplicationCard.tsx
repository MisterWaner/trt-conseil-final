/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    FaCircleCheck,
    FaCircleXmark,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa6";
import { Application } from "../../lib/types/types";

interface ApplicationCardProps {
    application: Application;
    deleteApplication: (id: string) => void;
}

export default function ApplicationCard({
    application,
    deleteApplication,
}: ApplicationCardProps) {
    const date = application.applicationDate.toLocaleString().split("T")[0];
    const reverseDate = date.split("-").reverse().join("-");

    return (
        <div className="bg-sky-200 w-[250px] md:w-[300px] p-6 rounded-md border-2 border-stone-300 transition duration-200 hover:scale-[1.05]">
            <div className="flex flex-col">
                <div className="flex flex-col mb-2">
                    <h5 className="font-semibold">
                        {
                            // @ts-ignore
                            application.offer.title
                        }
                    </h5>
                    <p className="font-semibold my-4 italic">
                        {
                            // @ts-ignore
                            application.offer.user.societyName
                        }
                    </p>
                    <p className="text-sky-300 font-semibold italic">
                        {
                            // @ts-ignore
                            application.offer.place
                        }
                    </p>
                </div>
                <div className="text-md mb-3">
                    {
                        // @ts-ignore
                        application.offer.salary
                    }{" "}
                    €/mois
                </div>
                <div className="text-md mb-3">Postulé le : {reverseDate}</div>
                <div className="flex flex-col mb-2 w-full">
                    <button
                        onClick={() => deleteApplication(application.id)}
                        className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                    >
                        Annuler
                    </button>
                    <button className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                        En savoir +
                    </button>
                </div>
                <div className="flex flex-col mt-2 w-full text-sm">
                    <h6 className="font-bold mb-2">
                        Status de la candidature :
                    </h6>
                    <ul className="flex flex-col w-full">
                        <li className="flex justify-between items-center mb-2">
                            <p className="font-semibold">Candidature non vue</p>
                            <FaEyeSlash className="w-9 h-5" />
                        </li>
                        <li className="flex justify-between items-center mb-2">
                            <p className="text-warning-500 font-semibold">
                                Candidature vue
                            </p>
                            <FaEye className="w-9 h-5 text-warning-500" />
                        </li>
                        <li className="flex justify-between items-center mb-2">
                            <p className="text-success-500 font-semibold">
                                Candidature acceptée
                            </p>
                            <FaCircleCheck className="w-9 h-5 text-success-500" />
                        </li>
                        <li className="flex justify-between items-center">
                            <p className="text-danger-500 font-semibold">
                                Candidature refusée
                            </p>
                            <FaCircleXmark className="w-9 h-5 text-danger-500" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
