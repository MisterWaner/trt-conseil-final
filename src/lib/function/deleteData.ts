import Axios from "../axios";

export const deleteData = async (url: string, id: string) => {
    try {
        const response = await Axios.delete(`${url}/${id}`);
        console.log(response.status);
        
        if (response.status === 200) {
            console.log(response.data, "Les données ont bien été supprimées");
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
        throw error;
    }
};
