# StockMind: cómo está organizado el código

## Idea general
- **Cada rol** (Aprendiz, Instructor, CuentaDante, Administrador) tiene en su módulo:
  `Routes/` (sus rutas), `Data/` (menú, perfil, notificaciones) y `Pages/Home.jsx`.
- **Cada funcionalidad** tiene su propio módulo y sus páginas se reutilizan entre roles:
  | Módulo | Páginas | Lo usan |
  |---|---|---|
  | Ambientes | `Ambientes`, `DetalleAmbiente` | Instructor, Cuentadante, Admin |
  | Elementos | `MisElementos`, `Inventario` | Aprendiz / Cuentadante, Admin |
  | Reportes | `MisReportes`, `ReportarDano`, `GestionReportes`, `ReportesCuentadante` | todos |
  | Asignaciones | `Asignaciones` | Cuentadante |
  | Traslados | `Traslados`, `Movimientos` | Cuentadante, Admin |
  | Centros | `Centros`, `DetalleCentro` | Admin |
  | Perfil | `Perfil`, `EditarPerfil` | todos |
  | Notificaciones | `Notificaciones` | todos |
- Las páginas reciben los datos por **props**, así la misma página sirve para varios roles.
  Ejemplo: `<Perfil usuario={perfilAprendiz} rutaEditar="/aprendiz/perfil/editar" />`

## Shared (lo que se usa en todas partes)
- `Layouts/PanelLayout.jsx`: menú + cabecera. Cada rol le pasa su `panel` (ver `Data/panel*.js`).
- `Components/`: `Tarjeta`, `StatCard`, `Boton`, `EstadoBadge`, `FiltroChips`, `Tabla`, `Modal`, `Campo`, `EstadoVacio`, `MensajeExito`.
- `Utils/`: `formatearFecha`, `fechaHoy`, `incluyeTexto`, `contarPor`.

## Agregar una página nueva
1. Crea el archivo en `Modules/<Funcionalidad>/Pages/`.
2. Agrega la ruta en `Modules/<Rol>/Routes/<Rol>Routes.jsx`.
3. Si va en el menú, agrégala en `Modules/<Rol>/Data/panel<Rol>.js`.

## Datos de prueba
Todo está en los archivos `Data/`. Los lugares donde va la llamada al backend están marcados con `// TODO`.

## Entrar a cada panel (modo de prueba)
En el login, el correo decide el panel: `admin@...`, `instructor@...`, `cuentadante@...`; cualquier otro abre el de aprendiz.
