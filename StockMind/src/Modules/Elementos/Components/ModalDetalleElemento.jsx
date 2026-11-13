import Modal from '../../../Shared/Components/Modals/Modal'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { capitalizar } from '../../../Shared/Utils/texto'

import FotoElemento from './FotoElemento'
import { ubicacionDe } from '../Data/opcionesElemento'
import { obtenerElemento } from '../Services/elementosService'

const ModalDetalleElemento = ({ elementoId, onCerrar }) => {
    const { datos: elemento, cargando, error } = useCarga(
        () => obtenerElemento(elementoId),
        elementoId
    )

    return (
        <Modal
            abierto
            titulo={elemento?.nombre ?? 'Detalle del elemento'}
            descripcion="Información actualizada desde el inventario."
            onCerrar={onCerrar}
        >
            {cargando ? (
                <Cargando texto="Cargando elemento..." />
            ) : error ? (
                <MensajeError>{error}</MensajeError>
            ) : elemento ? (
                <>
                    <div className="mb-5 flex items-center gap-3">
                        <FotoElemento elemento={elemento} tamano="h-14 w-14" />
                        <div>
                            <p className="text-sm font-semibold text-[#39A900]">{elemento.codigo_inventario}</p>
                            <p className="text-sm text-[#64748b]">{elemento.category?.nombre ?? 'Sin categoría'}</p>
                        </div>
                    </div>
                    <dl className="grid gap-3 rounded-[14px] bg-[#F7F9F6] p-4 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-xs text-[#64748b]">Ubicación</dt>
                            <dd className="font-semibold text-[#081B28]">{ubicacionDe(elemento)}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Serial</dt>
                            <dd className="font-semibold text-[#081B28]">{elemento.serial || 'Sin serial'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Marca y modelo</dt>
                            <dd className="font-semibold text-[#081B28]">{[elemento.marca, elemento.modelo].filter(Boolean).join(' ') || 'No especificados'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Estado</dt>
                            <dd className="mt-1"><EstadoBadge estado={capitalizar(elemento.estado)} /></dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Condición</dt>
                            <dd className="mt-1"><EstadoBadge estado={capitalizar(elemento.condicion)} /></dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-xs text-[#64748b]">Descripción</dt>
                            <dd className="font-semibold text-[#081B28]">{elemento.descripcion || 'Sin descripción'}</dd>
                        </div>
                    </dl>
                    <div className="mt-5 flex justify-end">
                        <Boton variante="secundario" onClick={onCerrar}>Cerrar</Boton>
                    </div>
                </>
            ) : null}
        </Modal>
    )
}

export default ModalDetalleElemento
