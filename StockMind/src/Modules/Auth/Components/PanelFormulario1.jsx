import {
    User,
    UserRound,
    CreditCard,
    Phone,
    MapPin,
    Mail,
    Lock,
    LoaderCircle
} from 'lucide-react'

import RegistroInput from './RegistroInput'
import useRegistroAprendiz from "../Hooks/RegistroCampos"
import { registroAprendizData } from "../Data/RegistroAprendizData"

const PaneLFormulario1 = () => {
    const {
        register,
        handleSubmit,
        registrarAprendiz,
        errors,
        isSubmitting
    } = useRegistroAprendiz()

    return (
        <section className="flex w-full items-center justify-center bg-white px-6 py-10 sm:px-10 lg:w-1/2">
            <div className="w-full max-w-[500px]">
                <header className="mb-8 text-center">
                    <img
                        src={registroAprendizData.formulario.logo}
                        alt="StockMind"
                        className="mx-auto mb-5 block w-[145px] object-contain"
                    />

                    <h1 className="text-[30px] font-bold tracking-[-0.5px] text-text-primary">
                        {registroAprendizData.titulo}
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary">
                        {registroAprendizData.subtitulo}
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit(registrarAprendiz)}
                    noValidate
                >
                    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                        <RegistroInput
                            icon={User}
                            name="nombre_1"
                            placeholder="Primer Nombre"
                            register={register}
                            error={errors.nombre_1}
                            rules={{
                                required: 'El primer nombre es obligatorio',
                                minLength: {
                                    value: 2,
                                    message: 'Mínimo 2 caracteres'
                                }
                            }}
                        />

                        <RegistroInput
                            icon={User}
                            name="nombre_2"
                            placeholder="Segundo Nombre"
                            register={register}
                            error={errors.nombre_2}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                        <RegistroInput
                            icon={UserRound}
                            name="apellido_1"
                            placeholder="Primer Apellido"
                            register={register}
                            error={errors.apellido_1}
                            rules={{
                                required: 'El primer apellido es obligatorio',
                                minLength: {
                                    value: 2,
                                    message: 'Mínimo 2 caracteres'
                                }
                            }}
                        />

                        <RegistroInput
                            icon={UserRound}
                            name="apellido_2"
                            placeholder="Segundo Apellido"
                            register={register}
                            error={errors.apellido_2}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[0.4fr_1fr]">
                        <div className="mb-4">
                            <select
                                {...register('tipo_identificacion', {
                                    required:
                                        'Selecciona un tipo de identificación'
                                })}
                                className={`w-full rounded-xl border bg-[#F3F4F6] px-4 py-3.5 text-sm text-text-primary outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-sena/10 ${
                                    errors.tipo_identificacion
                                        ? 'border-red-400'
                                        : 'border-transparent focus:border-sena/30'
                                }`}
                            >
                                {registroAprendizData.tiposIdentificacion.map(
                                    (tipo) => (
                                        <option
                                            key={tipo.value}
                                            value={tipo.value}
                                        >
                                            {tipo.label}
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.tipo_identificacion && (
                                <p className="mt-1 px-1 text-xs font-medium text-red-500">
                                    {errors.tipo_identificacion.message}
                                </p>
                            )}
                        </div>

                        <RegistroInput
                            icon={CreditCard}
                            name="identificacion"
                            placeholder="Número de Identificación"
                            register={register}
                            error={errors.identificacion}
                            rules={{
                                required:
                                    'La identificación es obligatoria',
                                minLength: {
                                    value: 5,
                                    message: 'Mínimo 5 caracteres'
                                }
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                        <RegistroInput
                            icon={Phone}
                            name="telefono"
                            type="tel"
                            placeholder="Teléfono"
                            register={register}
                            error={errors.telefono}
                            rules={{
                                required: 'El teléfono es obligatorio',
                                minLength: {
                                    value: 7,
                                    message: 'Teléfono no válido'
                                }
                            }}
                        />

                        <div className="mb-4">
                            <div className="group relative">
                                <MapPin
                                    size={18}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-sena"
                                />

                                <select
                                    {...register('centro_formacion', {
                                        required:
                                            'Selecciona un centro de formación'
                                    })}
                                    className={`w-full appearance-none rounded-xl border bg-[#F3F4F6] py-3.5 pl-[45px] pr-4 text-sm text-text-primary outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-sena/10 ${
                                        errors.centro_formacion
                                            ? 'border-red-400'
                                            : 'border-transparent focus:border-sena/30'
                                    }`}
                                >
                                    <option value="">
                                        Seleccione Centro
                                    </option>

                                    {registroAprendizData.centros.map(
                                        (centro) => (
                                            <option
                                                key={centro.value}
                                                value={centro.value}
                                            >
                                                {centro.label}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {errors.centro_formacion && (
                                <p className="mt-1 px-1 text-xs font-medium text-red-500">
                                    {errors.centro_formacion.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <RegistroInput
                        icon={Mail}
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        register={register}
                        error={errors.email}
                        rules={{
                            required: 'El correo es obligatorio',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Ingresa un correo válido'
                            }
                        }}
                    />

                    <RegistroInput
                        icon={Lock}
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        register={register}
                        error={errors.password}
                        password
                        rules={{
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'Mínimo 6 caracteres'
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-[30px] bg-sena px-5 py-3.5 font-bold text-white shadow-[0_6px_18px_rgba(57,169,0,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sena-dark hover:shadow-[0_10px_25px_rgba(57,169,0,0.28)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderCircle
                                    size={18}
                                    className="animate-spin"
                                />
                                REGISTRANDO...
                            </>
                        ) : (
                            registroAprendizData.formulario.boton
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default PaneLFormulario1