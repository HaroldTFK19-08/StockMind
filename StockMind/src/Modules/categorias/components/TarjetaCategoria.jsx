import { Pencil, Trash2 } from "lucide-react"
import Tarjeta from "../../../Shared/Components/Cards/Tarjeta"

const TarjetaCategoria = ({ categoria, onEditar, onEliminar }) => (
    <Tarjeta className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#39A900]">
                    Categoría #{categoria.id}
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#081B28]">
                    {categoria.nombre}
                </h2>
            </div>
            <div className="flex shrink-0 items-center gap-1">
                <button
                    type="button"
                    onClick={() => onEditar(categoria)}
                    aria-label={`Editar ${categoria.nombre}`}
                    className="rounded-lg p-2 text-[#475569] hover:bg-gray-100"
                >
                    <Pencil size={17} />
                </button>
                <button
                    type="button"
                    onClick={() => onEliminar(categoria)}
                    aria-label={`Eliminar ${categoria.nombre}`}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                >
                    <Trash2 size={17} />
                </button>
            </div>
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-[#64748b]">
            {categoria.descripcion || "Sin descripción"}
        </p>
    </Tarjeta>
)

export default TarjetaCategoria
