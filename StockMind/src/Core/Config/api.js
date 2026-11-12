import axios from "axios";

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