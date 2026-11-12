import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'

import Modal from './Modal'
import Boton from '../UI/Boton'
import { mensajeError } from '../../../Core/Services/apiUtils'

/**
 * Confirmación antes de eliminar un registro.
 *
 *   {sedeAEliminar && (
 *       <ModalEliminar
 *           titulo="Eliminar sede"
 *           nombre={sedeAEliminar.nombre}
 *           eliminar={() => eliminarSede(sedeAEliminar.id)}
 *           onEliminado={(respuesta) => ...}
 *           onCerrar={() => setSedeAEliminar(null)}
 *       />
 *   )}
 *
 * Si el backend no deja eliminar (por ejemplo, la sede tiene ambientes), muestra el motivo.
 */
const ModalEliminar = ({ titulo, nombre, eliminar, onEliminado, onCerrar }) => {
    const [eliminando, setEliminando] = useState(false)
    const [error, setError] = useState('')

    const confirmar = async () => {
        setEliminando(true)
        setError('')
        try {
            const respuesta = await eliminar()
            onEliminado(respuesta)
        } catch (err) {
            setError(mensajeError(err))
            setEliminando(false)
        }
    }

    // Mientras se elimina no se puede cerrar la ventana
    const cerrar = () => {
        if (!eliminando) onCerrar()
    }

    return (
        <Modal abierto titulo={titulo} descripcion="Esta acción no se puede deshacer." onCerrar={cerrar} ancho="max-w-[440px]">
            <div className="flex items-start gap-3 rounded-2xl border border-[#fecaca] bg-[#fffafa] p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-[#dc2626]">
                    <AlertTriangle size={20} aria-hidden="true" />
                </span>
                <div className="pt-0.5">
                    <p className="text-sm font-semibold leading-6 text-[#991b1b]">
                        ¿Seguro que deseas eliminar <span className="font-bold">{nombre}</span>?
                    </p>
                </div>
            </div>

            {error && (
                <p role="alert" className="animate-inline-error mt-4 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm leading-5 text-[#b42318]">
                    {error}
                </p>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar} disabled={eliminando}>Cancelar</Boton>
                <Boton variante="peligro" className="w-full sm:w-auto" icono={Trash2} onClick={confirmar} disabled={eliminando} aria-busy={eliminando}>
                    {eliminando ? 'Eliminando...' : 'Eliminar'}
                </Boton>
            </div>
        </Modal>
    )
}

export default ModalEliminar
