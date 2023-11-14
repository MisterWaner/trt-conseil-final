import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
    const role: number = Number(Cookies.get("roleId"));

    if (role !== 1) return <Navigate to="/login" />;
    return <>{children}</>;
}

export function ConsultantRouteGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const role: number = Number(Cookies.get("roleId"));

    if (role !== 2) return <Navigate to="/login" />;
    return <>{children}</>;
}

export function RecruiterRouteGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const role: number = Number(Cookies.get("roleId"));

    if (role !== 3) return <Navigate to="/login" />;
    return <>{children}</>;
}

export function CandidatRouteGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const role: number = Number(Cookies.get("roleId"));

    if (role !== 4) return <Navigate to="/login" />;
    return <>{children}</>;
}
