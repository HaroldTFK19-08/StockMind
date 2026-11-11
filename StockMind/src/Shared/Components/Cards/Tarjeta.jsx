/**
 * Caja blanca base para agrupar contenido.
 * titulo y accion (ej. un botón) son opcionales.
 */
const Tarjeta = ({ titulo, accion, children, className = '' }) => (
    <section className={`surface-card rounded-[20px] border bg-white p-6 ${className}`}>
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
