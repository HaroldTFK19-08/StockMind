import { AnimatePresence, motion } from 'motion/react'
import {
    User,
    UserRound,
    CreditCard,
    Phone,
    Mail,
    Lock,
    LoaderCircle
} from 'lucide-react'

import RegistroInput from './RegistroInput'
import useRegistro from "../Hooks/Registro"
import { registroData } from "../Data/RegistroData"
import CampoArchivo from '../../../Shared/Components/Forms/CampoArchivo'

// Panel del formulario de registro (lado derecho en desktop).
// Mantiene la lógica del hook useRegistro y la estructura del módulo Auth.
const PanelFormularioRegistro = () => {
    const {
        register,
        handleSubmit,
        watch,
        registrarUsuario,
        errors,
        isSubmitting
    } = useRegistro()

    // Registro manual del input de archivo para integrarlo con react-hook-form.
    const fotoPerfilInput = register('foto_perfil')
    const fotoPerfil = watch('foto_perfil')?.[0]

    return (
        <section className="flex w-full items-center justify-center bg-white px-4 py-8 sm:px-8 sm:py-10 lg:w-[58%] lg:px-10 lg:py-10">
            <motion.div
                // Entrada suave del panel para una experiencia más moderna.
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                className="w-full max-w-[560px]"
            >
                {/* Encabezado del formulario */}
                <header className="mb-6 text-center">
                    <img
                        src={registroData.logo}
                        alt="StockMind"
                        className="mx-auto mb-3 block w-[112px] object-contain sm:w-[124px]"
                    />
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#39A900]">Registro</p>
                    <h1 className="text-2xl font-bold tracking-[-0.5px] text-text-primary sm:text-[32px]">
                        {registroData.titulo}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {registroData.subtitulo}
                    </p>
                </header>

                <form onSubmit={handleSubmit(registrarUsuario)} noValidate className="space-y-5">
                    {/* Sección: foto de perfil */}
                    <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4">
                        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#2F8F00]">Perfil</h2>
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
                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2F8F00]">Datos personales</h2>

                        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                            <RegistroInput
                                icon={User}
                                name="nombre_1"
                                label="Primer nombre"
                                placeholder="Primer nombre"
                                register={register}
                                error={errors.nombre_1}
                                autoComplete="given-name"
                                rules={{
                                    required: 'El primer nombre es obligatorio',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
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

                        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                            <RegistroInput
                                icon={UserRound}
                                name="apellido_1"
                                label="Primer apellido"
                                placeholder="Primer apellido"
                                register={register}
                                error={errors.apellido_1}
                                autoComplete="family-name"
                                rules={{
                                    required: 'El primer apellido es obligatorio',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
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

                        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[0.42fr_1fr]">
                            <div className="mb-3">
                                <label htmlFor="tipo_identidad" className="mb-1.5 block text-[13px] font-semibold text-slate-700">
                                    Tipo de identidad
                                </label>
                                <select
                                    id="tipo_identidad"
                                    autoComplete="off"
                                    {...register('tipo_identidad', { required: 'Selecciona un tipo de identidad' })}
                                    className={`min-h-11 w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-text-primary outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-sena/20 ${
                                        errors.tipo_identidad
                                            ? 'border-red-400'
                                            : 'border-slate-300 hover:border-slate-400 focus:border-sena'
                                    }`}
                                >
                                    {registroData.tiposIdentidad.map((tipo) => (
                                        <option key={tipo.value} value={tipo.value}>
                                            {tipo.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Error animado del select (mismo patrón visual que RegistroInput) */}
                                <AnimatePresence initial={false}>
                                    {errors.tipo_identidad && (
                                        <motion.p
                                            key={errors.tipo_identidad.message}
                                            initial={{ opacity: 0, y: -4, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, y: -2, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="mt-1 overflow-hidden px-1 text-xs font-medium text-red-500"
                                        >
                                            {errors.tipo_identidad.message}
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
                                    required: 'El número de identidad es obligatorio',
                                    minLength: { value: 5, message: 'Mínimo 5 caracteres' }
                                }}
                            />
                        </div>
                    </section>

                    {/* Sección: contacto y acceso */}
                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2F8F00]">Contacto y acceso</h2>

                        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
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
                                    required: 'El teléfono es obligatorio',
                                    minLength: { value: 7, message: 'Teléfono no válido' }
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
                                    required: 'El correo es obligatorio',
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresa un correo válido' }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 sm:items-end">
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
                                    required: 'La contraseña es obligatoria',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                }}
                            />

                            {/* Botón principal de registro */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mb-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2f8f00] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(57,169,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#277500] hover:shadow-[0_12px_26px_rgba(57,169,0,0.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle size={18} className="animate-spin" />
                                        REGISTRANDO...
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
    )
}

export default PanelFormularioRegistro