import PaneLIzquierdo from '../Components/PanelIzquierdo'
import PaneLFormulario from '../Components/PanelFormulario'

const RegisterInstructor = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-8">
            <div className="flex min-h-[600px] w-full max-w-[1000px] overflow-hidden rounded-[20px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.10)]">
                <PaneLIzquierdo />
                <PaneLFormulario />
            </div>
        </main>
    )
}

export default RegisterInstructor

