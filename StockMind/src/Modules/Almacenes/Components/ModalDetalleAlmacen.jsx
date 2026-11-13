import Modal from '../../../Shared/Components/Modals/Modal'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { capitalizar } from '../../../Shared/Utils/texto'

import { obtenerAlmacen } from '../Services/almacenesService'

const ModalDetalleAlmacen = ({ almacenId, onCerrar }) => {
    const { datos: almacen, cargando, error } = useCarga(
        () => obtenerAlmacen(almacenId),
        almacenId
    )

    return (
        <Modal
            abierto
            titulo={almacen?.nombre ?? 'Detalle del almacén'}
            descripcion="Información actualizada desde el inventario."
            onCerrar={onCerrar}
        >
            {cargando ? (
                <Cargando texto="Cargando almacén..." />
            ) : error ? (
                <MensajeError>{error}</MensajeError>
            ) : almacen ? (
                <>
                    <dl className="grid gap-4 rounded-[14px] bg-[#F7F9F6] p-4 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-xs text-[#64748b]">Sede</dt>
                            <dd className="font-semibold text-[#081B28]">{almacen.headquarter?.nombre ?? 'Sin sede'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Elementos guardados</dt>
                            <dd className="font-semibold text-[#081B28]">{almacen.elements_count ?? 0}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Capacidad</dt>
                            <dd className="font-semibold text-[#081B28]">{almacen.capacidad_elementos}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Estado</dt>
                            <dd className="mt-1"><EstadoBadge estado={capitalizar(almacen.estado)} /></dd>
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

export default ModalDetalleAlmacen
