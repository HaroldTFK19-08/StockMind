import { AlertTriangle, Trash2 } from 'lucide-react'
import Modal from '../../../Shared/Components/Modals/Modal'

const ConfirmarEliminarCategoria = ({
    abierto,
    categoria,
    eliminando,
    onCerrar,
    onConfirmar,
}) => (
    <Modal
        abierto={abierto}
        titulo="Eliminar categoría"
        descripcion="Esta acción no se puede deshacer."
        onCerrar={onCerrar}
        ancho="max-w-[440px]"
    >
        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4">
            <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={20} />
            <p className="text-sm leading-6 text-red-800">
                ¿Seguro que deseas eliminar la categoría{' '}
                <span className="font-semibold">{categoria?.nombre}</span>?
            </p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
            <button
                type="button"
                onClick={onCerrar}
                disabled={eliminando}
                className="rounded-xl bg-background px-4 py-2.5 text-sm font-medium text-[#64748b] hover:bg-[#edf2f7] disabled:opacity-60"
            >
                Cancelar
            </button>
            <button
                type="button"
                onClick={onConfirmar}
                disabled={eliminando}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            >
                <Trash2 size={16} />
                {eliminando ? 'Eliminando...' : 'Eliminar'}
            </button>
        </div>
    </Modal>
)

export default ConfirmarEliminarCategoria
