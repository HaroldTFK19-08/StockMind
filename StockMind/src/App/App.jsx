import AppRoutes from "../Core/Routes/AppRoutes"
import BotonMindBot from "../Shared/Components/UI/BotonMindBot"
import { AuthProvider } from "../Modules/Auth/Context/AuthContext"

const App = () => {
    return (
        <AuthProvider>
            <div>
                <AppRoutes />
                {/* Botón flotante global de MindBot (se oculta internamente en login/registro/inicio) */}
                <BotonMindBot />
            </div>
        </AuthProvider>
    )
}

export default App
