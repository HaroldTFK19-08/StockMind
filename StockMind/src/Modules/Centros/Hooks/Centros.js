
import { useEffect, useState } from "react";
import { mensajeError } from "../../../Core/Services/apiUtils";
import { obtenerCentros } from "../Services/centrosService";

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
                setError(mensajeError(error));
            } finally {
                setCargando(false);
            }
        }
        cargarCentros();
    }, []);
    return { centros, cargando, error };
}
