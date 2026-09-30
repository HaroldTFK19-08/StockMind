import { useState } from 'react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import TarjetaElemento from '../Components/TarjetaElemento'
import misElementos from '../Data/misElementos'
import { estadosElemento } from '../Data/inventarioData'

const opciones = ['Todos', ...estadosElemento]

// Elementos que tiene a cargo el aprendiz
const MisElementos = ({ elementos = misElementos, rutaReportar = '/aprendiz/reportes/reportarDano' }) => {
    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('Todos')

    const filtrados = elementos.filter((elemento) => {
        const coincideEstado = estado === 'Todos' || elemento.estado === estado
        const coincideTexto = incluyeTexto(elemento.nombre + elemento.placa + elemento.serial, busqueda)
        return coincideEstado && coincideTexto
    })

    // { Todos: 5, 'Buen estado': 3, ... }
    const conteos = { Todos: elementos.length }
    estadosElemento.forEach((e) => (conteos[e] = contarPor(elementos, 'estado', e)))

    return (
        <section>
            <p className="mb-6 text-sm text-[#64748b]">
                Estos son los elementos que tienes a cargo. Si alguno falla, repórtalo desde su tarjeta.
            </p>

            <SearchBar placeholder="Buscar por nombre, placa o serial..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={opciones} valor={estado} onCambiar={setEstado} conteos={conteos} />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((elemento) => (
                        <TarjetaElemento key={elemento.id} elemento={elemento} rutaReportar={rutaReportar} />
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="No hay elementos con ese filtro" descripcion="Prueba con otra placa o serial, o cambia el estado." />
            )}
        </section>
    )
}

export default MisElementos
