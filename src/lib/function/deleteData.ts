import Axios from "../axios";

export const deleteData = async ( id: string) => {
    try {
        const response = await Axios.delete(`/consultants/${id}`);
        console.log(response.status);
        
        if (response.status === 200) {
            console.log(response, "Les données ont bien été supprimées");
            return true;
        } else {
            console.error(
                "Une erreur est survenue lors de la suppression des données",
                response
            );
            throw new Error(
                "Une erreur est survenue lors de la suppression des données"
            );
        }
    } catch (error) {
        console.error("Une erreur est survenue", error);
        throw new Error("Les données n'ont pas pu être envoyées");
    }
};
