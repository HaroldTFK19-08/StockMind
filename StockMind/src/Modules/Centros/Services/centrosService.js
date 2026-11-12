import { api } from "../../../Core/Config/api"
import { actualizarConArchivos, crearConArchivos, obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Centros de formación -> /v1/centros
// Campos: nombre, regional, ciudad, foto_centro (imagen; obligatoria al crear)

export const obtenerCentros = () => obtenerTodos('/centros')

export const obtenerCentro = (id) => obtenerUno(`/centros/${id}`)

// Se envían como FormData porque llevan la foto del centro
export const crearCentro = (centro) => crearConArchivos('/centros', centro)

export const actualizarCentro = (id, centro) => actualizarConArchivos(`/centros/${id}`, centro)

export const eliminarCentro = async (id) => {
    const respuesta = await api.delete(`/centros/${id}`)
    return respuesta.data
}
