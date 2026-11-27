import { RotateCcw } from 'lucide-react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Boton from '../../../Shared/Components/UI/Boton'
import { formatearFecha } from '../../../Shared/Utils/fechas'

const fechaLegible = (fecha) => (fecha ? formatearFecha(fecha) : 'Sin registrar')

const CampoDetalle = ({ etiqueta, children }) => (
    <div className="rounded-xl bg-[#f7f9f6] p-3">
        <dt className="text-xs font-medium text-[#64748b]">{etiqueta}</dt>
        <dd className="mt-1 break-words text-sm font-semibold text-[#081b28]">{children || 'Sin información'}</dd>
    </div>
)

const DetalleAsignacion = ({
    abierto,
    asignacion,
    cargando,
    onCerrar,
    onEditar,
    onDevolver,
}) => (
    <Modal
        abierto={abierto}
        titulo="Detalle de asignación"
        descripcion="Información del préstamo y de las personas responsables."
        onCerrar={onCerrar}
        ancho="max-w-[620px]"
    >
        {cargando || !asignacion ? (
            <p role="status" className="py-8 text-center text-sm text-[#64748b]">Cargando asignación...</p>
        ) : (
            <>
                <dl className="grid gap-3 sm:grid-cols-2">
                    <CampoDetalle etiqueta="Elemento">{asignacion.element?.nombre}</CampoDetalle>
                    <CampoDetalle etiqueta="Código de inventario">
                        {asignacion.element?.codigo_inventario ?? asignacion.elementId}
                    </CampoDetalle>
                    <CampoDetalle etiqueta="Aprendiz">{asignacion.apprenticeName}</CampoDetalle>
                    <CampoDetalle etiqueta="Documento">{asignacion.apprenticeDocument}</CampoDetalle>
                    <CampoDetalle etiqueta="Instructor">{asignacion.teacherName}</CampoDetalle>
                    <CampoDetalle etiqueta="Estado">{asignacion.estado}</CampoDetalle>
                    <CampoDetalle etiqueta="Fecha de asignación">{fechaLegible(asignacion.fecha)}</CampoDetalle>
                    <CampoDetalle etiqueta="Devolución esperada">{fechaLegible(asignacion.fechaDevolucionEsperada)}</CampoDetalle>
                    <CampoDetalle etiqueta="Devolución real">{fechaLegible(asignacion.fechaDevolucionReal)}</CampoDetalle>
                    <CampoDetalle etiqueta="Observaciones">{asignacion.observaciones}</CampoDetalle>
                </dl>
                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" onClick={onCerrar}>Cerrar</Boton>
                    {['activa', 'vencida'].includes(asignacion.estado) && (
                        <Boton variante="secundario" icono={RotateCcw} onClick={() => onDevolver(asignacion)}>
                            Registrar devolución
                        </Boton>
                    )}
                    <Boton variante="primario" onClick={() => onEditar(asignacion)}>Editar</Boton>
                </div>
            </>
        )}
    </Modal>
)

export default DetalleAsignacion
