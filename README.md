# Nuxt desde 0

> [!NOTE]
> Link para los iconos [Lucide](https://lucide.dev/icons/)

## Estrucutra de carpetas recomendada por Nuxt

```txt
 MyAwesomeProject
├──  .nuxt               <- Desarrollo
├──  .output             <- Producción
├──  assets              <- (CSS, SASS, Fonts, Imagenes)
├──  components          <- SFC
├──  layouts             <- Piezas de UI repetidas
├──  middleware          <- Interceptores
├──  pages               <- Enrutamiento (archivos o carpetas)
├──  plugins             <- Son complementos (Analitycs)
├──  public              <- robots.txt, favicon.ico
├──  composables         <- Composable functions
├──  nuxt.config.ts      <- Configuraciones
└── 󰡄 app.vue             <- Entrada
```

Esta estructura es recomendada por **Nuxt** ya que es la que facilita mas las cosas como los `autoimports` de los componentes.