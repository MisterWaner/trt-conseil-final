import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import Table from "../../../components/Table/Table";

const dataFromBackend = [
    {
        candidateId: 1,
        firstname: "Jean",
        lastname: "Dupont",
        email: "j.dupont@example.com",
        isApproved: <input type="checkbox" defaultValue="false" />,
    },
    {
        candidateId: 2,
        firstname: "Jean",
        lastname: "Dupont",
        email: "ggfzqegree@example.com",
        isApproved: <input type="checkbox" defaultValue="false" />,
    },
    {
        candidateId: 3,
        firstname: "Jean",
        lastname: "Dupont",
        email: "gerzefrgz@example.com",
        isApproved: <input type="checkbox" defaultValue="false" />,
    },
];

const columnsToShow = ["firstname", "lastname", "email", "isApproved"];

export default function Offres() {
    const filteredData: Record<string, number>[] = dataFromBackend.map(
        (row) => {
            const filteredRow: Record<string, number> = {};
            columnsToShow.forEach((column) => {
                filteredRow[column] = row[column];
            });
            return filteredRow;
        }
    );
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
                        <Table
                            data={filteredData}
                            columsToShow={columnsToShow}
                            subject=""
                        />
                    </div>
                </section>
            </div>
        </AuthWrapper>
    );
}
