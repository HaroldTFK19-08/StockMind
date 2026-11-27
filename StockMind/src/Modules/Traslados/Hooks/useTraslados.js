import { useState } from 'react'

import { mensajeError } from '../../../Core/Services/apiUtils'
import { obtenerAmbientes } from '../../Ambientes/Services/ambientesService'
import { obtenerElementos } from '../../Elementos/Services/elementosService'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { fechaHoy } from '../../../Shared/Utils/fechas'
import { incluyeTexto } from '../../../Shared/Utils/texto'

import {
    actualizarTraslado,
    crearTraslado,
    eliminarTraslado,
    obtenerTraslado,
    obtenerTraslados,
} from '../service/TrasladoService'

const etiquetasEstado = {
    pendiente: 'Pendiente',
    aprobado: 'Aprobado',
    completado: 'Completado',
    rechazado: 'Rechazado',
}

const nombreAmbiente = (ambientes, id, relacion) =>
    relacion?.nombre ?? ambientes.find((ambiente) => ambiente.id === Number(id))?.nombre ?? `Ambiente ${id ?? ''}`

const adaptarTraslado = (traslado, ambientes, inventario) => {
    const registrosElemento = traslado.motion?.elements ?? traslado.elements ?? traslado.elementos ?? traslado.element_ids ?? []
    const elementos = registrosElemento.map((elemento) => {
        if (typeof elemento === 'object') return elemento
        return inventario.find((registro) => registro.id === Number(elemento)) ?? { id: elemento }
    })
    const estado = String(traslado.estado ?? 'pendiente').toLowerCase()

    return {
        ...traslado,
        apiId: traslado.id,
        id: traslado.codigo ?? traslado.id,
        origen: nombreAmbiente(ambientes, traslado.ambiente_origen_id, traslado.origin_environment ?? traslado.ambiente_origen),
        destino: nombreAmbiente(ambientes, traslado.ambiente_destino_id, traslado.destination_environment ?? traslado.ambiente_destino),
        fecha: (traslado.fecha_traslado ?? traslado.fecha_solicitud)?.slice(0, 10),
        estado,
        estadoEtiqueta: etiquetasEstado[estado] ?? traslado.estado,
        elementos,
        cantidadElementos: traslado.elements_count ?? elementos.length,
    }
}

const cargarDatos = async (idsAmbientesPermitidos) => {
    const [traslados, ambientes, elementos] = await Promise.all([
        obtenerTraslados(),
        obtenerAmbientes(),
        obtenerElementos(),
    ])
    const ambientesVisibles = idsAmbientesPermitidos.length
        ? ambientes.filter((ambiente) => idsAmbientesPermitidos.includes(ambiente.id))
        : ambientes

    return {
        traslados: traslados.map((traslado) => adaptarTraslado(traslado, ambientes, elementos)),
        ambientes: ambientesVisibles,
        elementos,
    }
}

const useTraslados = (ambientesIniciales = []) => {
    const idsAmbientesPermitidos = ambientesIniciales.map((ambiente) => ambiente.id)
    const claveCarga = idsAmbientesPermitidos.join(',')
    const { datos, cargando, error, recargar } = useCarga(() => cargarDatos(idsAmbientesPermitidos), claveCarga)
    const [busqueda, setBusqueda] = useState('')
    const [detalle, setDetalle] = useState(null)
    const [trasladoAEliminar, setTrasladoAEliminar] = useState(null)
    const [modalNuevo, setModalNuevo] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [errorAccion, setErrorAccion] = useState('')

    const ambientes = datos?.ambientes ?? []
    const elementos = datos?.elementos ?? []
    const traslados = (datos?.traslados ?? []).map((traslado) => adaptarTraslado(traslado, ambientes, elementos))
    const filtrados = traslados.filter((traslado) =>
        incluyeTexto(`${traslado.id} ${traslado.motivo} ${traslado.origen} ${traslado.destino}`, busqueda),
    )
    const totalElementos = traslados.reduce((suma, traslado) => suma + traslado.cantidadElementos, 0)
    const trasladosPendientes = traslados.filter((traslado) => ['pendiente', 'aprobado'].includes(traslado.estado)).length

    const guardarTraslado = async (nuevo) => {
        const respuesta = await crearTraslado(nuevo)
        const datosRespuesta = respuesta?.data ?? respuesta
        setMensaje(`Traslado ${datosRespuesta?.codigo ?? datosRespuesta?.id ?? ''} registrado`)
        setErrorAccion('')
        recargar()
    }

    const marcarRecibido = async (traslado) => {
        try {
            await actualizarTraslado(traslado.apiId, {
                ambiente_origen_id: traslado.ambiente_origen_id ?? traslado.origin_environment?.id ?? traslado.ambiente_origen?.id,
                ambiente_destino_id: traslado.ambiente_destino_id ?? traslado.destination_environment?.id ?? traslado.ambiente_destino?.id,
                danteaccount_id: traslado.danteaccount_id ?? traslado.danteaccount?.id,
                motivo: traslado.motivo,
                fecha_solicitud: traslado.fecha_solicitud,
                fecha_traslado: fechaHoy(),
                estado: 'completado',
                element_ids: traslado.element_ids
                    ?? traslado.motion?.elements?.map((elemento) => elemento.id)
                    ?? traslado.elements?.map((elemento) => elemento.id)
                    ?? traslado.elementos.map((elemento) => elemento.id),
            })
            setDetalle(null)
            setMensaje(`El traslado ${traslado.id} quedó completado`)
            setErrorAccion('')
            recargar()
        } catch (err) {
            setErrorAccion(mensajeError(err))
        }
    }

    const abrirDetalle = async (id) => {
        try {
            const traslado = await obtenerTraslado(id)
            setDetalle(adaptarTraslado(traslado, ambientes, elementos))
            setErrorAccion('')
        } catch (err) {
            setErrorAccion(mensajeError(err))
        }
    }

    const terminarEliminacion = (respuesta) => {
        setMensaje(respuesta?.message ?? `Traslado ${trasladoAEliminar.id} eliminado`)
        setTrasladoAEliminar(null)
        setDetalle(null)
        setErrorAccion('')
        recargar()
    }

    const eliminarSeleccionado = () => eliminarTraslado(trasladoAEliminar.apiId)

    return {
        ambientes,
        busqueda,
        cargando,
        detalle,
        datos,
        elementos,
        eliminarSeleccionado,
        error: error || errorAccion,
        filtrados,
        guardarTraslado,
        mensaje,
        marcarRecibido,
        modalNuevo,
        abrirDetalle,
        recargar,
        setBusqueda,
        setDetalle,
        setModalNuevo,
        setTrasladoAEliminar,
        totalElementos,
        terminarEliminacion,
        trasladoAEliminar,
        traslados,
        trasladosPendientes,
    }
}

export default useTraslados
