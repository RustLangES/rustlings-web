<script setup lang="ts">
import { CircleChevronRight, CircleChevronLeft } from "lucide-vue-next";
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-2 m-[10px]">
    <section
      class="bg-light-bg h-[calc(100vh-20px)] lg:mr-[5px] border border-stroke-color rounded-[10px] flex flex-col">
      <ContentDoc v-slot="{ doc }" class="flex-grow">
        <div class="scroll-container flex-grow m-[10px] overflow-auto">
          <ContentRenderer :value="doc" />
        </div>
        <div buttons class="flex justify-between m-[10px] mt-auto">
          <a :href="doc && doc.previousPath ? `/${doc.previousPath}` : null" :class="{
            'pointer-events-none text-gray-400': !doc || !doc.previousPath,
          }" class="flex items-center">
            <CircleChevronLeft :size="30" />
          </a>

          <a :href="doc && doc.nextPath ? `/${doc.nextPath}` : null" :class="{
            'pointer-events-none text-gray-400': !doc || !doc.nextPath,
          }" class="flex items-center">
            <CircleChevronRight :size="30" />
          </a>
        </div>
      </ContentDoc>
    </section>
    <section class="bg-light-bg h-[calc(100vh-20px)] xs:mt-[10px] lg:mt-0 lg:ml-[5px] p-[10px] border border-stroke-color rounded-[10px]">
      <CodeMirror />
    </section>
  </main>
</template>

<style scoped>
.scroll-container {
  scrollbar-width: thin;
  scrollbar-color: var(--editor-bg) transparent;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--editor-bg);
  border-radius: 10px;
}
</style>

