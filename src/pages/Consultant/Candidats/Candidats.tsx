import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import { CandidatToApproveTable, ApprovedCandidatTable } from "../../../components/Table/CandidatTableInConsultant";

export default function Candidats() {

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
            <h1 className="font-medium text-center text-xl md:text-3xl">
                    Portail consultant
                </h1>
                <section className="mt-10 w-full">
                    <h2 className="text-lg font-medium underline underline-offset-2">
                        Les profiles candidats à approuver
                    </h2>
                    <div className="my-4 overflow-x-auto">
                        <CandidatToApproveTable
                        />
                    </div>
                </section>
                <section className="mt-10 w-full">
                    <h2 className="text-lg font-medium underline underline-offset-2">
                        Les profiles candidats approuvés
                    </h2>
                    <div className="my-4 overflow-x-auto">
                        <ApprovedCandidatTable
                        />
                    </div>
                </section>
            </div>
        </AuthWrapper>
    );
}
