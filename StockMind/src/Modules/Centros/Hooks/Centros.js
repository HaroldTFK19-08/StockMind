
import { useEffect, useState } from "react";
import { obtenerCentros } from "../Services/ListCentros";

export function useCentros() {
    const [centros, setCentros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        async function cargarCentros() {
            try {
                const datos = await obtenerCentros();
                setCentros(datos);
            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar los centros.");
            } finally {
                setCargando(false);
            }
        }
        cargarCentros();
    }, []);
    return { centros, cargando, error };
}
