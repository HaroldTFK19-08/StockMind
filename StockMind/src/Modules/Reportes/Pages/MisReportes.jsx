import { useState } from 'react'
import { AlertTriangle, FileText } from 'lucide-react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import Boton from '../../../Shared/Components/UI/Boton'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ListaReportes from '../Components/ListaReportes'
import { estadosReporte } from '../Data/reportesData'

const opciones = ['Todos', ...estadosReporte]

/**
 * Reportes hechos por el aprendiz.
 * <MisReportes reportes={reportesDelAprendiz} rutaReportar="/aprendiz/reportes/reportarDano" />
 */
const MisReportes = ({ reportes = [], rutaReportar }) => {
    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('Todos')

    const filtrados = reportes.filter(
        (r) => (estado === 'Todos' || r.estado === estado) && incluyeTexto(r.id + r.elemento + r.placa, busqueda)
    )

    const conteos = { Todos: reportes.length }
    estadosReporte.forEach((e) => (conteos[e] = contarPor(reportes, 'estado', e)))

    if (reportes.length === 0) {
        return (
            <EstadoVacio icono={FileText} titulo="Aún no has reportado daños" descripcion="Cuando un elemento a tu cargo falle, repórtalo para que tu instructor lo revise.">
                <Boton to={rutaReportar}>Reportar un daño</Boton>
            </EstadoVacio>
        )
    }

    return (
        <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#64748b]">Consulta el estado de los daños que has reportado.</p>
                <Boton to={rutaReportar} icono={AlertTriangle}>Reportar daño</Boton>
            </div>

            <SearchBar placeholder="Buscar por número, elemento o placa..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={opciones} valor={estado} onCambiar={setEstado} conteos={conteos} />

            {filtrados.length > 0 ? (
                <ListaReportes reportes={filtrados} />
            ) : (
                <EstadoVacio titulo="Ningún reporte coincide" descripcion="Revisa el número o la placa, o cambia el filtro de estado." />
            )}
        </section>
    )
}

export default MisReportes
