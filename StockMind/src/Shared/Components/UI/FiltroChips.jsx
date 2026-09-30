/**
 * Fila de botones para filtrar por una opción (ej. estado).
 * opciones: array de strings. valor: opción activa.
 */
const FiltroChips = ({ opciones = [], valor, onCambiar, conteos = {} }) => (
    <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {opciones.map((opcion) => {
            const activo = opcion === valor
            return (
                <button
                    key={opcion}
                    type="button"
                    aria-pressed={activo}
                    onClick={() => onCambiar(opcion)}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                        activo
                            ? 'border-[#39A900] bg-[#39A900] text-white'
                            : 'border-[#edf2f7] bg-white text-[#475569] hover:border-[#cbd5e1]'
                    }`}
                >
                    {opcion}
                    {conteos[opcion] !== undefined && (
                        <span className={`ml-2 ${activo ? 'text-white/80' : 'text-[#94a3b8]'}`}>
                            {conteos[opcion]}
                        </span>
                    )}
                </button>
            )
        })}
    </div>
)

export default FiltroChips
