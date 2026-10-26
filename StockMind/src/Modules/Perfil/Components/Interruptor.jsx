// Interruptor tipo "switch" (encendido / apagado)
const Interruptor = ({ etiqueta, activo, onCambiar }) => (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
        <span className="text-sm text-[#081B28]">{etiqueta}</span>
        <input type="checkbox" checked={activo} onChange={onCambiar} className="peer sr-only" />
        <span className="relative h-6 w-11 shrink-0 rounded-full bg-gray-300 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#39A900] peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#39A900]" />
    </label>
)

export default Interruptor
