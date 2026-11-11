// Color de cada estado que usa la app
const colores = {
    verde: ['Buen estado', 'Resuelto', 'Activo', 'Activa', 'Completado', 'Entrada', 'Disponible', 'Bueno', 'Urbana'],
    ambar: ['Pendiente', 'En reparación', 'Media', 'En mantenimiento', 'Regular', 'Rural'],
    azul: ['En revisión', 'En tránsito', 'Baja', 'Salida', 'Asignado', 'Prestado', 'En traslado'],
    rojo: ['Dañado', 'Urgente', 'Alta', 'Inactivo', 'Malo', 'Dado de baja'],
}

const estilos = {
    verde: 'bg-[#f0fdf4] text-[#2F8F00]',
    ambar: 'bg-[#fffbeb] text-[#b45309]',
    azul: 'bg-[#eff6ff] text-[#2563eb]',
    rojo: 'bg-[#fef2f2] text-[#dc2626]',
    gris: 'bg-gray-100 text-gray-600',
}

const buscarColor = (estado) =>
    Object.keys(colores).find((color) => colores[color].includes(estado)) ?? 'gris'

const EstadoBadge = ({ estado }) => (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${estilos[buscarColor(estado)]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {estado}
    </span>
)

export default EstadoBadge
