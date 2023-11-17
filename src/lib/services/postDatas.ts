import Axios from "../axios";

export async function postOffer(data: FormData, id: string) {
    try {
        const response = await Axios.post("/offers", {data, id}, {
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
        return response.data;
    } catch (error) {
        console.error("Une erreur est survenue", error);
        throw error;
    }
}
