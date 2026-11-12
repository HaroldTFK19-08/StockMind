import { motion } from "motion/react";

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
    <motion.article
      // Entrada y hover con motion para tarjetas de estadísticas.
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      className="flex items-center gap-[15px] rounded-[20px] border border-[#e9efea] bg-white p-5 shadow-[0_8px_24px_rgba(8,27,40,0.04)] transition-[box-shadow,border-color] duration-[220ms] hover:border-[#dce8dd] hover:shadow-[0_14px_32px_rgba(8,27,40,0.07)]"
    >
      <motion.div
        // Microanimación del ícono para dar más vida a la tarjeta.
        whileHover={{ scale: 1.06, rotate: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${estilos[color]}`}
      >
        <Icono size={19} strokeWidth={2} />
      </motion.div>
      <div>
        <span className="block text-sm font-medium text-[#64748b]">{etiqueta}</span>
        <span className="text-2xl font-bold tracking-tight text-[#132b37]">{valor}</span>
        {detalle && (
          <span className="block text-xs text-[#94a3b8]">{detalle}</span>
        )}
      </div>
    </motion.article>
  );
};

export default StatCard;
