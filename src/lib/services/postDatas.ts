/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "../axios";
import { Offer } from "../types/types";

export async function postOffer(data: Offer, userId: string) {
    try {
        const response = await Axios.post("/offers", {...data, userId}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 201) {
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

export async function uploadResume(data: any) {
    try {
        const response = await Axios.post(`/resumes`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
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