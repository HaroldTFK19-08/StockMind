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

const ERROR_ANIMATION = {
  initial: { opacity: 0, y: -4, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -2, height: 0 },
  transition: { duration: 0.2 },
};

// Clases compactas para que el formulario quepa en pantalla sin scroll.
const SECTION_CLASS = "rounded-2xl border border-slate-200/80 p-3 sm:p-3.5";
const SECTION_TITLE_CLASS =
  "mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2f8f00]";

// Panel del formulario de registro (lado derecho en desktop).
const PanelFormularioRegistro = () => {
  const {
    register,
    handleSubmit,
    watch,
    registrarUsuario,
    errors,
    isSubmitting,
  } = useRegistro();

  const fotoPerfilInput = register("foto_perfil");
  const fotoPerfil = watch("foto_perfil")?.[0];
  const tipoIdentidadError = errors.tipo_identidad;

  return (
    <section className="flex w-full items-center justify-center overflow-y-auto bg-white px-4 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:w-[60%] lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="w-full max-w-[620px]"
      >
        {/* Encabezado compacto para maximizar espacio del formulario */}
        <header className="mb-3 text-center">
          <img
            src={registroData.logo}
            alt="StockMind"
            className="mx-auto mb-1.5 block w-[92px] object-contain sm:w-[104px]"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#39a900]">Registro</p>
          <h1 className="text-2xl font-bold tracking-[-0.5px] text-text-primary sm:text-[28px]">
            {registroData.titulo}
          </h1>
          <p className="mt-0.5 text-sm text-text-secondary">{registroData.subtitulo}</p>
        </header>

        <form
          onSubmit={handleSubmit(registrarUsuario)}
          noValidate
          className="space-y-3"
        >
          {/* Sección: foto de perfil */}
          <section className={`${SECTION_CLASS} bg-[#fbfdfb]`}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2f8f00]">Perfil</h2>
              <span className="text-[11px] text-[#64748b]">Opcional</span>
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
          </section>

          {/* Sección: datos personales */}
          <section className={`${SECTION_CLASS} bg-white`}>
            <h2 className={SECTION_TITLE_CLASS}>Datos personales</h2>

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <RegistroInput
                icon={User}
                name="nombre_1"
                label="Primer nombre"
                placeholder="Primer nombre"
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
                placeholder="Segundo nombre"
                register={register}
                error={errors.nombre_2}
                autoComplete="additional-name"
              />
            </div>

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <RegistroInput
                icon={UserRound}
                name="apellido_1"
                label="Primer apellido"
                placeholder="Primer apellido"
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
                placeholder="Segundo apellido"
                register={register}
                error={errors.apellido_2}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-[0.44fr_1fr]">
              <div className="mb-2.5">
                <label
                  htmlFor="tipo_identidad"
                  className="mb-1 block text-[13px] font-semibold text-slate-700"
                >
                  Tipo ID
                </label>
                <select
                  id="tipo_identidad"
                  autoComplete="off"
                  aria-invalid={Boolean(tipoIdentidadError)}
                  {...register("tipo_identidad", {
                    required: "Selecciona un tipo de identidad",
                  })}
                  className={`min-h-10 w-full rounded-xl border bg-slate-50 px-3 py-2 text-sm text-text-primary outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-sena/20 ${
                    tipoIdentidadError
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                      : "border-slate-300 hover:border-slate-400 focus:border-sena"
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
                      className="mt-1 overflow-hidden px-1 text-xs font-medium text-red-500"
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
                placeholder="Número de identidad"
                register={register}
                error={errors.numero_identidad}
                autoComplete="off"
                rules={{
                  required: "El número de identidad es obligatorio",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" },
                }}
              />
            </div>
          </section>

          {/* Sección: contacto y acceso */}
          <section className={`${SECTION_CLASS} bg-white`}>
            <h2 className={SECTION_TITLE_CLASS}>Contacto y acceso</h2>

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <RegistroInput
                icon={Phone}
                name="telefono"
                type="tel"
                label="Teléfono"
                placeholder="Teléfono"
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
                placeholder="Correo electrónico"
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

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <RegistroInput
                icon={Lock}
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Contraseña"
                register={register}
                error={errors.password}
                autoComplete="new-password"
                password
                rules={{
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="mb-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2f8f00] px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(57,169,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#277500] hover:shadow-[0_12px_26px_rgba(57,169,0,0.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:min-w-[170px]"
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
            </div>
          </section>
        </form>
      </motion.div>
    </section>
  );
};

export default PanelFormularioRegistro;
