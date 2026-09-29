import { Route } from "react-router-dom"

import Inicio from "../Pages/Inicio"
import Login from "../Pages/Login"
import RegistroPaso1 from "../Pages/Paso1"
import RegisterAprendiz from "../Pages/RegisterAprendiz"
import RegisterInstructor from "../Pages/RegisterInstructor"

const AuthRoutes = () => {
    return (
        <>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registropaso1" element={<RegistroPaso1 />} />
            <Route path="/registroaprendiz" element={<RegisterAprendiz />} />
            <Route path="/registroinstructor" element={<RegisterInstructor />} />
        </>
    )
}

export default AuthRoutes
