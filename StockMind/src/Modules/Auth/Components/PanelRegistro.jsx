import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { House, LogIn, CircleHelp, ArrowLeft } from "lucide-react";

import Sena from "../../../assets/SENAblanco.svg";

// Panel lateral informativo del registro (desktop).
// Contenido compacto y centrado para verse completo sin scroll.
const PanelRegistro = () => {
  const navigate = useNavigate();

  return (
    <aside className="relative hidden min-[540px]:flex min-[540px]:w-[42%] overflow-hidden bg-[#39A900] text-white">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#b7ff8a]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />

      {/* Botón volver */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/18"
      >
        <ArrowLeft size={16} />
        <span>Volver</span>
      </button>

      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative z-10 flex h-full w-full flex-col justify-between px-6 pb-6 pt-20 xl:px-9 xl:pb-8"
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 backdrop-blur-sm">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/12">
            <img src={Sena} alt="Logo SENA" className="h-5 w-5 object-contain" />
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/70">Plataforma SENA</p>
            <p className="text-xs font-bold leading-tight">StockMind</p>
          </div>
        </div>

        <div className="my-auto py-10">
          <h2 className="max-w-[340px] text-[22px] font-bold leading-[1.12] tracking-[-0.03em] xl:text-[32px]">
            Crea tu cuenta y gestiona con claridad
          </h2>
          <p className="mt-3 max-w-[300px] text-xs leading-5 text-white/85">
            Controla inventario, movimientos y reportes desde un solo lugar.
          </p>
        </div>

        <nav>
          <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] text-white/65">
            Accesos rápidos
          </p>
          <ul className="flex flex-wrap gap-1.5">
            <li>
              <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-white/20">
                <House size={12} />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/login" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-white/20">
                <LogIn size={12} />
                <span>Iniciar sesión</span>
              </Link>
            </li>
            <li>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-white/20">
                <CircleHelp size={12} />
                <span>Ayuda</span>
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>
    </aside>
  );
};

export default PanelRegistro;
