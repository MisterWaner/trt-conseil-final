import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import Axios from "../../../lib/axios";
import { useEffect, useState } from "react";
import { OfferCard } from "../../../components/Cards/OfferCard";

export default function Offres() {
    const [offers, setOffers] = useState([]);

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
    }, []);

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center mt-10 text-xl md:text-3xl">
                    Les offres
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        {offers.map((offer) => (
                            <OfferCard offer={offer} key={offer} />
                        ))}
                    </article>
                </section>
            </div>
        </AuthWrapper>
    );
}
