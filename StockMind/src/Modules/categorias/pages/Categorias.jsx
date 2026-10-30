import StatCard from "../../../Shared/Components/Cards/StatCard"
import { useCategorias } from "../hook/categoria"
import { Layers,Plus } from "lucide-react"
import Tabla from "../../../Shared/Components/Tables/Tabla"
import {useCategoriasModal} from "../hook/useModal"
import CategoriasModal from "../components/ModalCategoria"
const Categorias = () => {
    const { categorias, loading, error } = useCategorias();
    const modal = useCategoriasModal();
    // 3. Manejador local del formulario (sin API POST por ahora)
    const handleSubmitLocal = (e) => {
        e.preventDefault()
        console.log('Datos locales del formulario:', { 
            nombre: modal.nombre, 
            descripcion: modal.descripcion 
        })
        
        // Cerramos el modal y limpiamos los campos localmente
        modal.cerrarModal()
    }
    if(error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="p-6 space-y-6">
            {/* tarjeta contador*/}
            <div className="flex items-center justify-between">
                <div className="w-full sm:w-1/3">
                    <StatCard 
                        etiqueta="Total de Categorías" 
                        valor={loading ? 'Cargando...' : categorias.length} 
                        icono={Layers} 
                        color="verde" 
                    />
                </div>
                <button 
                    onClick={modal.abrirModal}
                    className="flex items-center gap-2 rounded-xl bg-[#39A900] px-4 py-2.5 text-white font-medium hover:bg-[#329600] transition-colors"
                >
                    <Plus size={20} />
                    Nueva Categoría
                </button>
            </div>

            <Tabla columnas={['Nombre', 'Descripción']}>
                {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                        <td className="font-medium text-[#1e293b]">
                            {categoria.nombre}
                        </td>
                        <td className="text-[#64748b]">
                            {categoria.descripcion || 'Sin descripción'}
                        </td>
                    </tr>
                ))}
            </Tabla>
            <CategoriasModal
                abierto={modal.modalAbierto}
                onCerrar={modal.cerrarModal}
                nombre={modal.nombre}
                setNombre={modal.setNombre}
                descripcion={modal.descripcion}
                setDescripcion={modal.setDescripcion}
                onSubmit={handleSubmitLocal}
            />
        </div>
    )
}

export default Categorias;