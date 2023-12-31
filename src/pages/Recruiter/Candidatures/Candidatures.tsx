import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import {ApplicationsMadeTable} from "../../../components/Table/TablesInRecruiter";
import { useState, useEffect } from "react";
import { getCookieUserId } from "../../../lib/function/getCookieUserId";

export default function Candidatures() {
    const [id, setId] = useState("");

    useEffect(() => {
        const fetchUserId = async () => {
            const retrievedUserId = getCookieUserId() as string;
            setId(retrievedUserId);
        }
        fetchUserId();
    }, []);


    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Les candidatures
                </h1>
                <section className="mt-9 overflow-x-auto">
                    <ApplicationsMadeTable id={id}
                    />
                </section>
            </div>
        </AuthWrapper>
    );
}
