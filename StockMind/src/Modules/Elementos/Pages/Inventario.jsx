import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Archive,
  ChevronDown,
  CircleCheck,
  Download,
  Eye,
  FileText,
  Package,
  Pencil,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";
import StatCard from "../../../Shared/Components/Cards/StatCard";
import Tarjeta from "../../../Shared/Components/Cards/Tarjeta";
import SearchBar from "../../../Shared/Forms/SearchBar";
import FiltroChips from "../../../Shared/Components/UI/FiltroChips";
import EstadoBadge from "../../../Shared/Components/UI/EstadoBadge";
import Boton from "../../../Shared/Components/UI/Boton";
import BotonIcono from "../../../Shared/Components/UI/BotonIcono";
import Cargando from "../../../Shared/Components/Feedback/Cargando";
import EstadoVacio from "../../../Shared/Components/Feedback/EstadoVacio";
import MensajeError from "../../../Shared/Components/Feedback/MensajeError";
import MensajeExito from "../../../Shared/Components/Feedback/MensajeExito";
import ModalEliminar from "../../../Shared/Components/Modals/ModalEliminar";
import { claseInput } from "../../../Shared/Components/Forms/Campo";
import { useCarga } from "../../../Shared/Hooks/useCarga";
import { mensajeError } from "../../../Core/Services/apiUtils";
import {
  capitalizar,
  contarPor,
  incluyeTexto,
} from "../../../Shared/Utils/texto";
import FotoElemento from "../Components/FotoElemento";
import ModalDetalleElemento from "../Components/ModalDetalleElemento";
import ModalElemento from "../Components/ModalElemento";
import { estadosElemento, ubicacionDe } from "../Data/opcionesElemento";
import {
  descargarPdfElementos,
  eliminarElemento,
  obtenerElementos,
  verPdfElementos,
} from "../Services/elementosService";
import { obtenerAmbientes } from "../../Ambientes/Services/ambientesService";
import { obtenerAlmacenes } from "../../Almacenes/Services/almacenesService";
import { ObterCategorias } from "../../categorias/service/ListarCategoria";
// Pide al mismo tiempo los elementos y las listas que usan los filtros y el formulario
const cargarDatos = async () => {
  const [elementos, categorias, ambientes, almacenes] = await Promise.all([
    obtenerElementos(),
    ObterCategorias(),
    obtenerAmbientes(),
    obtenerAlmacenes(),
  ]);
  return { elementos, categorias, ambientes, almacenes };
};
// ¿El elemento está en la ubicación elegida? La ubicación es "", "ambiente:3" o "almacen:2"
const estaEn = (elemento, ubicacion) => {
  if (ubicacion === "") return true;
  const [tipo, id] = ubicacion.split(":");
  const idElemento =
    tipo === "ambiente" ? elemento.environment_id : elemento.warehouse_id;
  return idElemento === Number(id);
};
/**
 * Inventario de elementos (GET /elementos).
 * - Cuentadante: <Inventario />               (solo consulta)
 * - Administrador: <Inventario puedeAgregar /> (puede agregar, editar y eliminar)
 *
 * También se puede abrir ya filtrado: /admin/inventario?almacen=2 o ?ambiente=5
 */
