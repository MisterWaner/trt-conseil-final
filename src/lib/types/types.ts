export interface User {
    id: string;
    roleId?: number;
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

export interface Offer {
    title?: string;
    reference: string;
    salary?: number;
    place?: string;
    shcedules?: string;
    contractType?: string;
    isApproved?: boolean;
    publicationDate?: Date;
    userId?: string;
}

export interface ApiUserResponse {
    results: User[];
}