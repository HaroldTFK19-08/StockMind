import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, FileText } from 'lucide-react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'

import ListaReportes from '../Components/ListaReportes'
import useFiltroReportes from '../Hooks/useFiltroReportes'
import reportesData, { estadosReporte } from '../Data/reportesData'

const opcionesEstado = ['Todos', ...estadosReporte]

const Reportes = ({
    reportes = reportesData,
    rutaReportar = '/aprendiz/reportes/reportarDano',
}) => {
    const [mostrarFiltros, setMostrarFiltros] = useState(true)
    const { busqueda, setBusqueda, estado, setEstado, filtrados } = useFiltroReportes(reportes)

    const conteos = Object.fromEntries(
        opcionesEstado.map((opcion) => [
            opcion,
            opcion === 'Todos' ? reportes.length : reportes.filter((r) => r.estado === opcion).length,
        ])
    )

    return (
        <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#64748b]">
                    Consulta el estado de los daños que has reportado.
                </p>

                <Link
                    to={rutaReportar}
                    className="inline-flex items-center justify-center gap-2 rounded-[30px] bg-[#39A900] px-5 py-3 text-sm font-bold text-white shadow-[0_6px_18px_rgba(57,169,0,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2f8f00]"
                >
                    <AlertTriangle size={17} />
                    Reportar daño
                </Link>
            </div>

            <SearchBar
                placeholder="Buscar por número, elemento o placa..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFiltrar={() => setMostrarFiltros((v) => !v)}
            />

            {mostrarFiltros && (
                <FiltroChips
                    opciones={opcionesEstado}
                    valor={estado}
                    onCambiar={setEstado}
                    conteos={conteos}
                />
            )}

            {reportes.length === 0 ? (
                <EstadoVacio
                    icono={FileText}
                    titulo="Aún no has reportado daños"
                    descripcion="Cuando un elemento a tu cargo falle, repórtalo para que tu instructor lo revise."
                >
                    <Link to={rutaReportar} className="text-sm font-semibold text-[#39A900] hover:underline">
                        Reportar un daño
                    </Link>
                </EstadoVacio>
            ) : filtrados.length > 0 ? (
                <ListaReportes reportes={filtrados} />
            ) : (
                <EstadoVacio
                    titulo="Ningún reporte coincide"
                    descripcion="Revisa el número o la placa, o cambia el filtro de estado."
                >
                    <button
                        type="button"
                        onClick={() => {
                            setBusqueda('')
                            setEstado('Todos')
                        }}
                        className="rounded-[12px] border-2 border-[#edf2f7] px-4 py-2 text-sm font-semibold text-[#081B28] hover:border-[#cbd5e1]"
                    >
                        Limpiar filtros
                    </button>
                </EstadoVacio>
            )}
        </section>
    )
}

export default Reportes
