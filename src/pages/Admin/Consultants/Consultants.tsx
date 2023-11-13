import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import Table from "../../../components/Table/Table";


const dataFromBackend = [
    {
        id: 1,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 2,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 3,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 4,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 5,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 6,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 7,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 8,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
];

const columnsToShow: string[] = ["id", "firstName", "lastName", "email"];


export default function Consultants() {

    const filteredData = dataFromBackend.map(
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
            <h1
                    className="font-medium text-center 
                text-3xl"
                >
                    Les consultants
                </h1>
                <section className="w-full mt-9 overflow-x-auto">
                    <Table
                        data={filteredData}
                        columsToShow={columnsToShow}
                        subject=""
                    />
                </section>
            </div>
        </AuthWrapper>
    );
}
