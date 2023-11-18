import Axios from "../axios";

export async function deleteOffer(id: string) { 
    try {
        const response = await Axios.delete(`/offers/${id}`, {
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
    } catch (error) {
        console.error("Une erreur est survenue", error);
        throw error;
    }
}