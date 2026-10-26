const DatoPerfil = ({ icono: Icono, etiqueta, valor }) => (
    <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#39A900]">
            <Icono size={18} />
        </div>
        <div>
            <dt className="text-xs text-[#64748b]">{etiqueta}</dt>
            <dd className="text-sm font-semibold text-[#081B28]">{valor}</dd>
        </div>
    </div>
)

export default DatoPerfil
