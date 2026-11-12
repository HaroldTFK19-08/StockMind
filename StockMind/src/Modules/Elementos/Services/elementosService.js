import { api } from '../../../Core/Config/api'
import { actualizarConArchivos, crearConArchivos, obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Elementos del inventario -> /v1/elementos
// Campos: category_id, environment_id (ambiente) o warehouse_id (almacén), codigo_inventario,
//         nombre, img_elemento (imagen; obligatoria al crear), descripcion, serial, marca, modelo,
//         estado y condicion (ver Data/opcionesElemento.js)
// Cada elemento trae además: category, environment y warehouse

export const obtenerElementos = () => obtenerTodos('/elementos')

// El backend todavía no filtra por ambiente, así que se filtra aquí
export const obtenerElementosDeAmbiente = async (ambienteId) => {
    const elementos = await obtenerElementos()
    return elementos.filter((elemento) => elemento.environment_id === Number(ambienteId))
}

export const obtenerElemento = (id) => obtenerUno(`/elementos/${id}`)

// Se envían como FormData porque llevan la imagen del elemento
export const crearElemento = (elemento) => crearConArchivos('/elementos', elemento)

export const actualizarElemento = (id, elemento) => actualizarConArchivos(`/elementos/${id}`, elemento)

export const eliminarElemento = async (id) => {
    const respuesta = await api.delete(`/elementos/${id}`)
    return respuesta.data
}
