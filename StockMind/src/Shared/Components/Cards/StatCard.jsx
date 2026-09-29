const StatCard = ({
    etiqueta,
    valor,
    icono: Icono,
    color = 'verde'
}) => {
    const estilos = {
        verde: 'bg-[#f0fdf4] text-[#39A900]',
        ambar: 'bg-[#fffbeb] text-[#d97706]',
        azul: 'bg-[#eff6ff] text-[#2563eb]'
    }

    return (
        <article className="flex items-center gap-[15px] rounded-[20px] border border-[#f1f5f9] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
            <div
                className={`flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[12px] ${estilos[color]}`}
            >
                <Icono size={19} strokeWidth={2} />
            </div>

            <div>
                <span className="block text-[0.85rem] text-[#64748b]">
                    {etiqueta}
                </span>

                <span className="text-[1.4rem] font-bold text-[#1e293b]">
                    {valor}
                </span>
            </div>
        </article>
    )
}

export default StatCard

