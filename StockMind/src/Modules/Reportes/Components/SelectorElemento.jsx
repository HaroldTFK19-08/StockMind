import { tiposElemento } from '../../Elementos/Data/misElementos'

/**
 * Tarjetas para elegir el elemento dañado (funcionan como radio buttons).
 * Los elementos que ya están dañados o en reparación salen bloqueados.
 */
const SelectorElemento = ({ elementos, register, seleccionado, error }) => (
    <fieldset>
        <legend className="mb-3 text-sm font-semibold text-[#081B28]">¿Qué elemento presenta el daño?</legend>

        <div className="grid gap-3 sm:grid-cols-2">
            {elementos.map((elemento) => {
                const tipo = tiposElemento[elemento.tipo]
                const Icono = tipo.icono
                const bloqueado = elemento.estado !== 'Buen estado'
                const activo = seleccionado === elemento.id

                let clases = 'cursor-pointer border-[#edf2f7] bg-white hover:border-[#cbd5e1]'
                if (activo) clases = 'cursor-pointer border-[#39A900] bg-[#f0fdf4]'
                if (bloqueado) clases = 'cursor-not-allowed border-[#edf2f7] bg-[#F7F9F6] opacity-60'

                return (
                    <label key={elemento.id} className={`flex items-center gap-3 rounded-[16px] border-2 p-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#39A900] ${clases}`}>
                        <input
                            type="radio"
                            value={elemento.id}
                            disabled={bloqueado}
                            className="sr-only"
                            {...register('elementoId', { required: 'Selecciona el elemento dañado' })}
                        />
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#F4F7FA] text-[#39A900]">
                            {tipo.imagen ? <img src={tipo.imagen} alt="" className="h-full w-full object-cover" /> : <Icono size={24} />}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#081B28]">{elemento.nombre}</p>
                            <p className="text-xs text-[#64748b]">{bloqueado ? `Ya está ${elemento.estado.toLowerCase()}` : `Placa ${elemento.placa}`}</p>
                        </div>
                    </label>
                )
            })}
        </div>

        {error && <p className="mt-2 text-sm text-[#dc2626]">{error.message}</p>}
    </fieldset>
)

export default SelectorElemento
