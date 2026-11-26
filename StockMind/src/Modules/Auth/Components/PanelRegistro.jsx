import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { House, LogIn, CircleHelp, ArrowLeft, ShieldCheck, Boxes } from "lucide-react";

import Sena from "../../../assets/SENAblanco.svg";

// Panel lateral informativo del registro (desktop).
// Contenido compacto y centrado para verse completo sin scroll.
const PanelRegistro = () => {
  const navigate = useNavigate();

  return (
    <aside className="relative hidden w-[40%] overflow-hidden bg-[linear-gradient(160deg,#287a00_0%,#39A900_48%,#2f8f00_100%)] text-white lg:flex">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#b7ff8a]/12 blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent)]" />
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
        className="relative z-10 flex h-full w-full flex-col justify-center px-8 pb-8 pt-20 xl:px-10 xl:pb-10 xl:pt-20"
      >
        {/* Marca */}
        <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5 backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12">
            <img src={Sena} alt="Logo SENA" className="h-7 w-7 object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">Plataforma</p>
            <p className="text-base font-bold leading-none tracking-[-0.02em]">StockMind</p>
          </div>
        </div>

        {/* Mensaje principal */}
        <h2 className="max-w-[340px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] xl:text-[36px]">
          Crea tu cuenta
          <span className="block text-white/90">y gestiona con confianza</span>
        </h2>
        <p className="mt-3 max-w-[350px] text-sm leading-6 text-white/85">
          Accede a StockMind para administrar inventario, movimientos y reportes de forma clara.
        </p>

        {/* Beneficios compactos */}
        <div className="mt-7 space-y-2.5">
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <ShieldCheck size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold">Datos protegidos</p>
              <p className="text-xs leading-5 text-white/78">Tu información se usa para crear tu acceso.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Boxes size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold">Gestión centralizada</p>
              <p className="text-xs leading-5 text-white/78">Controla elementos y movimientos en un solo lugar.</p>
            </div>
          </div>
        </div>

        {/* Accesos rápidos */}
        <nav className="mt-7">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">Accesos rápidos</p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/12 hover:text-white">
                <House size={16} />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/12 hover:text-white">
                <LogIn size={16} />
                <span>Iniciar sesión</span>
              </Link>
            </li>
            <li>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/12 hover:text-white">
                <CircleHelp size={16} />
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
