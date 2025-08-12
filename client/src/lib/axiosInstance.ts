import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://circle-slice.onrender.com/api",
    withCredentials: true
});
