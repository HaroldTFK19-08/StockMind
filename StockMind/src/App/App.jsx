import AppRoutes from "../Core/Routes/AppRoutes"
import BotonMindBot from "../Shared/Components/UI/BotonMindBot"

const App = () => {
    return (
        <div>
            <AppRoutes />
            {/* Botón flotante global de MindBot (se oculta internamente en login/registro/inicio) */}
            <BotonMindBot />
        </div>
    )
}

export default App
