import {
    GraduationCap,
    BriefcaseBusiness,
    Database,
} from 'lucide-react'

const servicios = [
    {
        icono: GraduationCap,
        titulo: "Aprendices",
        caracteristicas: [
        "Consulta de materiales disponibles.",
        "Solicitud de préstamos de elementos rápida.",
        "Historial de herramientas usadas.",
        ],
    },
    {
        icono: BriefcaseBusiness,
        titulo: "Instructores",
        caracteristicas: [
        "Gestión de ambientes de formación.",
        "Reporte de novedades y daños.",
        "Control de insumos por ficha.",
        ],
        destacado: true,
    },
    {
        icono: Database,
        titulo: "Cuenta Dante",
        caracteristicas: [
        "Auditoría total de inventario.",
        "Generación de reportes legales.",
        "Gestión de altas y bajas de bienes.",
        ],
    },
];
export default servicios;
