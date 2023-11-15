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

export interface Password {
    password: string;
    confirmation: string;
    currentPassword?: string;
    newPassword?: string;
}
export interface ApiUserResponse {
    results: User[];
}