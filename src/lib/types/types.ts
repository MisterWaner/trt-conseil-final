export interface User {
    id: string;
    roleId?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    societyName?: string;
    address?: string;
    isApproved?: boolean;
}

export interface ApiUserResponse {
    results: User[];
}