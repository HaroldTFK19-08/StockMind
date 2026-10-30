import Modal from '../../../Shared/Components/Modals/Modal'

const CategoriasModal = ({ abierto, onCerrar, nombre, setNombre, descripcion, setDescripcion, onSubmit }) => {
    return (
        <Modal 
            abierto={abierto} 
            titulo="Registrar nueva categoría" 
            descripcion="Completa los datos para agregar una nueva categoría al sistema."
            onCerrar={onCerrar}
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        placeholder="Ej. Tecnología"
                        className="w-full rounded-xl border border-[#edf2f7] p-3 text-sm text-[#1e293b] focus:border-[#39A900] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                        Descripción
                    </label>
                    <textarea 
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="3"
                        placeholder="Ej. Elementos y equipos tecnológicos..."
                        className="w-full rounded-xl border border-[#edf2f7] p-3 text-sm text-[#1e293b] focus:border-[#39A900] focus:outline-none"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button 
                        type="button" 
                        onClick={onCerrar}
                        className="rounded-xl bg-[#f7f9f6] px-4 py-2.5 text-sm font-medium text-[#64748b] hover:bg-[#edf2f7]"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="rounded-xl bg-[#39A900] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#329600]"
                    >
                        Guardar Registro
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CategoriasModal