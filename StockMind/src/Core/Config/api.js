import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_PROYECT_STOCKMIND,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});