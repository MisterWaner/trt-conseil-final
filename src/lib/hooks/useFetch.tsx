import { useState, useEffect } from "react";
import Axios from "../axios";
import { AxiosRequestConfig } from "axios";

export default function useFetch(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(url, options);
                if (response.status === 200) {
                    console.log(response.data);
                    
                    setData(response.data);
                    setLoading(false);
                } else {
                    throw new Error("Error while fetching data");
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(undefined);
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [url, options]);

    return { data, loading, error };
}
