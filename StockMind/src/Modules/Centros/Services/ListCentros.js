import { api } from "../../../Core/Config/api";

export async function obtenerCentros() {
    const respuesta = await api.get("/centros");
    return respuesta.data;
}