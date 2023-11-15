import { useState, useEffect } from "react";
import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import AdminTable from "../../../components/Table/AdminTable/AdminTable";
import Axios from "../../../lib/axios";
import { deleteData } from "../../../lib/function/deleteData";
import { User } from "../../../lib/types/types";


const columnsToShow: string[] = ["email"];

export default function Consultants() {
    const [consultants, setConsultants] = useState<User[]>([]);

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

    const filteredData = consultants.map((row) => {
        const filteredRow: Record<string, number> = {};
        columnsToShow.forEach((column) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            filteredRow[column] = row[column];
        });
        return filteredRow;
    });

    const updateConsultantInList = (updatedConsultant: { id: string }) => {
        console.log(updatedConsultant);
        const updatedConsultantList = consultants.map(
            (consultant: { id: string }) => {
                return consultant.id === updatedConsultant.id
                    ? { ...consultant, ...updatedConsultant }
                    : consultant;
            }
        );
        console.log(updatedConsultantList);

        setConsultants(updatedConsultantList);
    };

    async function deleteConsultant(id: string) {
        const url = '/consultants'
        try {
            const response = await deleteData(url, id);
            if (response) {
                const updatedConsultantList = consultants.filter(
                    (consultant: { id: string }) => consultant.id !== id
                );
                setConsultants(updatedConsultantList);
                alert("L'utilisateur a bien été supprimé");
                console.log("L'utilisateur a bien été supprimé");
            } else {
                console.error(response, "Une erreur est SURVENUE");
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
        }
    }

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
                    <AdminTable
                        data={filteredData}
                        columsToShow={columnsToShow}
                        updateConsultantInList={updateConsultantInList}
                        deleteConsultant={deleteConsultant}
                    />
                </section>
            </div>
        </AuthWrapper>
    );
}
