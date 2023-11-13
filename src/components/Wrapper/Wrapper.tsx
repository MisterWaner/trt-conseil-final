export default function Wrapper({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-full wrapper">{children}</div>;
}
