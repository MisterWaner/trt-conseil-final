import Axios from "./axios";

export async function get<T>(path: string): Promise<T> {
    const { data } = await Axios.get(path);
    
    return data;
}
