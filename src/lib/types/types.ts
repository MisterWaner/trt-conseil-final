export interface User {
    id: string;
    roleId?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    societyName?: string;
    resume?: string;
    address?: string;
    isApproved?: boolean;
}

export interface Password {
    password: string;
    confirmation: string;
    currentPassword?: string;
    newPassword?: string;
}

export interface Resume {
    name: string;
    size: number;
    type: string;
}

export interface Offer {
    title?: string;
    id: string;
    reference: string;
    salary?: number;
    place?: string;
    schedules?: string;
    contractType?: string;
    isApproved?: boolean;
    publicationDate?: Date;
    userId: string;
}

export interface Application {
    id: string;
    offerId: string;
    userId: string;
    applicationDate: Date;
}

export interface ApiUserResponse {
    results: User[];
}