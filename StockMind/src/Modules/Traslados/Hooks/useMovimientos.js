import { useState } from 'react'

import { obtenerElementos } from '../../Elementos/Services/elementosService'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { incluyeTexto } from '../../../Shared/Utils/texto'

import {
    crearMovimiento,
    obtenerMovimientos,
} from '../service/MovimientoService'

const adaptarMovimiento = (movimiento, inventario) => {
    const relacionElementos = movimiento.elements ?? movimiento.elementos ?? []
    const elementosRelacionados = Array.isArray(relacionElementos) ? relacionElementos : []
    const idsElementos = Array.isArray(movimiento.element_ids)
        ? movimiento.element_ids
        : elementosRelacionados.map((elemento) => typeof elemento === 'object' ? elemento.id : elemento)
    const elementIds = idsElementos
        .map((elemento) => Number(typeof elemento === 'object' ? elemento.id : elemento))
        .filter((id) => Number.isInteger(id) && id > 0)

    return {
        ...movimiento,
        apiId: movimiento.id,
        tipo: movimiento.tipo,
        motivo: movimiento.motivo ?? '',
        fecha: String(movimiento.fecha_movimiento ?? '').slice(0, 10),
        transferId: movimiento.transfer_id ?? movimiento.transfer?.id ?? null,
        elementIds,
        elementos: elementIds.map((id) => {
            const elemento = inventario.find((registro) => Number(registro.id) === id)
                ?? elementosRelacionados.find((registro) => Number(registro.id) === id)
            return { ...elemento, id, nombre: elemento?.nombre ?? `Elemento ${id}` }
        }),
    }
}

const cargarDatos = async () => {
    const [movimientos, elementos] = await Promise.all([
        obtenerMovimientos(),
        obtenerElementos(),
    ])

    return {
        elementos,
        movimientos: movimientos.map((movimiento) => adaptarMovimiento(movimiento, elementos)),
    }
}

const useMovimientos = () => {
    const { datos, cargando, error, recargar } = useCarga(cargarDatos)
    const [filtro, setFiltro] = useState('Todos')
    const [busqueda, setBusqueda] = useState('')
    const [modalAbierto, setModalAbierto] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [errorAccion, setErrorAccion] = useState('')

    const movimientos = datos?.movimientos ?? []
    const elementos = datos?.elementos ?? []
    const filtrados = movimientos
        .filter((movimiento) => filtro === 'Todos' || movimiento.tipo === filtro)
        .filter((movimiento) =>
            incluyeTexto(
                `${movimiento.tipo} ${movimiento.motivo} ${movimiento.transferId ?? ''} ${movimiento.elementos.map((elemento) => elemento.nombre).join(' ')}`,
                busqueda,
            ),
        )

    const abrirNuevo = () => {
        setErrorAccion('')
        setModalAbierto(true)
    }

    // El backend solo expone POST para movimientos: el historial no se edita ni se borra.
    const guardarMovimiento = async (movimiento) => {
        await crearMovimiento(movimiento)
        setMensaje('Movimiento registrado correctamente')
        setErrorAccion('')
        setModalAbierto(false)
        recargar()
    }

    return {
        abrirNuevo,
        busqueda,
        cargando,
        datos,
        elementos,
        error: error || errorAccion,
        filtro,
        filtrados,
        guardarMovimiento,
        mensaje,
        modalAbierto,
        movimientos,
        recargar,
        setBusqueda,
        setFiltro,
        setModalAbierto,
    }
}

export default useMovimientos
