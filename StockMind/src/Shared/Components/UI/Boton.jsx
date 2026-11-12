import { Link } from 'react-router-dom'

// Variantes visuales del botón: mantienen la identidad de color/estilo de StockMind.
const variantes = {
    primario: 'bg-[#2f8f00] text-white shadow-[0_8px_20px_rgba(57,169,0,0.18)] hover:bg-[#277500] hover:shadow-[0_12px_26px_rgba(57,169,0,0.24)]',
    secundario: 'border-2 border-[#e5ece6] bg-white text-[#081B28] shadow-[0_2px_8px_rgba(8,27,40,0.03)] hover:border-[#cbdcc9] hover:bg-[#f8fbf7]',
    peligro: 'border-2 border-[#fecaca] bg-white text-[#dc2626] hover:bg-[#fef2f2] hover:border-[#fca5a5]',
    texto: 'text-[#64748b] hover:bg-[#f3f6f2] hover:text-[#081B28]',
}

/**
 * Botón de la app. Si recibe "to" se comporta como enlace (Link).
 * Ejemplos:
 *   <Boton onClick={guardar}>Guardar</Boton>
 *   <Boton to="/aprendiz/reportes" variante="secundario">Volver</Boton>
 */
const Boton = ({ to, variante = 'primario', icono: Icono, children, className = '', type = 'button', ...props }) => {
    // Clases base compartidas: forma, tipografía, foco accesible y transiciones.
    const clases = `inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-2.5 text-sm font-bold transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${variantes[variante]} ${className}`

    const contenido = (
        <>
            {Icono && <Icono size={16} />}
            {children}
        </>
    )

    if (to) {
        return <Link to={to} className={clases} {...props}>{contenido}</Link>
    }
    return <button type={type} className={clases} {...props}>{contenido}</button>
}

export default Boton
