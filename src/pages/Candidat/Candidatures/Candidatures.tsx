import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import ApplicationCard from "../../../components/Cards/ApplicationCard";
import Axios from "../../../lib/axios";
import { Application } from "../../../lib/types/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SuccessModal } from "../../../components/Modal/SuccessModal";
import { FailedModal } from "../../../components/Modal/FailedModal";

export default function Candidatures() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [candidateId, setCandidateId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const idCookie = Cookies.get("id");
        if (idCookie) {
            setCandidateId(idCookie);
        }
        async function getApplications() {
            try {
                const response = await Axios.get(
                    `/candidats/${candidateId}/applications`,
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
                } else {
                    console.error(response, "Une erreur est survenue");
                }
                setApplications(response.data);
            } catch (error) {
                console.error(error, "Une erreur est survenue");
            }
        }
        getApplications();
    }, [candidateId]);

    async function deleteApplication(id: string) {
        try {
            const response = await Axios.delete(`/applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setIsSuccess(true);
                setMessage("Votre candidature a bien été supprimée");
                setIsModalOpen(true);
                setApplications(applications.filter((app) => app.id !== id));
            } else {
                setIsSuccess(false);
                setMessage("Une erreur est survenue, veuillez réessayer");
                setIsModalOpen(true);
                console.error(response, "Une erreur est survenue");
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    }

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center mt-10 text-xl md:text-3xl">
                    Mes candidatures
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        {applications.length > 0 ? (
                            applications.map((application, index) => (
                                <ApplicationCard
                                    key={index}
                                    application={application}
                                    deleteApplication={deleteApplication}
                                />
                            ))
                        ) : (
                            <p className="text-center">
                                Vous n'avez postulé à aucune offre
                            </p>
                        )}
                    </article>
                </section>
            </div>
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
        </AuthWrapper>
    );
}
