import { useState } from 'react'
import { KeyRound, LogOut, Pencil } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'

import DatoPerfil from '../Components/DatoPerfil'
import Interruptor from '../Components/Interruptor'
import ModalContrasena from '../Components/ModalContrasena'

/**
 * Página de perfil. La usan todos los roles, cada uno le pasa sus datos:
 * <Perfil usuario={perfilAprendiz} rutaEditar="/aprendiz/perfil/editar" />
 */
const Perfil = ({ usuario, rutaEditar }) => {
    const [notificaciones, setNotificaciones] = useState(true)
    const [correosResumen, setCorreosResumen] = useState(false)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                {/* Columna izquierda: foto y acciones */}
                <div className="space-y-6">
                    <Tarjeta className="text-center">
                        <img
                            src={usuario.foto}
                            alt={nombreCompleto}
                            className="mx-auto mb-4 h-28 w-28 rounded-full border-4 border-[#E8F7E3] object-cover"
                        />
                        <h2 className="text-xl font-bold text-[#081B28]">{nombreCompleto}</h2>
                        <p className="mt-1 text-sm text-[#64748b]">{usuario.rol}</p>
                        <p className="mt-1 break-all text-sm text-[#64748b]">{usuario.correo}</p>
                        <Boton to={rutaEditar} icono={Pencil} className="mt-5 w-full">
                            Editar datos
                        </Boton>
                    </Tarjeta>

                    <Tarjeta titulo="Seguridad">
                        <div className="space-y-2">
                            <Boton variante="secundario" icono={KeyRound} className="w-full" onClick={() => setModalAbierto(true)}>
                                Cambiar contraseña
                            </Boton>
                            <Boton to="/login" variante="peligro" icono={LogOut} className="w-full">
                                Cerrar sesión
                            </Boton>
                        </div>
                    </Tarjeta>
                </div>

                {/* Columna derecha: datos y preferencias */}
                <div className="space-y-6">
                    <Tarjeta titulo="Información personal">
                        <dl className="grid gap-5 sm:grid-cols-2">
                            {usuario.datos.map((dato) => (
                                <DatoPerfil key={dato.etiqueta} icono={dato.icono} etiqueta={dato.etiqueta} valor={dato.valor} />
                            ))}
                        </dl>
                    </Tarjeta>

                    <Tarjeta titulo="Preferencias">
                        <div className="divide-y divide-[#f1f5f9]">
                            <Interruptor
                                etiqueta="Recibir notificaciones en la plataforma"
                                activo={notificaciones}
                                onCambiar={() => setNotificaciones(!notificaciones)}
                            />
                            <Interruptor
                                etiqueta="Recibir un resumen semanal por correo"
                                activo={correosResumen}
                                onCambiar={() => setCorreosResumen(!correosResumen)}
                            />
                        </div>
                    </Tarjeta>
                </div>
            </div>

            <ModalContrasena
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                onGuardada={() => setMensaje('Contraseña actualizada')}
            />
        </section>
    )
}

export default Perfil
