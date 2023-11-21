import axios from "axios";

const BASE_URL = "https://trt-conseil-back.up.railway.app";

const Axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": ["application/json", "multipart/form-data", "x-www-form-urlencoded"],
        Accept: ["application/json", "multipart/form-data", "text/plain", "*/*"],
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default Axios;
