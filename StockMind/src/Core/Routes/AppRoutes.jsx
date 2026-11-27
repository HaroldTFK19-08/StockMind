import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Cargando from "../../Shared/Components/Feedback/Cargando";
import RutaProtegida from "./RutaProtegida";

const AuthRoutes = lazy(() => import("../../Modules/Auth/Routes/AuthRoutes"));
const AprendizRoutes = lazy(() => import("../../Modules/Aprendiz/Routes/AprendizRoutes"));
const InstructorRoutes = lazy(() => import("../../Modules/Instructor/Routes/InstructorRoutes"));
const CuentaDanteRoutes = lazy(() => import("../../Modules/CuentaDante/Routes/CuentaDanteRoutes"));
const AdminRoutes = lazy(() => import("../../Modules/Administrador/Routes/AdminRoutes"));

// Cada rol tiene su propio archivo de rutas dentro de su módulo
const AppRoutes = () => {
  return (
    <Suspense fallback={<Cargando texto="Cargando página..." />}>
      <Routes>
        <Route path="/aprendiz/*" element={<RutaProtegida rol="aprendiz"><AprendizRoutes /></RutaProtegida>} />
        <Route path="/instructor/*" element={<RutaProtegida rol="instructor"><InstructorRoutes /></RutaProtegida>} />
        <Route path="/cuentadante/*" element={<RutaProtegida rol="cuentadante"><CuentaDanteRoutes /></RutaProtegida>} />
        <Route path="/admin/*" element={<RutaProtegida rol="admin"><AdminRoutes /></RutaProtegida>} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
