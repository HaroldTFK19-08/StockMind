import { useState } from 'react'
import { GraduationCap, Plus, UserCog, Users, Warehouse } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { incluyeTexto } from '../../../Shared/Utils/texto'

import usuariosData, { roles } from '../Data/usuariosData'
import { useCentros } from '../../Centros/Hooks/Centros'

const usuarioVacio = { nombre: '', correo: '', rol: 'Instructor', centro: '' }

// Iniciales para el avatar: "Carlos Ruiz" -> "CR"
const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('')

// Cuenta cuántos usuarios tienen un rol (un usuario puede tener varios)
const contarRol = (usuarios, rol) => usuarios.filter((u) => u.roles.includes(rol)).length

// Gestión de usuarios (Administrador)
const Usuarios = () => {
    const { centros, cargando: cargandoCentros, error: errorCentros } = useCentros()
    const [usuarios, setUsuarios] = useState(usuariosData)
    const [busqueda, setBusqueda] = useState('')
    const [rol, setRol] = useState('Todos')
    const [modalAbierto, setModalAbierto] = useState(false)
    const [nuevo, setNuevo] = useState(usuarioVacio)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    const filtrados = usuarios.filter(
        (u) => (rol === 'Todos' || u.roles.includes(rol)) && incluyeTexto(u.nombre + u.correo, busqueda)
    )

    const conteos = { Todos: usuarios.length }
    roles.forEach((r) => (conteos[r] = contarRol(usuarios, r)))

    const alternarActivo = (id) => {
        setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)))
    }

    const cambiarCampo = (evento) => setNuevo({ ...nuevo, [evento.target.name]: evento.target.value })

    const guardarUsuario = (evento) => {
        evento.preventDefault()
        if (!nuevo.nombre.trim() || !nuevo.correo.includes('@')) return setError('Escribe el nombre y un correo válido')
        if (!centros.some((centro) => String(centro.id) === nuevo.centro)) return setError('Selecciona un centro válido')

        setUsuarios([{ id: Date.now(), nombre: nuevo.nombre, correo: nuevo.correo, roles: [nuevo.rol], centro: nuevo.centro, activo: true }, ...usuarios])
        setMensaje(`Se creó el usuario ${nuevo.nombre}`)
        setNuevo(usuarioVacio)
        setError('')
        setModalAbierto(false)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {errorCentros && <MensajeError>{errorCentros}</MensajeError>}

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Usuarios" valor={usuarios.length} icono={Users} />
                <StatCard etiqueta="Instructores" valor={conteos.Instructor} icono={UserCog} color="azul" />
                <StatCard etiqueta="Cuentadantes" valor={conteos.Cuentadante} icono={Warehouse} color="ambar" />
                <StatCard etiqueta="Aprendices" valor={conteos.Aprendiz} icono={GraduationCap} color="rojo" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Usuarios</h2>
                <Boton icono={Plus} onClick={() => setModalAbierto(true)}>Nuevo usuario</Boton>
            </div>

            <SearchBar placeholder="Buscar por nombre o correo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={['Todos', ...roles]} valor={rol} onCambiar={setRol} conteos={conteos} />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((usuario) => (
                        <Tarjeta key={usuario.id} className="flex h-full flex-col">
                            <div className="flex items-center gap-3">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F7E3] text-sm font-bold text-[#2F8F00]">
                                    {iniciales(usuario.nombre)}
                                </span>
                                <div className="min-w-0">
                                    <h3 className="truncate font-bold text-[#081B28]">{usuario.nombre}</h3>
                                    <p className="truncate text-sm text-[#64748b]">{usuario.correo}</p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-1">
                                {usuario.roles.map((r) => (
                                    <span key={r} className="rounded-full bg-[#F4F7FA] px-2.5 py-1 text-xs font-semibold text-[#475569]">{r}</span>
                                ))}
                            </div>
                            <dl className="mt-4 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                <dt className="text-xs text-[#64748b]">Centro</dt>
                                <dd className="font-semibold text-[#081B28]">{centros.find((centro) => String(centro.id) === String(usuario.centro))?.nombre ?? usuario.centro}</dd>
                                <dt className="mt-3 text-xs text-[#64748b]">Estado</dt>
                                <dd className="mt-1"><EstadoBadge estado={usuario.activo ? 'Activo' : 'Inactivo'} /></dd>
                            </dl>
                            <Boton variante={usuario.activo ? 'peligro' : 'secundario'} className="mt-4 w-full" onClick={() => alternarActivo(usuario.id)}>
                                {usuario.activo ? 'Desactivar' : 'Activar'}
                            </Boton>
                        </Tarjeta>
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="No hay usuarios con ese filtro" descripcion="Busca por otro nombre o cambia el rol." />
            )}

            <Modal abierto={modalAbierto} titulo="Nuevo usuario" onCerrar={() => setModalAbierto(false)} ancho="max-w-[480px]">
                <form onSubmit={guardarUsuario} className="space-y-4">
                    <Campo etiqueta="Nombre completo" htmlFor="nombre">
                        <input id="nombre" name="nombre" value={nuevo.nombre} onChange={cambiarCampo} className={claseInput} />
                    </Campo>
                    <Campo etiqueta="Correo institucional" htmlFor="correo">
                        <input id="correo" name="correo" type="email" value={nuevo.correo} onChange={cambiarCampo} className={claseInput} />
                    </Campo>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Rol" htmlFor="rol">
                            <select id="rol" name="rol" value={nuevo.rol} onChange={cambiarCampo} className={claseInput}>
                                {roles.map((r) => <option key={r}>{r}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Centro" htmlFor="centro">
                            <select id="centro" name="centro" value={nuevo.centro} onChange={cambiarCampo} className={claseInput} required disabled={cargandoCentros || centros.length === 0}>
                                <option value="">{cargandoCentros ? 'Cargando centros...' : 'Selecciona un centro'}</option>
                                {centros.map((centro) => <option key={centro.id} value={centro.id}>{centro.nombre}</option>)}
                            </select>
                        </Campo>
                    </div>
                    {error && <p className="text-sm text-[#dc2626]">{error}</p>}
                    <div className="flex justify-end gap-2 pt-2">
                        <Boton variante="texto" onClick={() => setModalAbierto(false)}>Cancelar</Boton>
                        <Boton type="submit">Crear usuario</Boton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}

export default Usuarios