const Inventario = ({ puedeAgregar = false }) => {
  const { datos, cargando, error, recargar } = useCarga(cargarDatos);
  const [parametros] = useSearchParams();
  // Filtro de ubicación que llega en la URL (si llega)
  const ubicacionUrl = parametros.get("almacen")
    ? `almacen:${parametros.get("almacen")}`
    : parametros.get("ambiente")
      ? `ambiente:${parametros.get("ambiente")}`
      : "";
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("");
  const [ubicacion, setUbicacion] = useState(ubicacionUrl);
  const [elementoAConsultar, setElementoAConsultar] = useState(null);
  const [modal, setModal] = useState(null); // null = cerrado | { elemento: null } = nuevo | { elemento } = editar
  const [elementoAEliminar, setElementoAEliminar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [pdfAccion, setPdfAccion] = useState("");
  const [errorPdf, setErrorPdf] = useState("");
  const abrirPdf = async () => {
    setErrorPdf("");
    const ventana = window.open("about:blank", "_blank");
    if (!ventana) {
      setErrorPdf("Permite las ventanas emergentes para poder ver el PDF.");
      return;
    }
    ventana.opener = null;
    setPdfAccion("ver");
    try {
      const pdf = await verPdfElementos();
      const url = URL.createObjectURL(pdf);
      ventana.addEventListener("load", () => URL.revokeObjectURL(url), {
        once: true,
      });
      ventana.location.href = url;
    } catch (error) {
      ventana.close();
      setErrorPdf(mensajeError(error));
    } finally {
      setPdfAccion("");
    }
  };
  const descargarPdf = async () => {
    setErrorPdf("");
    setPdfAccion("descargar");
    try {
      const pdf = await descargarPdfElementos();
      const url = URL.createObjectURL(pdf);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = "elementos.pdf";
      enlace.hidden = true;
      document.body.append(enlace);
      enlace.click();
      enlace.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      setErrorPdf(mensajeError(error));
    } finally {
      setPdfAccion("");
    }
  };
  if (cargando) return <Cargando texto="Cargando inventario..." />;
  if (!datos) return <MensajeError>{error}</MensajeError>;
  const { elementos, categorias, ambientes, almacenes } = datos;
  const filtrados = elementos.filter((elemento) => {
    return (
      (categoria === "Todas" || elemento.category?.nombre === categoria) &&
      (estado === "" || elemento.estado === estado) &&
      estaEn(elemento, ubicacion) &&
      incluyeTexto(
        elemento.codigo_inventario + elemento.nombre + (elemento.serial ?? ""),
        busqueda,
      )
    );
  });
  // Chips de categorías con la cantidad de elementos de cada una
  const nombresCategorias = categorias.map((c) => c.nombre);
  const conteoCategorias = { Todas: elementos.length };
  nombresCategorias.forEach((nombre) => {
    conteoCategorias[nombre] = elementos.filter(
      (e) => e.category?.nombre === nombre,
    ).length;
  });
  const alTerminar = (respuesta) => {
    setModal(null);
    setElementoAEliminar(null);
    setMensaje(respuesta.message);
    recargar();
  };
  return (
    <section>
      {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
      {error && <MensajeError>{error}</MensajeError>}
      {errorPdf && <MensajeError>{errorPdf}</MensajeError>}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          etiqueta="Total de elementos"
          valor={elementos.length}
          icono={Package}
        />
        <StatCard
          etiqueta="Disponibles"
          valor={contarPor(elementos, "estado", "disponible")}
          icono={CircleCheck}
          color="azul"
        />
        <StatCard
          etiqueta="En mantenimiento"
          valor={contarPor(elementos, "estado", "en mantenimiento")}
          icono={Wrench}
          color="ambar"
        />
        <StatCard
          etiqueta="Dados de baja"
          valor={contarPor(elementos, "estado", "dado de baja")}
          icono={Archive}
          color="rojo"
        />
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-[#081B28]">Elementos</h2>
        <div className="flex flex-wrap gap-2">
          <details className="group relative">
            <summary className="inline-flex cursor-pointer list-none items-center justify-center gap-2 rounded-[14px] border-2 border-[#e5ece6] bg-white px-5 py-2.5 text-sm font-bold text-[#081B28] shadow-[0_2px_8px_rgba(8,27,40,0.03)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-[#cbdcc9] hover:bg-[#f8fbf7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900] active:translate-y-0">
              <Download size={16} aria-hidden="true" />
              Exportar
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="absolute right-0 z-20 mt-2 min-w-48 overflow-hidden rounded-xl border border-[#e5ece6] bg-white p-1.5 shadow-lg">
              <button
                type="button"
                onClick={(event) => {
                  event.currentTarget.closest("details").open = false;
                  abrirPdf();
                }}
                disabled={Boolean(pdfAccion)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#081B28] hover:bg-[#f3f6f2] focus-visible:outline-2 focus-visible:outline-[#39A900] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FileText size={16} aria-hidden="true" />
                Ver PDF
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.currentTarget.closest("details").open = false;
                  descargarPdf();
                }}
                disabled={Boolean(pdfAccion)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#081B28] hover:bg-[#f3f6f2] focus-visible:outline-2 focus-visible:outline-[#39A900] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download size={16} aria-hidden="true" />
                Descargar PDF
              </button>
            </div>
          </details>
          {puedeAgregar && (
            <Boton icono={Plus} onClick={() => setModal({ elemento: null })}>
              Agregar elemento
            </Boton>
          )}
        </div>
      </div>
      <SearchBar
        placeholder="Buscar por código, nombre o serial..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <select
          aria-label="Filtrar por estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className={claseInput}
        >
          <option value="">Todos los estados</option>
          {estadosElemento.map((e) => (
            <option key={e} value={e}>
              {capitalizar(e)}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className={claseInput}
        >
          <option value="">Todas las ubicaciones</option>
          <optgroup label="Ambientes">
            {ambientes.map((a) => (
              <option key={a.id} value={`ambiente:${a.id}`}>
                {a.nombre}
              </option>
            ))}
          </optgroup>
          <optgroup label="Almacenes">
            {almacenes.map((a) => (
              <option key={a.id} value={`almacen:${a.id}`}>
                {a.nombre}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <FiltroChips
        opciones={["Todas", ...nombresCategorias]}
        valor={categoria}
        onCambiar={setCategoria}
        conteos={conteoCategorias}
      />
      {filtrados.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtrados.map((elemento) => (
            <Tarjeta key={elemento.id} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <FotoElemento elemento={elemento} tamano="h-12 w-12" />
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-[#081B28]">
                      {elemento.nombre}
                    </h3>
                    <p className="text-sm text-[#64748b]">
                      {elemento.codigo_inventario}
                    </p>
                  </div>
                </div>
                <EstadoBadge estado={capitalizar(elemento.estado)} />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                <div>
                  <dt className="text-xs text-[#64748b]">Categoría</dt>
                  <dd className="font-semibold text-[#081B28]">
                    {elemento.category?.nombre ?? "Sin categoría"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#64748b]">Condición</dt>
                  <dd className="mt-1">
                    <EstadoBadge estado={capitalizar(elemento.condicion)} />
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-[#64748b]">Ubicación</dt>
                  <dd className="font-semibold text-[#081B28]">
                    {ubicacionDe(elemento)}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex justify-end gap-1">
                <Boton
                  variante="secundario"
                  icono={Eye}
                  className="px-3 py-1.5"
                  onClick={() => setElementoAConsultar(elemento)}
                >
                  Ver
                </Boton>
                {puedeAgregar && (
                  <>
                    <BotonIcono
                      icono={Pencil}
                      etiqueta={`Editar ${elemento.nombre}`}
                      onClick={() => setModal({ elemento })}
                    />
                    <BotonIcono
                      icono={Trash2}
                      etiqueta={`Eliminar ${elemento.nombre}`}
                      variante="peligro"
                      onClick={() => setElementoAEliminar(elemento)}
                    />
                  </>
                )}
              </div>
            </Tarjeta>
          ))}
        </div>
      ) : elementos.length === 0 ? (
        <EstadoVacio
          titulo="El inventario está vacío"
          descripcion="Todavía no se ha registrado ningún elemento."
          icono={Package}
        />
      ) : (
        <EstadoVacio
          titulo="No hay elementos con esos filtros"
          descripcion="Cambia la categoría, el estado o la ubicación."
        />
      )}
      {modal && (
        <ModalElemento
          elemento={modal.elemento}
          categorias={categorias}
          ambientes={ambientes}
          almacenes={almacenes}
          onGuardado={alTerminar}
          onCerrar={() => setModal(null)}
        />
      )}
      {elementoAConsultar && (
        <ModalDetalleElemento
          key={elementoAConsultar.id}
          elementoId={elementoAConsultar.id}
          onCerrar={() => setElementoAConsultar(null)}
        />
      )}
      {elementoAEliminar && (
        <ModalEliminar
          titulo="Eliminar elemento"
          nombre={elementoAEliminar.nombre}
          eliminar={() => eliminarElemento(elementoAEliminar.id)}
          onEliminado={alTerminar}
          onCerrar={() => setElementoAEliminar(null)}
        />
      )}
    </section>
  );
};
export default Inventario;
