export default function AuthWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative min-h-screen flex flex-col bg-gradient-to-br from-cyan-500 to-indigo-500 ">
            <div className="container-xl mx-10 flex-grow mt-[100px] md:mx-20">
                {children}
            </div>
        </main>
    );
}
