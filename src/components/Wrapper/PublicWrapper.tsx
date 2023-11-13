export default function PublicWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative min-h-screen flex flex-col wrapper">
            <div className="container-xl mx-auto flex-grow flex flex-col justify-center items-center">
                {children}
            </div>
        </main>
    );
}
