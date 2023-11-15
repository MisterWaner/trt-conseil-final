import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import AdminTable from "../../../components/Table/AdminTable/AdminTable";

export default function Consultants() {
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
                    <AdminTable />
                </section>
            </div>
        </AuthWrapper>
    );
}
