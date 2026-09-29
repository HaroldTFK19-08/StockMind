import pasos from "../Data/Pasos"

export default function Nosotros(){
    return(
        <>
            <section
                id="nosotros"
                className="overflow-hidden bg-white px-[10%] py-20 font-['Poppins']"
            >
                <div className="mx-auto max-w-[1200px]">
                    <div className="mb-[100px] flex flex-col items-center gap-[50px] lg:flex-row">
                        <div className="flex-[1.5]">
                            <span className="relative mb-[15px] block text-[0.9rem] font-bold uppercase tracking-[2px] text-[#39A900]">
                                Nuestra Misión
                            </span>
                            <h2 className="mb-[25px] text-[2.8rem] font-bold leading-[1.1] text-[#111827]">
                                Gestión Inteligente para el SENA
                            </h2>
                            <p className="mb-5 text-[1.05rem] leading-[1.8] text-[#4b5563]">
                                StockMind nace para transformar la administración de
                                recursos institucionales. Facilitamos el registro
                                detallado de cada elemento, permitiendo un control
                                preciso de su{' '}
                                <strong className="font-bold text-[#111827]">
                                    identificación, estado y responsable
                                </strong>{' '}
                                en tiempo real.
                            </p>
                            <p className="mb-5 text-[1.05rem] leading-[1.8] text-[#4b5563]">
                                Nuestra plataforma no solo organiza; optimiza la toma
                                de decisiones mediante reportes detallados y una
                                gestión integral de entradas y salidas, garantizando
                                que cada herramienta esté donde debe estar.
                            </p>
                        </div>
                        <div className="flex flex-1 flex-col gap-5">
                            <div className="rounded-[20px] border border-[#e6e6e7] bg-[#e1e2e3] p-[35px] text-center shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-[5px]">
                                <h3 className="mb-[5px] text-[2.5rem] font-bold text-[#39A900]">
                                    100%
                                </h3>
                                <p className="font-medium text-[#6b7280]">
                                    Control Digital
                                </p>
                            </div>
                            <div className="rounded-[20px] border border-[#e6e6e7] bg-[#e1e2e3] p-[35px] text-center shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-[5px]">
                                <h3 className="mb-[5px] text-[2.5rem] font-bold text-[#39A900]">
                                    Real-Time
                                </h3>
                                <p className="font-medium text-[#6b7280]">
                                    Consultas
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-[50px] text-center">
                            <h3 className="mb-[10px] text-[1.1rem] font-semibold text-[#39A900]">
                                Proceso de Inicio
                            </h3>
                            <h2 className="text-4xl font-bold leading-tight text-[#111827] sm:text-5xl">
                                ¿Cómo empezar en StockMind?
                            </h2>
                        </div>
                        <div className="mx-auto max-w-[1100px]">
                            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-6">
                                {pasos.map((paso, index) => {
                                    const Icono = paso.icono
                                    return (
                                        <div
                                            key={index}
                                            className={`group rounded-[25px] border border-[#f1f5f9] bg-[#f2f5f5] px-[25px] py-10 text-center shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-[15px] hover:border-[#39A900] hover:bg-white hover:shadow-[0_20px_40px_rgba(57,169,0,0.1)] lg:col-span-2 ${
                                                index === 3
                                                    ? 'lg:col-start-2'
                                                    : index === 4
                                                        ? 'lg:col-start-4'
                                                        : ''
                                            }`}
                                        >
                                            <div className="mx-auto mb-5 flex h-[75px] w-[75px] items-center justify-center rounded-full bg-[#f0fdf4] text-[#39A900] transition-all duration-300 group-hover:rotate-[10deg] group-hover:scale-110 group-hover:bg-[#39A900] group-hover:text-white">
                                                <Icono size={30} strokeWidth={2} />
                                            </div>
                                            <h4 className="mb-[15px] text-xl font-semibold text-[#1f2937]">
                                                {paso.titulo}
                                            </h4>
                                            <p className="text-[0.95rem] leading-[1.6] text-[#6b7280]">
                                                {paso.descripcion}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}