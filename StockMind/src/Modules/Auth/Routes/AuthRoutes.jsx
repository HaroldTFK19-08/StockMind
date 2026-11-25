import { Navigate, Routes, Route } from "react-router-dom"

import Inicio from "../Pages/Inicio"
import Login from "../Pages/Login"
import Register from "../Pages/Register"

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="registropaso1" element={<Navigate to="/registro" replace />} />
            <Route path="registroaprendiz" element={<Navigate to="/registro" replace />} />
            <Route path="registroinstructor" element={<Navigate to="/registro" replace />} />
        </Routes>
    )
}

export default AuthRoutes