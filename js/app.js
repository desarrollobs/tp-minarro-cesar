
// ================================================
// PROYECTO: EXPLORADOR DE EPISODIOS
// AUTOR: CESAR MINARRO
// ASIGNATURA: FUNDAMENTOS DE DESARROLLO WEB
// ================================================


// 1. OBTENER LOS ELEMENTOS DEL HTML

const formulario = document.getElementById("formulario-busqueda");
const campoNombre = document.getElementById("nombre");
const campoTemporada = document.getElementById("temporada");
const botonBuscar = document.getElementById("btn-buscar");
const contenedorEpisodios = document.getElementById("contenedor-episodios");
const mensaje = document.getElementById("mensaje");


// 2. DIRECCIÓN BASE DE LA API

const API_URL = "https://rickandmortyapi.com/api/episode";

// Clave para guardar la última búsqueda
const CLAVE_ALMACENAMIENTO = "ultimaBusquedaEpisodios";

// 3. MOSTRAR MENSAJES EN PANTALLA

const mostrarMensaje = (texto) => {
    mensaje.textContent = texto;
};


// 4. CONSULTAR LA API

const buscarEpisodios = async (nombre, temporada) => {

    // Construir la URL
    const url = new URL(API_URL);

    // Agregar los parámetros de búsqueda
    if (nombre) {
        url.searchParams.set("name", nombre);
    }

    if (temporada) {
        url.searchParams.set("episode", temporada);
    }

    // Realizar la petición
    const respuesta = await fetch(url);

    // Convertir la respuesta a JSON
    const datos = await respuesta.json();

    // Detectar errores de la API
    if (!respuesta.ok) {

        if (respuesta.status === 404) {
            return [];
        }

        throw new Error("No fue posible obtener los episodios.");
    }

    return datos.results;
};


// 5. CREAR UNA TARJETA POR EPISODIO

const crearTarjeta = (episodio) => {

    // Crear el elemento principal
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    // Crear el título
    const titulo = document.createElement("h3");
    titulo.textContent = episodio.name || "Desconocido";

    // Crear el código del episodio
    const codigo = document.createElement("p");
    const etiquetaCodigo = document.createElement("strong");
    etiquetaCodigo.textContent = "Código: ";
    codigo.appendChild(etiquetaCodigo);
    codigo.append(
        episodio.episode || "Desconocido"
    );

    // Crear la fecha de emisión
    const fecha = document.createElement("p");
    const etiquetaFecha = document.createElement("strong");
    etiquetaFecha.textContent = "Fecha de emisión: ";
    fecha.appendChild(etiquetaFecha);
    fecha.append(
        episodio.air_date || "Desconocido"
    );

    // Crear la cantidad de personajes
    const personajes = document.createElement("p");
    const etiquetaPersonajes = document.createElement("strong");
    etiquetaPersonajes.textContent = "Personajes: ";
    personajes.appendChild(etiquetaPersonajes);
    personajes.append(
        episodio.characters
            ? episodio.characters.length
            : "Desconocido"
    );

    // Agregar todos los elementos a la tarjeta
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(codigo);
    tarjeta.appendChild(fecha);
    tarjeta.appendChild(personajes);

    return tarjeta;
};


// 6. MOSTRAR LOS EPISODIOS EN PANTALLA


const mostrarEpisodios = (episodios) => {

    // Limpiar resultados anteriores
    contenedorEpisodios.replaceChildren();

    // Verificar si existen resultados
    if (episodios.length === 0) {

        // Crear una tarjeta informativa
        const sinResultados = document.createElement("div");
        sinResultados.classList.add("sin-resultados");

        const titulo = document.createElement("h3");
        titulo.textContent = "No encontramos episodios";

        const descripcion = document.createElement("p");
        descripcion.textContent =
            "No hay episodios que coincidan con tu búsqueda. Probá con otro nombre o temporada.";

        sinResultados.appendChild(titulo);
        sinResultados.appendChild(descripcion);

        contenedorEpisodios.appendChild(sinResultados);

        mostrarMensaje("No se encontraron episodios.");
        return;
    }

    // Crear una tarjeta por cada episodio
    episodios.forEach((episodio) => {

        const tarjeta = crearTarjeta(episodio);

        contenedorEpisodios.appendChild(tarjeta);

    });

    mostrarMensaje(
        `Se encontraron ${episodios.length} episodio(s).`
    );
};


// 7. PROCESAR EL FORMULARIO DE BÚSQUEDA

const manejarBusqueda = async (evento) => {

    // Evitar que se recargue la página
    evento.preventDefault();

    // Obtener los valores del formulario
    const nombre = campoNombre.value.trim();
    const temporada = campoTemporada.value;

    // Verificar que exista al menos un criterio
    if (!nombre && !temporada) {

        contenedorEpisodios.replaceChildren();

        mostrarMensaje(
            "Ingresá un nombre o seleccioná una temporada para buscar."
        );

        return;
    }

    // Guardar la última búsqueda
    const ultimaBusqueda = {
        nombre: nombre,
        temporada: temporada
    };

    localStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        JSON.stringify(ultimaBusqueda)
    );

    // Limpiar resultados anteriores
    contenedorEpisodios.replaceChildren();

    // Desactivar el botón
    botonBuscar.disabled = true;
    botonBuscar.textContent = "Buscando...";

    mostrarMensaje("Buscando episodios...");

    try {

        // Consultar la API
        const episodios = await buscarEpisodios(
            nombre,
            temporada
        );

        // Mostrar los resultados
        mostrarEpisodios(episodios);

    } catch (error) {

        // Mostrar errores
        console.error("Error al buscar episodios:", error);

        mostrarMensaje(
            "Ocurrió un error al consultar la API. Verificá tu conexión e intentá nuevamente."
        );

    } finally {

        // Volver a habilitar el botón
        botonBuscar.disabled = false;
        botonBuscar.textContent = "Buscar episodios";

    }
};


// 8. ESCUCHAR EL ENVÍO DEL FORMULARIO

formulario.addEventListener("submit", manejarBusqueda);

// ================================================
// 9. RECUPERAR LA ÚLTIMA BÚSQUEDA
// ================================================

const restaurarBusqueda = () => {

    try {

        // Recuperar los datos guardados
        const datosGuardados = localStorage.getItem(
            CLAVE_ALMACENAMIENTO
        );

        // Si no existen datos, no hacer nada
        if (!datosGuardados) {
            return;
        }

        // Convertir el JSON a objeto
        const ultimaBusqueda = JSON.parse(datosGuardados);

        // Completar los campos del formulario
        campoNombre.value = ultimaBusqueda.nombre || "";
        campoTemporada.value = ultimaBusqueda.temporada || "";

        // Ejecutar automáticamente la búsqueda
        if (campoNombre.value || campoTemporada.value) {
            formulario.requestSubmit();
        }

    } catch (error) {

        console.error(
            "Error al recuperar la búsqueda:",
            error
        );

        mostrarMensaje(
            "No se pudo recuperar la última búsqueda."
        );

    }
};


// Ejecutar la restauración al cargar la página
restaurarBusqueda();