<template>
  <div class="p-2 w-full">
    <nav
      class="h-full flex justify-between items-center max-h-12 top-0 left-0 border border-stroke-color bg-dark-yellow/15 p-2 rounded-md z-50 shadow-md transition-transform duration-300"
    >
      <a href="/">
        <img class="h-8 aspect-square" src="/logo.svg" alt="rustlingWeb" />
      </a>
      <div>
        <a
          class="text-white flex gap-1 bg-editor-bg p-1 rounded-md border border-white/50 hover:scale-105 duration-300 justify-center items-center"
          target="_blank"
          href="https://github.com/RustLangES/rustlings-web"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-github size-5 m-px"
          >
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
            />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>
    </nav>
    <slot />
  </div>
</template>
