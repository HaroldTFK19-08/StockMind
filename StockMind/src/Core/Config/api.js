import axios from "axios";
import { eliminarToken, obtenerToken } from "../Auth/token";

// Cliente HTTP centralizado para el backend.
// - baseURL viene de variables de entorno (no hardcodear URLs sensibles).
// - timeout evita peticiones colgadas.
// - withCredentials queda en false por defecto; si se usan cookies/sesión, el backend debe configurar CORS y CSRF.
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_PROYECT_STOCKMIND,
    timeout: 15000,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = obtenerToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (respuesta) => respuesta,
    (error) => {
        if (error.response?.status === 401) {
            eliminarToken();
            window.dispatchEvent(new Event("stockmind:unauthorized"));
        }
        return Promise.reject(error);
    },
);