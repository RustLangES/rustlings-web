<script setup lang="ts"></script>

<template>
  <main>
    <section
      class="w-full h-screen flex flex-col bg-bg justify-center items-center"
    >
      <img class="max-xs:w-52 logo" src="/logo.svg" alt="rustlings" />
      <div class="my-16 text-center">
        <h1 class="font-semibold text-6xl mb-4">RustLings Web</h1>
        <h3 class="text-xl">Aprender Rust nunca fue tan fácil</h3>
      </div>
      <a
        class="px-8 py-2 border rounded-lg hover:border-white hover:-translate-y-1 hover:scale-110 cursor-pointer duration-300 border-stroke-color"
        >Aprender</a
      >
    </section>
    <section
      class="w-full h-[720px] p-20 justify-center items-center relative flex bg-dark-fg"
    >
      <div
        class="w-full h-16 transform absolute bottom-full bg-[url('/figures.svg')] bg-repeat-x"
      ></div>
      <div class="max-w-5xl w-full gap-4 flex max-md:flex-col items-center">
        <img
          class="max-w-max w-full md:w-1/2 h-auto z-20"
          src="/ferris.png"
          alt=""
        />

        <p class="text-center w-full md:w-1/2 text-pretty">
          <span class="block font-bold text-lg"
            >¡Aprende Rust sin instalar nada!</span
          >
          Explora lecciones interactivas y experimenta con código en un
          playground integrado, directamente desde tu navegador. 🚀
        </p>
      </div>
      <div
        class="w-full rotate-180 h-16 absolute top-full bg-[url('/figures.svg')] bg-repeat-x"
      ></div>
    </section>
    <section
      class="min-h-screen h-max w-full flex p-20 justify-center items-center"
    >
      <div class="max-w-5xl w-full gap-4 flex max-md:flex-col items-center">
        <div class="md:w-1/2 flex flex-col items-center">
          <p class="text-center w-full text-pretty">
            <span class="block font-bold text-lg"
              >Sigue aprendiendo junto a miles de entusiastas de Rust</span
            >
            Forma parte de nuestra comunidad, comparte tus avances, resuelve
            dudas y colabora con otros aprendices y expertos de Rust.
          </p>
          <a
            class="mt-8 px-4 py-1 border rounded-lg hover:border-white hover:-translate-y-1 hover:scale-110 cursor-pointer duration-300 border-stroke-color font-bold flex items-center gap-1 w-max text-lg bg-light-bg"
            href="https://discord.com/channels/778674594856960012/1292726289479893044"
            target="_blank"
            ><img
              class="aspect-square h-6"
              src="/discord-mark-white.svg"
              alt=""
            />
            Discord
          </a>
        </div>
        <div
          class="max-w-max w-full md:w-1/2 mx-auto relative flex items-center justify-center"
        >
          <iframe
            src="https://discord.com/widget?id=778674594856960012&theme=dark"
            allowtransparency="true"
            width="1000"
            height="475"
            frameborder="0"
            allowfullscreen
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.logo {
  -webkit-filter: drop-shadow(0 -6mm 100mm var(--yellow));
  filter: drop-shadow(0 -6mm 90mm var(--yellow));
}
</style>
