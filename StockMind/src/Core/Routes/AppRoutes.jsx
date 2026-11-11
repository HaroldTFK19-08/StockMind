import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Cargando from "../../Shared/Components/Feedback/Cargando";

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
        <Route path="/aprendiz/*" element={<AprendizRoutes />} />
        <Route path="/instructor/*" element={<InstructorRoutes />} />
        <Route path="/cuentadante/*" element={<CuentaDanteRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
