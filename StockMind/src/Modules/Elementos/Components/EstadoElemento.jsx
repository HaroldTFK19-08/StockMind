const estilos = {
    'Operativo': 'bg-[#f0fdf4] text-[#2F8F00]',
    'Con daño reportado': 'bg-[#fef2f2] text-[#dc2626]',
    'En mantenimiento': 'bg-[#fffbeb] text-[#b45309]',
}

const EstadoElemento = ({ estado }) => (
    <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            estilos[estado] ?? 'bg-gray-100 text-gray-600'
        }`}
    >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {estado}
    </span>
)

export default EstadoElemento
