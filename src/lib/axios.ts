import axios from "axios";

const BASE_URL = "https://trt-conseil-back.up.railway.app";

const Axios = axios.create({
    baseURL: BASE_URL,
});

export default Axios;
