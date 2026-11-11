/**
 * Caja blanca base para agrupar contenido.
 * titulo y accion (ej. un botón) son opcionales.
 */
const Tarjeta = ({ titulo, accion, children, className = '' }) => (
    <section className={`rounded-[20px] border border-[#e9efea] bg-white p-6 shadow-[0_8px_24px_rgba(8,27,40,0.04)] transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#dce8dd] hover:shadow-[0_14px_32px_rgba(8,27,40,0.07)] ${className}`}>
        {(titulo || accion) && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                {titulo && <h2 className="text-base font-bold text-[#081B28]">{titulo}</h2>}
                {accion}
            </div>
        )}
        {children}
    </section>
)

export default Tarjeta
