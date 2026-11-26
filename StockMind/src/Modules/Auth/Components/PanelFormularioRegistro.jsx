import { AnimatePresence, motion } from "motion/react";
import {
  User,
  UserRound,
  CreditCard,
  Phone,
  Mail,
  Lock,
  LoaderCircle,
} from "lucide-react";

import RegistroInput from "./RegistroInput";
import useRegistro from "../Hooks/Registro";
import { registroData } from "../Data/RegistroData";
import CampoArchivo from "../../../Shared/Components/Forms/CampoArchivo";

// Animación reutilizable para errores del select.
const ERROR_ANIMATION = {
  initial: { opacity: 0, y: -4, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -2, height: 0 },
  transition: { duration: 0.2 },
};

// Panel derecho del registro.
// Este panel es el único con scroll; el izquierdo permanece fijo (definido en Register/PanelRegistro).
const PanelFormularioRegistro = () => {
  const {
    register,
    handleSubmit,
    watch,
    registrarUsuario,
    errors,
    isSubmitting,
  } = useRegistro();

  // Integración del campo de archivo con react-hook-form.
  const fotoPerfilInput = register("foto_perfil");
  const fotoPerfil = watch("foto_perfil")?.[0];
  const tipoIdentidadError = errors.tipo_identidad;

  return (
    <section className="w-full overflow-y-auto bg-white px-6 py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-10 sm:py-10 lg:w-[60%] lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="mx-auto w-full max-w-[640px]"
      >
        {/* Encabezado */}
        <header className="mb-8">
          <img
            src={registroData.logo}
            alt="Logo StockMind"
            className="mb-5 h-11 w-auto object-contain sm:h-12"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#39A900]">
            Registro
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#18212f] sm:text-[34px]">
            {registroData.titulo}
          </h1>
          <p className="mt-2 max-w-[520px] text-sm leading-6 text-[#64748b]">
            {registroData.subtitulo}
          </p>
        </header>

        <form onSubmit={handleSubmit(registrarUsuario)} noValidate className="space-y-8">
          {/* Sección: Perfil */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2f8f00]">
                Perfil
              </h2>
              <div className="h-px flex-1 bg-[#e6ede4]" />
            </div>

            <CampoArchivo
              id="foto_perfil"
              name={fotoPerfilInput.name}
              accept="image/jpeg,image/png,image/webp"
              onChange={fotoPerfilInput.onChange}
              onBlur={fotoPerfilInput.onBlur}
              inputRef={fotoPerfilInput.ref}
              archivo={fotoPerfil}
              titulo="Foto de perfil (opcional)"
              placeholder="Selecciona una imagen desde tu dispositivo"
              textoAyuda="JPG, PNG o WEBP."
              compacto
            />
          </div>

          {/* Sección: Datos personales */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2f8f00]">
                Datos personales
              </h2>
              <div className="h-px flex-1 bg-[#e6ede4]" />
            </div>

            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <RegistroInput
                icon={User}
                name="nombre_1"
                label="Primer nombre"
                placeholder="Tu primer nombre"
                register={register}
                error={errors.nombre_1}
                autoComplete="given-name"
                rules={{
                  required: "El primer nombre es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                }}
              />
              <RegistroInput
                icon={User}
                name="nombre_2"
                label="Segundo nombre"
                placeholder="Opcional"
                register={register}
                error={errors.nombre_2}
                autoComplete="additional-name"
              />
            </div>

            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <RegistroInput
                icon={UserRound}
                name="apellido_1"
                label="Primer apellido"
                placeholder="Tu primer apellido"
                register={register}
                error={errors.apellido_1}
                autoComplete="family-name"
                rules={{
                  required: "El primer apellido es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                }}
              />
              <RegistroInput
                icon={UserRound}
                name="apellido_2"
                label="Segundo apellido"
                placeholder="Opcional"
                register={register}
                error={errors.apellido_2}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[0.38fr_1fr]">
              {/* Select con el mismo lenguaje visual que RegistroInput */}
              <div className="mb-3">
                <label
                  htmlFor="tipo_identidad"
                  className="mb-1.5 block text-[13px] font-semibold text-slate-700"
                >
                  Tipo de identidad
                </label>
                <select
                  id="tipo_identidad"
                  autoComplete="off"
                  aria-invalid={Boolean(tipoIdentidadError)}
                  {...register("tipo_identidad", {
                    required: "Selecciona un tipo de identidad",
                  })}
                  className={`min-h-11 w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-[#18212f] outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[#39A900]/15 ${
                    tipoIdentidadError
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-300 hover:border-slate-400 focus:border-[#39A900]"
                  }`}
                >
                  {registroData.tiposIdentidad.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
                <AnimatePresence initial={false}>
                  {tipoIdentidadError && (
                    <motion.p
                      key={tipoIdentidadError.message}
                      {...ERROR_ANIMATION}
                      className="mt-1.5 overflow-hidden px-1 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {tipoIdentidadError.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <RegistroInput
                icon={CreditCard}
                name="numero_identidad"
                label="Número de identidad"
                placeholder="Número de documento"
                register={register}
                error={errors.numero_identidad}
                autoComplete="off"
                rules={{
                  required: "El número de identidad es obligatorio",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" },
                }}
              />
            </div>
          </div>

          {/* Sección: Contacto y acceso */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2f8f00]">
                Contacto y acceso
              </h2>
              <div className="h-px flex-1 bg-[#e6ede4]" />
            </div>

            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <RegistroInput
                icon={Phone}
                name="telefono"
                type="tel"
                label="Teléfono"
                placeholder="Número de teléfono"
                register={register}
                error={errors.telefono}
                autoComplete="tel"
                rules={{
                  required: "El teléfono es obligatorio",
                  minLength: { value: 7, message: "Teléfono no válido" },
                }}
              />
              <RegistroInput
                icon={Mail}
                name="email"
                type="email"
                label="Correo electrónico"
                placeholder="correo@ejemplo.com"
                register={register}
                error={errors.email}
                autoComplete="username"
                rules={{
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo válido",
                  },
                }}
              />
            </div>

            <RegistroInput
              icon={Lock}
              name="password"
              type="password"
              label="Contraseña"
              placeholder="Crea una contraseña segura"
              register={register}
              error={errors.password}
              autoComplete="new-password"
              password
              rules={{
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              }}
            />
          </div>

          {/* Acción principal */}
          <div className="flex flex-col items-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#39A900] px-6 text-sm font-bold tracking-wide text-white shadow-[0_10px_24px_rgba(57,169,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8f00] hover:shadow-[0_14px_28px_rgba(57,169,0,0.28)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto sm:min-w-[220px]"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  <span>REGISTRANDO...</span>
                </>
              ) : (
                registroData.boton
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#94a3b8]">
              Al registrarte, tus datos se usarán para crear tu acceso a StockMind.
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default PanelFormularioRegistro;
