# CONTRIBUIR A RUSTLINGS WEB

1. Hay que crear una rama a partir de develop, ya que en estas ramas haremos los cambios que creamos necesarios para luego hacer PR a develop.
2. Clonamos el repositorio.
3. Cambiamos a nuestra rama recien creada.
4. Y ahora podemos lanzar nuestro servidor de desarrollo con el comando: `bun run dev`.
5. Ahora vamos a la siguiente URl: [localhost:4321/aprender/01-hola_mundo](http://localhost:4321/aprender/01-hola_mundo)

Y listo, tendremos la primera sección del curso en pantalla.

Las carpetas de pages se dividen de la sig forma:

```txt
├──  src
│  ├──  pages              // Aqui se encuentran todas las rutas de nuestra APP
│  │  ├──  aprender        // Carpeta de contenido MD en español
│  │  ├──  en              // Rutas y contenido necesario para idioma inglés
│  │  └──  index.astro     // LandingPage para Español (sera la misma para todos los idiomas) 
```

