const estilos = {
  verde: "bg-[#f0fdf4] text-[#39A900]",
  ambar: "bg-[#fffbeb] text-[#d97706]",
  azul: "bg-[#eff6ff] text-[#2563eb]",
  rojo: "bg-[#fef2f2] text-[#dc2626]",
};

const StatCard = ({
  etiqueta,
  valor,
  icono: Icono,
  color = "verde",
  detalle,
}) => {
  return (
    <article className="surface-card stat-card flex items-center gap-[15px] rounded-[20px] border bg-white p-5">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${estilos[color]}`}
      >
        <Icono size={19} strokeWidth={2} />
      </div>
      <div>
        <span className="block text-sm font-medium text-[#64748b]">{etiqueta}</span>
        <span className="text-2xl font-bold tracking-tight text-[#132b37]">{valor}</span>
        {detalle && (
          <span className="block text-xs text-[#94a3b8]">{detalle}</span>
        )}
      </div>
    </article>
  );
};

export default StatCard;
