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
            <div className="flex items-start gap-3 rounded-[14px] bg-[#fef2f2] p-4">
                <AlertTriangle className="mt-0.5 shrink-0 text-[#dc2626]" size={20} />
                <p className="text-sm leading-6 text-[#991b1b]">
                    ¿Seguro que deseas eliminar <span className="font-semibold">{nombre}</span>?
                </p>
            </div>

            {error && <p role="alert" className="mt-4 text-sm text-[#dc2626]">{error}</p>}

            <div className="mt-6 flex justify-end gap-2">
                <Boton variante="texto" onClick={cerrar} disabled={eliminando}>Cancelar</Boton>
                <Boton variante="peligro" icono={Trash2} onClick={confirmar} disabled={eliminando}>
                    {eliminando ? 'Eliminando...' : 'Eliminar'}
                </Boton>
            </div>
        </Modal>
    )
}

export default ModalEliminar
