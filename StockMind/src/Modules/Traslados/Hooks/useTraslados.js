import { useState } from 'react'

import { mensajeError, obtenerUno } from '../../../Core/Services/apiUtils'
import { obtenerAmbientes } from '../../Ambientes/Services/ambientesService'
import { obtenerElementos } from '../../Elementos/Services/elementosService'
import useAuth from '../../Auth/Hooks/useAuth'
import { useCarga } from '../../../Shared/Hooks/useCarga'
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

const cargarDatos = async (usuarioId) => {
    const [trasladosApi, ambientes, elementos, perfil] = await Promise.all([
        obtenerTraslados(),
        obtenerAmbientes(),
        obtenerElementos(),
        obtenerUno(`/usuarios/${usuarioId}`),
    ])
    const cuentas = Array.isArray(perfil?.danteaccounts) ? perfil.danteaccounts : []
    const idsCuentas = new Set(cuentas.map((cuenta) => Number(cuenta.id)))
    const cuentasActivas = cuentas.filter((cuenta) => !cuenta.fecha_fin)
    const cuentaActiva = cuentasActivas.length === 1 ? cuentasActivas[0] : null
    const idCuentaActiva = Number(cuentaActiva?.id)
    const idAmbienteActivo = Number(cuentaActiva?.environment_id ?? cuentaActiva?.environment?.id)

    return {
        traslados: trasladosApi
            .filter((traslado) => idsCuentas.has(Number(traslado.danteaccount_id ?? traslado.danteaccount?.id)))
            .map((traslado) => adaptarTraslado(traslado, ambientes, elementos)),
        ambientes,
        elementos,
        danteaccountId: Number.isInteger(idCuentaActiva) && idCuentaActiva > 0 ? idCuentaActiva : null,
        ambienteOrigenId: Number.isInteger(idAmbienteActivo) && idAmbienteActivo > 0 ? idAmbienteActivo : null,
    }
}

const useTraslados = () => {
    const { usuario } = useAuth()
    const usuarioId = usuario?.id
    const { datos, cargando, error, recargar } = useCarga(() => cargarDatos(usuarioId), usuarioId ?? '')
    const [busqueda, setBusqueda] = useState('')
    const [detalle, setDetalle] = useState(null)
    const [trasladoAEliminar, setTrasladoAEliminar] = useState(null)
    const [modalNuevo, setModalNuevo] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [errorAccion, setErrorAccion] = useState('')
    const [actualizandoEstado, setActualizandoEstado] = useState(false)

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

    const cambiarEstado = async (traslado, estado) => {
        setActualizandoEstado(true)
        try {
            await actualizarTraslado(traslado.apiId, { estado })
            setDetalle(null)
            setMensaje(
                estado === 'aprobado'
                    ? `El traslado ${traslado.id} quedó aprobado`
                    : `El traslado ${traslado.id} quedó completado`,
            )
            setErrorAccion('')
            recargar()
        } catch (err) {
            setErrorAccion(mensajeError(err))
        } finally {
            setActualizandoEstado(false)
        }
    }

    const aprobarTraslado = (traslado) => cambiarEstado(traslado, 'aprobado')
    const marcarRecibido = (traslado) => cambiarEstado(traslado, 'completado')

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
        ambienteOrigenId: datos?.ambienteOrigenId ?? null,
        aprobarTraslado,
        actualizandoEstado,
        busqueda,
        cargando,
        detalle,
        datos,
        danteaccountId: datos?.danteaccountId ?? null,
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
