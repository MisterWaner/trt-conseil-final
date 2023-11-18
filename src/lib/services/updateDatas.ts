import Axios from "../axios";
import { User } from "../types/types";
import { Password } from "../types/types";

export async function updateRecruiterDatas(data: User, id: string) {
    try {
        const response = await Axios.put(`/recruiters/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            console.log(response.data, "Les données ont bien été envoyées");
        } else {
            console.error(response, "Une erreur est SURVENUE");
            throw new Error("Les données n'ont pas pu être envoyées");
        }
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error("Une erreur est survenue", error);
        throw error;
    }
}

export async function updatePassword(data: Password, id: string) {
    try {
        const response = await Axios.put(`/users/${id}/reset-password`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            console.log(response.data, "Les données ont bien été envoyées");
        } else {
            console.error(response, "Une erreur est SURVENUE");
            throw new Error("Les données n'ont pas pu être envoyées");
        }
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error("Une erreur est survenue", error);
        throw error;
    }
}

export async function updateCandidateDatas(data: User, id: string) {
    try {
        const response = await Axios.put(`/candidats/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            console.log(response.data, "Les données ont bien été envoyées");
        } else {
            console.error(response, "Une erreur est SURVENUE");
            throw new Error("Les données n'ont pas pu être envoyées");
        }
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error("Une erreur est survenue", error);
        throw error;
    }
}