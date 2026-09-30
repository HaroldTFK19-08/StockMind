const estilos = {
    'Pendiente': 'bg-[#fffbeb] text-[#b45309]',
    'En revisión': 'bg-[#eff6ff] text-[#2563eb]',
    'Resuelto': 'bg-[#f0fdf4] text-[#2F8F00]',
}

const EstadoReporte = ({ estado }) => (
    <span
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
            estilos[estado] ?? 'bg-gray-100 text-gray-600'
        }`}
    >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {estado}
    </span>
)

export default EstadoReporte
