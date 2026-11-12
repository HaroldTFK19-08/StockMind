import { useState } from 'react'
import { Camera } from 'lucide-react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import CampoArchivo from '../../../Shared/Components/Forms/CampoArchivo'
import Boton from '../../../Shared/Components/UI/Boton'
import { fechaHoy } from '../../../Shared/Utils/fechas'
import { prioridades, tiposDano } from '../Data/reportesData'

/**
 * Formulario para reportar la falla de un elemento (lo usa el Instructor).
 * Se abre cuando "elemento" tiene valor y se cierra con onCerrar.
 */
const ModalReporteFalla = ({ elemento, onCerrar, onEnviar }) => {
    const [tipoDano, setTipoDano] = useState('')
    const [prioridad, setPrioridad] = useState('Media')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState(null)
    const [error, setError] = useState('')

    const limpiar = () => {
        setTipoDano('')
        setPrioridad('Media')
        setDescripcion('')
        setImagen(null)
        setError('')
    }

    const cerrar = () => {
        limpiar()
        onCerrar()
    }

    const enviar = (evento) => {
        evento.preventDefault()
        if (!tipoDano) return setError('Elige el tipo de daño')
        if (descripcion.trim().length < 10) return setError('Describe la falla con al menos 10 caracteres')

        onEnviar({
            elemento: elemento.nombre,
            placa: elemento.placa,
            tipoDano,
            prioridad,
            descripcion,
            fecha: fechaHoy(),
            imagen: imagen?.name ?? null,
        })
        limpiar()
    }

    return (
        <Modal
            abierto={Boolean(elemento)}
            titulo="Reportar falla"
            descripcion={elemento ? `${elemento.nombre} · ${elemento.placa}` : ''}
            onCerrar={cerrar}
            ancho="max-w-[680px]"
        >
            {/* Formulario de reporte de falla:
                - Campos agrupados por secciones para facilitar el diligenciamiento.
                - Sin scroll interno y con validación visible en pantalla. */}
            <form onSubmit={enviar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Detalle de la falla</h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Tipo de daño" htmlFor="tipoDanoModal">
                            <select id="tipoDanoModal" value={tipoDano} onChange={(e) => setTipoDano(e.target.value)} className={claseInput}>
                                <option value="">Selecciona</option>
                                {tiposDano.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </Campo>

                        <Campo etiqueta="Prioridad" htmlFor="prioridad">
                            <select id="prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className={claseInput}>
                                {prioridades.map((p) => <option key={p}>{p}</option>)}
                            </select>
                        </Campo>

                        <Campo etiqueta="Descripción" htmlFor="descripcionModal" className="sm:col-span-2">
                            <textarea id="descripcionModal" rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="¿Qué le pasa al elemento?" className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Foto (opcional)" htmlFor="imagen" className="sm:col-span-2">
                            {/* Selector visual para adjuntar evidencia fotográfica de la falla. */}
                            <CampoArchivo
                                id="imagen"
                                name="imagen"
                                accept="image/*"
                                onChange={(e) => setImagen(e.target.files[0] ?? null)}
                                archivo={imagen}
                                icono={Camera}
                                placeholder="Selecciona una foto de la falla"
                                textoAyuda="Puedes adjuntar una imagen como evidencia (opcional)."
                            />
                        </Campo>
                    </div>
                </section>

                {/* Mensaje de validación del formulario */}
                {error && <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">{error}</p>}

                {/* Acciones finales */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" className="w-full sm:w-auto">Enviar reporte</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalReporteFalla
