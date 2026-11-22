# Explorador de Episodios - Rick and Morty

Aplicación web desarrollada para consultar y explorar episodios de la serie Rick and Morty mediante una API REST. Permite buscar episodios por nombre, filtrar por temporada y visualizar información detallada de cada episodio.

**Autor:** César Minarro  
**Asignatura:** Fundamentos de Desarrollo Web  
**Carrera:** Ingeniería en Informática  
**Variante del TP:** C - Episodios  
**Año:** 2026

## Sitios publicados

- **GitHub Pages:** https://desarrollobs.github.io/tp-minarro-cesar/
- **Vercel / Netlify:** Pendiente de publicación.

## Captura de pantalla

![Captura del Explorador de Episodios](img/Captura%20de%20pantalla.png)

## Funcionalidades

- Búsqueda de episodios por nombre.
- Filtro por temporada (S01, S02, S03, S04 y S05).
- Visualización de resultados mediante tarjetas dinámicas.
- Información del nombre, código, fecha de emisión y cantidad de personajes.
- Manejo de errores y búsquedas sin resultados.
- Mensaje visual cuando no existen coincidencias.
- Persistencia de la última búsqueda mediante LocalStorage.
- Diseño responsive para computadoras y dispositivos móviles.

## Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript ES6+.
- Fetch API.
- LocalStorage.
- The Rick and Morty API.
- Git y GitHub.

## API utilizada

**The Rick and Morty API**

Documentación: https://rickandmortyapi.com/documentation

## Estructura del proyecto

```text
tp-minarro-cesar/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── estilos.css
├── js/
│   └── app.js
└── img/
    └── Captura de pantalla.png
```

- `index.html`: estructura principal de la aplicación.
- `css/estilos.css`: estilos y diseño responsive.
- `js/app.js`: lógica de búsqueda, consumo de API y visualización de episodios.
- `img/`: imágenes utilizadas en el proyecto.
- `.gitignore`: archivos y carpetas excluidos del control de versiones.

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/desarrollobs/tp-minarro-cesar.git
   ```

2. Ingresar a la carpeta:

   ```bash
   cd tp-minarro-cesar
   ```

3. Abrir el archivo `index.html` en el navegador o utilizar la extensión Live Server de Visual Studio Code.

No es necesario instalar dependencias adicionales.

## Despliegue

El proyecto utiliza GitHub Pages para publicar la aplicación desde la rama `main` del repositorio.

Los cambios realizados y enviados mediante `git push` se incorporan automáticamente al sitio publicado.

También se utilizará Vercel o Netlify como segunda plataforma de despliegue, vinculada al repositorio de GitHub para habilitar la actualización automática de la aplicación.

## Control de versiones

El proyecto utiliza Git y GitHub para gestionar su historial de cambios. Se trabaja con commits descriptivos, ramas de funcionalidades y Pull Requests para integrar mejoras en la rama principal `main`.