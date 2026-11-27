import { useState } from 'react'

import { mensajeError, obtenerTodos } from '../../../Core/Services/apiUtils'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { fechaHoy } from '../../../Shared/Utils/fechas'
import { incluyeTexto } from '../../../Shared/Utils/texto'
import { obtenerElementos } from '../../Elementos/Services/elementosService'
import {
    actualizarAsignacion,
    crearAsignacion,
    descargarPdfAsignaciones,
    eliminarAsignacion,
    obtenerAsignacion,
    obtenerAsignaciones,
    verPdfAsignaciones,
} from '../Services/asignacionesService'

const nombreUsuario = (usuario, tipo) => {
    if (!usuario) return `${tipo} sin información`
    const nombre = [
        usuario.nombre_1,
        usuario.nombre_2,
        usuario.apellido_1,
        usuario.apellido_2,
    ].filter(Boolean).join(' ')
    return nombre || usuario.email || `${tipo} #${usuario.id}`
}

const adaptarAsignacion = (asignacion, elementos) => {
    const elemento = asignacion.element
        ?? elementos.find((registro) => Number(registro.id) === Number(asignacion.element_id))
    const usuarioAprendiz = asignacion.apprentice?.user ?? asignacion.apprentice
    const usuarioInstructor = asignacion.teacher?.user ?? asignacion.teacher

    return {
        ...asignacion,
        apiId: asignacion.id,
        elementId: Number(asignacion.element_id ?? elemento?.id),
        element: elemento ?? { id: asignacion.element_id, nombre: 'Elemento no disponible' },
        apprenticeId: Number(asignacion.apprentice_id ?? asignacion.apprentice?.id),
        apprenticeName: nombreUsuario(usuarioAprendiz, 'Aprendiz'),
        apprenticeDocument: usuarioAprendiz?.numero_identidad ?? '',
        teacherId: Number(asignacion.teacher_id ?? asignacion.teacher?.id),
        teacherName: nombreUsuario(usuarioInstructor, 'Instructor'),
        fecha: String(asignacion.fecha_asignacion ?? '').slice(0, 10),
        fechaDevolucionEsperada: String(asignacion.fecha_devolucion_esperada ?? '').slice(0, 10),
        fechaDevolucionReal: String(asignacion.fecha_devolucion_real ?? '').slice(0, 10),
        estado: String(asignacion.estado ?? 'activa').toLowerCase(),
        observaciones: asignacion.observaciones ?? '',
    }
}

const cargarDatos = async () => {
    const [asignaciones, usuarios, elementos] = await Promise.all([
        obtenerAsignaciones(),
        obtenerTodos('/usuarios'),
        obtenerElementos(),
    ])

    return {
        asignaciones: asignaciones.map((asignacion) => adaptarAsignacion(asignacion, elementos)),
        usuarios,
        elementos,
    }
}

const crearArchivoPdf = (blob) => URL.createObjectURL(
    blob.type === 'application/pdf' ? blob : new Blob([blob], { type: 'application/pdf' }),
)

