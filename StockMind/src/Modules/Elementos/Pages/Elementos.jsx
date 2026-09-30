import { useState } from 'react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'

import TarjetaElemento from '../Components/TarjetaElemento'
import useFiltroElementos from '../Hooks/useFiltroElementos'
import elementosData, { estadosElemento } from '../Data/elementosData'

const opcionesEstado = ['Todos', ...estadosElemento]

const Elementos = ({
    elementos = elementosData,
    rutaReportar = '/aprendiz/reportes/reportarDano',
}) => {
    const [mostrarFiltros, setMostrarFiltros] = useState(true)
    const { busqueda, setBusqueda, estado, setEstado, filtrados } = useFiltroElementos(elementos)

    const conteos = Object.fromEntries(
        opcionesEstado.map((opcion) => [
            opcion,
            opcion === 'Todos' ? elementos.length : elementos.filter((e) => e.estado === opcion).length,
        ])
    )

    return (
        <section>
            <p className="mb-6 text-sm text-[#64748b]">
                Estos son los elementos que tienes a cargo. Si alguno presenta una falla, repórtala desde su tarjeta.
            </p>

            <SearchBar
                placeholder="Buscar por nombre, placa o serial..."
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

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((elemento) => (
                        <TarjetaElemento
                            key={elemento.id}
                            elemento={elemento}
                            rutaReportar={rutaReportar}
                        />
                    ))}
                </div>
            ) : (
                <EstadoVacio
                    titulo="No hay elementos con ese filtro"
                    descripcion="Prueba con otra placa o serial, o quita el filtro de estado."
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

export default Elementos
