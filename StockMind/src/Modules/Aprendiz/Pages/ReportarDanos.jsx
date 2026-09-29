import BarraSuperiorAprendiz from '../Components/BarraSuperiorAprendiz'
import FormularioReporteDano from '../Components/FormularioReporteDano'
import StockMind from '../../../assets/LOGO FULL.svg'

const ReportarDanos = () => {
    return (
        <div className="flex min-h-screen w-full flex-col px-[60px] py-5">
            <BarraSuperiorAprendiz />

            <main className="w-full max-w-[900px]">
                <section className="relative mb-[25px] overflow-hidden rounded-[15px] bg-linear-to-br from-[#61b83c] to-[#588b49] p-[30px] text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="mb-2 text-[1.8rem] font-bold">
                                Centro de Reportes
                            </h1>

                            <p className="m-0 max-w-[500px] text-base opacity-90">
                                Gestiona las fallas técnicas de tus elementos asignados.
                            </p>
                        </div>

                        <img
                            src={StockMind}
                            alt="Logo StockMind"
                            className="absolute right-[30px] top-[60%] w-[90px] -translate-y-1/2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                        />
                    </div>
                </section>

                <FormularioReporteDano />
            </main>
        </div>
    )
}

export default ReportarDanos

