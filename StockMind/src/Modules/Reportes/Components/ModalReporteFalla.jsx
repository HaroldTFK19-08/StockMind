import { useState } from 'react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
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
        >
            <form onSubmit={enviar} className="space-y-4">
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
                </div>

                <Campo etiqueta="Descripción" htmlFor="descripcionModal">
                    <textarea id="descripcionModal" rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="¿Qué le pasa al elemento?" className={claseInput} />
                </Campo>

                <Campo etiqueta="Foto (opcional)" htmlFor="imagen">
                    <input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImagen(e.target.files[0])}
                        className="block w-full text-sm text-[#64748b] file:mr-4 file:rounded-full file:border-0 file:bg-[#f0fdf4] file:px-4 file:py-2 file:font-semibold file:text-[#2F8F00]"
                    />
                </Campo>

                {error && <p className="text-sm text-[#dc2626]">{error}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <Boton variante="texto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit">Enviar reporte</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalReporteFalla
