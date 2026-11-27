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
import { Link } from "react-router-dom";

import RegistroInput from "./RegistroInput";
import useRegistro from "../Hooks/Registro";
import { registroData } from "../Data/RegistroData";
import CampoArchivo from "../../../Shared/Components/Forms/CampoArchivo";

const enfocarPrimerError = (erroresFormulario) => {
  const primerCampo = Object.keys(erroresFormulario)[0];
  if (primerCampo) {
    document.getElementById(primerCampo)?.focus({ preventScroll: true });
  }
};

const crearReglasRegistro = (password) => ({
  nombre_1: {
    required: "El primer nombre es obligatorio",
    minLength: { value: 2, message: "Mínimo 2 caracteres" },
  },
  apellido_1: {
    required: "El primer apellido es obligatorio",
    minLength: { value: 2, message: "Mínimo 2 caracteres" },
  },
  tipo_identidad: {
    required: "Selecciona un tipo de identidad",
  },
  numero_identidad: {
    required: "El número de identidad es obligatorio",
    minLength: { value: 5, message: "Mínimo 5 caracteres" },
  },
  telefono: {
    required: "El teléfono es obligatorio",
    minLength: { value: 7, message: "Teléfono no válido" },
  },
  email: {
    required: "El correo es obligatorio",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresa un correo válido",
    },
  },
  password: {
    required: "La contraseña es obligatoria",
    minLength: { value: 8, message: "Mínimo 8 caracteres" },
  },
  password_confirmation: {
    required: "Confirma tu contraseña",
    validate: (valor) => valor === password || "Las contraseñas no coinciden",
  },
});

const SeccionFormulario = ({ titulo, children }) => (
  <div>
    <div className="mb-1 flex items-center gap-2">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2f8f00]">
        {titulo}
      </h2>
      <div className="h-px flex-1 bg-[#e6ede4]" />
    </div>
    {children}
  </div>
);

const SelectIdentidad = ({ register, error, opciones }) => (
  <div className="mb-0.5">
    <label
      htmlFor="tipo_identidad"
      className="mb-1 block text-xs font-semibold text-slate-700"
    >
      Tipo de identidad
    </label>
    <select
      id="tipo_identidad"
      autoComplete="off"
      aria-invalid={Boolean(error)}
      {...register("tipo_identidad")}
      className={`min-h-9 w-full rounded-lg border bg-white px-3 py-2 text-[13px] text-[#18212f] outline-none transition-all duration-200 focus:ring-4 focus:ring-[#39A900]/15 ${
        error
          ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
          : "border-[#d7e1d3] hover:border-slate-400 focus:border-[#39A900]"
      }`}
    >
      <option value="">Selecciona un tipo</option>
      {opciones.map((tipo) => (
        <option key={tipo.value} value={tipo.value}>
          {tipo.label}
        </option>
      ))}
    </select>
    <div className="mt-0.5 h-3 px-1 min-[540px]:h-6 lg:h-3">
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key={error.message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-medium leading-3 text-red-500"
            role="alert"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  </div>
);

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
    mensaje,
  } = useRegistro();

  const password = watch("password");
  const reglas = crearReglasRegistro(password);
  const fotoPerfilInput = register("foto_perfil", {
    onChange: undefined,
  });
  const fotoPerfil = watch("foto_perfil")?.[0];

  // Registra el campo tipo_identidad con sus reglas una sola vez
  const registroTipoIdentidad = register("tipo_identidad", reglas.tipo_identidad);

  return (
    <section className="w-full overflow-y-auto bg-white px-5 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[540px]:w-[58%] min-[540px]:px-5 min-[540px]:pb-3 min-[540px]:pt-7 xl:px-9 xl:py-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="mx-auto w-full max-w-[620px]"
      >
        <header className="mb-1">
          <img
            src={registroData.logo}
            alt="Logo StockMind"
            className="mb-0 h-4 w-auto object-contain"
          />
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#2f8f00]">
            Registro
          </p>
          <h1 className="mt-0.5 text-[17px] font-bold leading-5 tracking-[-0.03em] text-[#18212f]">
            {registroData.titulo}
          </h1>
          <p className="mt-0.5 max-w-[520px] text-[10px] leading-[12px] text-[#64748b]">
            Completa tus datos para comenzar.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(registrarUsuario, enfocarPrimerError)}
          noValidate
          className="space-y-1.5"
        >
          {mensaje && (
            <p role="status" className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-xs leading-5 text-[#166534]">
              {mensaje}
            </p>
          )}
          {errors.root?.server && (
            <p role="alert" className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-xs leading-5 text-[#b42318]">
              {errors.root.server.message}
            </p>
          )}
          <SeccionFormulario titulo="Perfil">
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
          </SeccionFormulario>

          <SeccionFormulario titulo="Datos personales">
            <div className="grid grid-cols-1 gap-x-4 min-[540px]:grid-cols-2">
              <RegistroInput
                icon={User}
                name="nombre_1"
                label="Primer nombre"
                placeholder="Tu primer nombre"
                register={register}
                error={errors.nombre_1}
                autoComplete="given-name"
                rules={reglas.nombre_1}
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

            <div className="grid grid-cols-1 gap-x-4 min-[540px]:grid-cols-2">
              <RegistroInput
                icon={UserRound}
                name="apellido_1"
                label="Primer apellido"
                placeholder="Tu primer apellido"
                register={register}
                error={errors.apellido_1}
                autoComplete="family-name"
                rules={reglas.apellido_1}
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
          </SeccionFormulario>

          <SeccionFormulario titulo="Identificación y contacto">
            <div className="grid grid-cols-1 gap-x-4 min-[540px]:grid-cols-[0.72fr_1.28fr]">
              <SelectIdentidad
                register={() => registroTipoIdentidad}
                error={errors.tipo_identidad}
                opciones={registroData.tiposIdentidad}
              />
              <RegistroInput
                icon={CreditCard}
                name="numero_identidad"
                label="Número de identidad"
                placeholder="Ej. 1023456789"
                register={register}
                error={errors.numero_identidad}
                autoComplete="off"
                rules={reglas.numero_identidad}
              />
            </div>

            <div className="grid grid-cols-1 gap-x-4 min-[540px]:grid-cols-2">
              <RegistroInput
                icon={Phone}
                name="telefono"
                type="tel"
                label="Teléfono"
                placeholder="Ej. 300 123 4567"
                register={register}
                error={errors.telefono}
                autoComplete="tel"
                rules={reglas.telefono}
              />
              <RegistroInput
                icon={Mail}
                name="email"
                type="email"
                label="Correo electrónico"
                placeholder="nombre@correo.com"
                register={register}
                error={errors.email}
                autoComplete="username"
                rules={reglas.email}
              />
            </div>
          </SeccionFormulario>

          <SeccionFormulario titulo="Seguridad">
            <div className="grid grid-cols-1 gap-x-4 min-[540px]:grid-cols-2">
              <RegistroInput
                icon={Lock}
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                register={register}
                error={errors.password}
                autoComplete="new-password"
                password
                rules={reglas.password}
              />
              <RegistroInput
                icon={Lock}
                name="password_confirmation"
                type="password"
                label="Repetir contraseña"
                placeholder="Confirma tu contraseña"
                register={register}
                error={errors.password_confirmation}
                autoComplete="new-password"
                password
                rules={reglas.password_confirmation}
              />
            </div>
          </SeccionFormulario>

          <div className="flex flex-col gap-3 pt-1 min-[540px]:flex-row min-[540px]:items-center min-[540px]:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#2f8f00] px-5 text-xs font-bold text-white shadow-[0_5px_12px_rgba(57,169,0,0.18)] transition-colors hover:bg-[#277500] disabled:cursor-not-allowed disabled:opacity-70 min-[540px]:w-auto"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={15} className="animate-spin" />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  Crear cuenta
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-[#64748b] min-[540px]:text-right">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="font-semibold text-[#2f8f00] hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default PanelFormularioRegistro;