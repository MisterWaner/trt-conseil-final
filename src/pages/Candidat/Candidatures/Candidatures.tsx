import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import ApplicationCard from "../../../components/Cards/ApplicationCard";
export default function Candidatures() {
    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center mt-10 text-xl md:text-3xl">
                    Mes candidatures
                </h1>
                <section className="mt-10 w-full mx-auto mb-5">
                    <article className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-between md:justify-start">
                        <ApplicationCard />
                        <ApplicationCard />
                        <ApplicationCard />
                        <ApplicationCard />
                        <ApplicationCard />
                    </article>
                </section>
            </div>
        </AuthWrapper>
    );
}
