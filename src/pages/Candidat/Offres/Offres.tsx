import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import OfferCard from "../../../components/Cards/OfferCard";
export default function Offres() {
    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center mt-10 text-xl md:text-3xl">
                    Les offres
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        <OfferCard />
                        <OfferCard />
                        <OfferCard />
                        <OfferCard />
                        <OfferCard />
                    </article>
                </section>
            </div>
        </AuthWrapper>
    );
}
