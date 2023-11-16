import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import Axios from "../../../lib/axios";
import { useEffect, useState } from "react";
import { OfferCard } from "../../../components/Cards/OfferCard";
import Cookies from "js-cookie";
import { SuccessModal } from "../../../components/Modal/SuccessModal";
import { FailedModal } from "../../../components/Modal/FailedModal";
import { Offer } from "../../../lib/types/types";

export default function Offres() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [candidatId, setCandidatId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchOffers = async () => {
        try {
            const response = await Axios.get("offers/approved");
            console.log(response);
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
    useEffect(() => {
        fetchOffers();
        const idCookie = Cookies.get("id");
        if (idCookie) {
            setCandidatId(idCookie);
        }
    }, []);

    const applyToOffer = async (offerReference: string) => {
        try {
            const response = await Axios.post(
                "/applications",
                {
                    offerId: offerReference,
                    userId: candidatId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.status === 201) {
                console.log(response.data);
                setIsSuccess(true);
                setMessage("Votre candidature a bien été envoyée");
                setIsModalOpen(true);
            } else if (response.status === 409) {
                setIsSuccess(false);
                setMessage("Vous avez déjà postulé à cette offre");
                setIsModalOpen(true);
                console.error(response, "Une erreur est survenue");
            } else {
                setIsSuccess(false);
                setMessage("Une erreur est survenue, veuillez réessayer");
                setIsModalOpen(true);
                console.error(response, "Une erreur est survenue");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center mt-10 text-xl md:text-3xl">
                    Les offres
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        {offers.map((offer) => (
                            <OfferCard offer={offer} key={offer.reference} applyToOffer={applyToOffer} />
                        ))}
                    </article>
                </section>
            </div>
            {isSuccess ? (
                <SuccessModal
                    content={message}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            ) : (
                <FailedModal
                    content={message}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </AuthWrapper>
    );
}