const useAsignaciones = () => {
    const { datos, cargando, error, recargar } = useCarga(cargarDatos)
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState('Todas')
    const [modalAbierto, setModalAbierto] = useState(false)
    const [asignacionEnEdicion, setAsignacionEnEdicion] = useState(null)
    const [asignacionAEliminar, setAsignacionAEliminar] = useState(null)
    const [detalle, setDetalle] = useState(null)
    const [detalleAbierto, setDetalleAbierto] = useState(false)
    const [cargandoDetalle, setCargandoDetalle] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [errorAccion, setErrorAccion] = useState('')
    const [pdfCargando, setPdfCargando] = useState(false)

    const asignaciones = datos?.asignaciones ?? []
    const usuarios = datos?.usuarios ?? []
    const elementos = datos?.elementos ?? []
    const aprendices = usuarios
        .filter((usuario) => usuario.apprentice)
        .map((usuario) => ({
            id: usuario.apprentice.id,
            nombre: nombreUsuario(usuario, 'Aprendiz'),
            documento: usuario.numero_identidad ?? '',
        }))
    const instructores = usuarios
        .filter((usuario) => usuario.teacher)
        .map((usuario) => ({
            id: usuario.teacher.id,
            nombre: nombreUsuario(usuario, 'Instructor'),
        }))
    const elementosAsignados = new Set(
        asignaciones
            .filter((asignacion) => ['activa', 'vencida'].includes(asignacion.estado))
            .map((asignacion) => asignacion.elementId),
    )
    const elementosDisponibles = elementos.filter((elemento) =>
        String(elemento.estado ?? '').toLowerCase() === 'disponible'
        && !elementosAsignados.has(Number(elemento.id)),
    )
    const elementosFormulario = asignacionEnEdicion
        && !elementosDisponibles.some((elemento) => Number(elemento.id) === asignacionEnEdicion.elementId)
        ? [...elementosDisponibles, asignacionEnEdicion.element]
        : elementosDisponibles
    const filtradas = asignaciones
        .filter((asignacion) => filtro === 'Todas' || asignacion.estado === filtro.toLowerCase())
        .filter((asignacion) =>
            incluyeTexto(
                `${asignacion.apprenticeName} ${asignacion.apprenticeDocument} ${asignacion.teacherName} ${asignacion.element?.nombre} ${asignacion.element?.codigo_inventario}`,
                busqueda,
            ),
        )
    const conteos = {
        Todas: asignaciones.length,
        Activa: asignaciones.filter((asignacion) => asignacion.estado === 'activa').length,
        Devuelta: asignaciones.filter((asignacion) => asignacion.estado === 'devuelta').length,
        Vencida: asignaciones.filter((asignacion) => asignacion.estado === 'vencida').length,
    }
    const asignacionesActivas = asignaciones.filter((asignacion) =>
        ['activa', 'vencida'].includes(asignacion.estado),
    )
    const aprendicesUnicos = new Set(asignacionesActivas.map((asignacion) => asignacion.apprenticeId)).size

    const abrirNueva = () => {
        setAsignacionEnEdicion(null)
        setErrorAccion('')
        setModalAbierto(true)
    }

    const abrirDetalle = async (id) => {
        setCargandoDetalle(true)
        setDetalleAbierto(true)
        setDetalle(null)
        setErrorAccion('')
        try {
            const asignacion = await obtenerAsignacion(id)
            setDetalle(adaptarAsignacion(asignacion, elementos))
        } catch (err) {
            setDetalleAbierto(false)
            setErrorAccion(mensajeError(err))
        } finally {
            setCargandoDetalle(false)
        }
    }

    const abrirEdicion = async (id) => {
        setCargandoDetalle(true)
        setDetalleAbierto(false)
        setErrorAccion('')
        try {
            const asignacion = await obtenerAsignacion(id)
            setDetalle(null)
            setAsignacionEnEdicion(adaptarAsignacion(asignacion, elementos))
            setModalAbierto(true)
        } catch (err) {
            setErrorAccion(mensajeError(err))
        } finally {
            setCargandoDetalle(false)
        }
    }

    const guardarAsignacion = async (datosFormulario) => {
        if (asignacionEnEdicion) {
            await actualizarAsignacion(asignacionEnEdicion.apiId, datosFormulario)
            setMensaje('Asignación actualizada correctamente')
        } else {
            await crearAsignacion(datosFormulario)
            setMensaje('Asignación registrada correctamente')
        }
        setErrorAccion('')
        setAsignacionEnEdicion(null)
        setDetalle(null)
        setDetalleAbierto(false)
        setModalAbierto(false)
        recargar()
    }

    const devolver = async (asignacion) => {
        setErrorAccion('')
        try {
            await actualizarAsignacion(asignacion.apiId, {
                estado: 'devuelta',
                fecha_devolucion_real: fechaHoy(),
            })
            setDetalle(null)
            setDetalleAbierto(false)
            setMensaje(`Se registró la devolución del elemento ${asignacion.element?.codigo_inventario ?? asignacion.elementId}`)
            recargar()
        } catch (err) {
            setErrorAccion(mensajeError(err))
        }
    }

    const eliminarSeleccionada = () => eliminarAsignacion(asignacionAEliminar.apiId)

    const terminarEliminacion = (respuesta) => {
        setMensaje(respuesta?.message ?? 'Asignación eliminada correctamente')
        setAsignacionAEliminar(null)
        setErrorAccion('')
        recargar()
    }

    const cerrarDetalle = () => {
        setDetalle(null)
        setDetalleAbierto(false)
    }

    const verPdf = async () => {
        const ventana = window.open('about:blank', '_blank')
        if (!ventana) {
            setErrorAccion('Permite las ventanas emergentes para ver el PDF.')
            return
        }

        setPdfCargando(true)
        setErrorAccion('')
        try {
            const archivo = await verPdfAsignaciones()
            const url = crearArchivoPdf(archivo)
            ventana.opener = null
            ventana.location.href = url
            window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
        } catch (err) {
            ventana.close()
            setErrorAccion(mensajeError(err))
        } finally {
            setPdfCargando(false)
        }
    }

    const descargarPdf = async () => {
        setPdfCargando(true)
        setErrorAccion('')
        try {
            const archivo = await descargarPdfAsignaciones()
            const url = crearArchivoPdf(archivo)
            const enlace = document.createElement('a')
            enlace.href = url
            enlace.download = 'asignaciones.pdf'
            document.body.appendChild(enlace)
            enlace.click()
            enlace.remove()
            window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
        } catch (err) {
            setErrorAccion(mensajeError(err))
        } finally {
            setPdfCargando(false)
        }
    }

    return {
        abrirDetalle,
        abrirEdicion,
        abrirNueva,
        asignacionAEliminar,
        asignacionEnEdicion,
        asignaciones,
        asignacionesActivas,
        aprendices,
        aprendicesUnicos,
        busqueda,
        cargando,
        cargandoDetalle,
        conteos,
        datos,
        descargarPdf,
        detalle,
        detalleAbierto,
        devolver,
        eliminarSeleccionada,
        elementosDisponibles,
        elementosFormulario,
        error: error || errorAccion,
        filtradas,
        filtro,
        guardarAsignacion,
        instructores,
        mensaje,
        modalAbierto,
        pdfCargando,
        recargar,
        setAsignacionAEliminar,
        setBusqueda,
        setDetalle,
        cerrarDetalle,
        setFiltro,
        setModalAbierto,
        terminarEliminacion,
        verPdf,
    }
}

export default useAsignaciones
