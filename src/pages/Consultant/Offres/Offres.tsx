import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import {
    OffersToApproveTable,
    ApprovedOffersTable,
} from "../../../components/Table/OfferTableInConsultant";

export default function Offres() {
    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Portail consultant
                </h1>
                <section className="mt-10 w-full">
                    <h2 className="text-lg font-medium underline underline-offset-2">
                        Les offres d&apos;emplois à valider
                    </h2>
                    <div className="my-4 overflow-x-auto">
                        <OffersToApproveTable />
                    </div>
                </section>
                <section className="mt-10 w-full">
                    <h2 className="text-lg font-medium underline underline-offset-2">
                        Les offres d&apos;emplois validées
                    </h2>
                    <div className="my-4 overflow-x-auto">
                        <ApprovedOffersTable />
                    </div>
                </section>
            </div>
        </AuthWrapper>
    );
}
