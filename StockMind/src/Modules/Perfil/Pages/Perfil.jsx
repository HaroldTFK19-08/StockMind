import { useState } from 'react'
import { BookOpen, Building2, IdCard, KeyRound, LogOut, Mail, MapPin, Pencil, Phone, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { mensajeError } from '../../../Core/Services/apiUtils'

import DatoPerfil from '../Components/DatoPerfil'
import ModalContrasena from '../Components/ModalContrasena'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario } from '../../Administrador/Services/usuariosService'

const nombreUsuario = (usuario) => [
    usuario?.nombre_1,
    usuario?.nombre_2,
    usuario?.apellido_1,
    usuario?.apellido_2,
].filter(Boolean).join(' ') || usuario?.email || 'Usuario'

const Perfil = ({ rutaEditar }) => {
    const navigate = useNavigate()
    const { usuario: sesion, cerrarSesion } = useAuth()
    const [modalAbierto, setModalAbierto] = useState(false)
    const [errorSesion, setErrorSesion] = useState('')
    const { datos: usuario, cargando, error } = useCarga(
        () => sesion?.id ? obtenerUsuario(sesion.id) : Promise.resolve(null),
        sesion?.id ?? ''
    )

    const nombreCompleto = nombreUsuario(usuario)
    const rol = (usuario?.roles ?? []).map((item) => item.rol).filter(Boolean).join(' · ') || 'Sin rol asignado'
    const ficha = usuario?.apprentice?.coursegroup
    const ambientes = (usuario?.danteaccounts ?? [])
        .map((cuenta) => cuenta.environment?.nombre)
        .filter(Boolean)

    const datos = [
        { icono: IdCard, etiqueta: 'Documento', valor: [usuario?.tipo_identidad, usuario?.numero_identidad].filter(Boolean).join(' ') },
        { icono: Mail, etiqueta: 'Correo', valor: usuario?.email },
        { icono: Phone, etiqueta: 'Teléfono', valor: usuario?.telefono },
        { icono: BookOpen, etiqueta: 'Programa / especialidad', valor: ficha?.programa ?? usuario?.teacher?.especialidad },
        { icono: IdCard, etiqueta: 'Ficha', valor: ficha?.codigo },
        { icono: Building2, etiqueta: 'Instructor', valor: usuario?.teacher?.tipo_instructor },
        { icono: MapPin, etiqueta: 'Ambientes DANTE', valor: ambientes.join(', ') },
    ].filter((dato) => dato.valor)

    const salir = async () => {
        try {
            await cerrarSesion()
            navigate('/login', { replace: true })
        } catch (error) {
            setErrorSesion(mensajeError(error))
        }
    }

    if (cargando) return <p className="py-8 text-center text-sm text-[#64748b]">Cargando tu perfil...</p>
    if (error) return <MensajeError>{error}</MensajeError>
    if (!usuario) return <MensajeError>No se encontró la información del usuario.</MensajeError>

    return (
        <section>
            {errorSesion && <MensajeError>{errorSesion}</MensajeError>}

            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                <div className="space-y-6">
                    <Tarjeta className="text-center">
                        {usuario.foto_perfil ? (
                            <img
                                src={usuario.foto_perfil}
                                alt=""
                                className="mx-auto mb-4 h-28 w-28 rounded-full border-4 border-[#E8F7E3] object-cover"
                            />
                        ) : (
                            <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#E8F7E3] bg-[#f0fdf4] text-[#39A900]">
                                <UserRound size={42} aria-hidden="true" />
                            </div>
                        )}
                        <h2 className="text-xl font-bold text-[#081B28]">{nombreCompleto}</h2>
                        <p className="mt-1 text-sm text-[#64748b]">{rol}</p>
                        <Boton to={rutaEditar} icono={Pencil} className="mt-5 w-full">
                            Editar datos
                        </Boton>
                    </Tarjeta>

                    <Tarjeta titulo="Seguridad">
                        <div className="space-y-2">
                            <Boton variante="secundario" icono={KeyRound} className="w-full" onClick={() => setModalAbierto(true)}>
                                Cambiar contraseña
                            </Boton>
                            <Boton onClick={salir} variante="peligro" icono={LogOut} className="w-full">
                                Cerrar sesión
                            </Boton>
                        </div>
                    </Tarjeta>
                </div>

                <div className="space-y-6">
                    <Tarjeta titulo="Información personal">
                        {datos.length > 0 ? (
                            <dl className="grid gap-5 sm:grid-cols-2">
                                {datos.map((dato) => (
                                    <DatoPerfil key={dato.etiqueta} icono={dato.icono} etiqueta={dato.etiqueta} valor={dato.valor} />
                                ))}
                            </dl>
                        ) : (
                            <p className="text-sm text-[#64748b]">No hay información adicional registrada.</p>
                        )}
                    </Tarjeta>

                    <Tarjeta titulo="Preferencias">
                        <p className="text-sm leading-6 text-[#64748b]">
                            Las preferencias de notificaciones no se pueden guardar todavía porque el backend no ofrece un endpoint para ellas.
                        </p>
                    </Tarjeta>
                </div>
            </div>

            <ModalContrasena
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
            />
        </section>
    )
}

export default Perfil
