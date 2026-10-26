import { Building2, IdCard, Mail, Phone, ShieldCheck } from 'lucide-react'
import foto from '../../../assets/admin/perfil-admin.jpg'

const perfilAdmin = {
    nombres: 'Diana Marcela',
    apellidos: 'Paz Ordóñez',
    rol: 'Administradora',
    correo: 'admin@sena.edu.co',
    telefono: '310 998 7766',
    foto,
    datos: [
        { icono: IdCard, etiqueta: 'Documento', valor: 'C.C. 34568921' },
        { icono: Mail, etiqueta: 'Correo institucional', valor: 'admin@sena.edu.co' },
        { icono: Phone, etiqueta: 'Teléfono', valor: '310 998 7766' },
        { icono: Building2, etiqueta: 'Regional', valor: 'Regional Cauca' },
        { icono: ShieldCheck, etiqueta: 'Permisos', valor: 'Acceso total a centros, inventario y usuarios' },
    ],
}

export default perfilAdmin
