import PaneLAprendiz from '../Components/PanelAprendiz'
import PaneLFormulario1 from '../Components/PanelFormulario1'

const RegistroAprendiz = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-8">
            <div className="flex min-h-[600px] w-full max-w-[1000px] overflow-hidden rounded-[20px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.10)]">
                <PaneLAprendiz />
                <PaneLFormulario1 />
            </div>
        </main>
    )
}

export default RegistroAprendiz