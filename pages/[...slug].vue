<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { CircleChevronRight, CircleChevronLeft, File, Terminal, Play, GripVertical } from "lucide-vue-next";
import { mdWidth, sectionMinWidth, sectionMaxWidth } from '~/consts/consts.ts';
import { getCodeResponse, type RustPlaygroundResponse } from '~/helpers/getCodeResponse';

const route = useRoute()
const { navigation, page, surround, globals } = useContent()

console.log(route.path)
const contentQuery = await queryContent(route.path).findOne();


const isCoding = ref(true);
const isCompiling = ref(false);
const sectionWidth = ref(50);
const isDragging = ref(false);
const isMobile = ref(false);
const codeContent = ref(contentQuery.initialCode ?? "fn main(){\n\t\n}");
const terminalResponse = ref<RustPlaygroundResponse | null>(null);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= mdWidth;
};

const couldClickInNextButton = (doc: any): boolean => {
  if(doc && doc.expectedResponse) {
    return terminalResponse.value?.status === 200 && doc.expectedResponse === terminalResponse.value?.body?.result;
  }

  return doc && doc.nextPath
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || isMobile.value) return;
  const totalWidth = window.innerWidth;
  const newWidth = (event.clientX / totalWidth) * 100;
  sectionWidth.value = Math.min(sectionMaxWidth, Math.max(sectionMinWidth, newWidth));
};

const stopDragging = () => {
  isDragging.value = false;
};

const layoutStyle = computed(() => {
  return isMobile.value
    ? { main: "grid grid-cols-1 lg:grid-cols-2", section: "" }
    : { main: "flex", section: "flex-grow" };
});

async function getResponse() {
  const payload = {
    edition: "2024",
    optimize: "0",
    version: "stable",
    code: codeContent.value,
  };
  terminalResponse.value = await getCodeResponse(payload);
}

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', stopDragging);
});
</script>

<template>
  <ContentDoc v-slot="{ doc }" class="flex-grow">
    <main :class="layoutStyle.main + ' h-[calc(100vh-75px)] mt-0 m-[10px]'">
      <section v-bind="isMobile ? { class: 'mb-[10px] h-[calc(100vh-20px)]' } : { style: { width: `${sectionWidth}%` } }"
        class="bg-light-bg border border-stroke-color rounded-[10px] flex flex-col">
          <div class="scroll-container flex-grow m-2.5 overflow-auto">
            <ContentRenderer :value="doc" class="flex flex-wrap flex-col" />
          </div>
          <div buttons class="flex justify-between m-2.5 mt-auto">
            <a :href="doc && doc.previousPath ? `/${doc.previousPath}` : '/'" :class="{
              'pointer-events-none text-gray-400': !doc || !doc.previousPath,
            }" class="flex items-center">
              <CircleChevronLeft :size="30" />
            </a>
            
            <a :href="couldClickInNextButton(doc) ? `/${doc.nextPath}` : '/'" :class="{
              'pointer-events-none text-gray-400': !couldClickInNextButton(doc),
            }" class="flex items-center"
            >
              <CircleChevronRight :size="30" />
            </a>
          </div>
      </section>

      <div v-if="!isMobile" class="cursor-col-resize w-[10px] flex flex-col justify-center items-center"
        @mousedown="isDragging = true">
        <GripVertical :size="12" />
      </div>

      <section
        v-bind="isMobile ? { class: 'mt-[10px] h-[calc(100vh-20px)]' } : { style: { width: `calc(100% - ${sectionWidth}%)` } }"
        class="bg-light-bg p-[10px] border border-stroke-color rounded-[10px]">
        <div class="flex justify-between border border-stroke-color rounded-t-[10px] p-2 mb-1">
          <div class="flex gap-4">
            <button @click="isCoding = true" :class="{ 'bg-yellow/15 hover:bg-yellow/30': isCoding }" class="flex flex-row items-center justify-center gap-2 bg-neutral-500/40 p-1 px-2 rounded-md hover:bg-neutral-500/70">
              <File :size="20" /> Código
            </button>
            <button @click="isCoding = false" :class="{ 'bg-yellow/15 hover:bg-yellow/30': !isCoding }" class="flex flex-row items-center justify-center gap-2 bg-neutral-500/40 p-1 px-2 rounded-md hover:bg-neutral-500/70" >
              <Terminal /> Output
            </button>
          </div>
          <button @click="isCoding = false, isCompiling = true, getResponse()"  class="flex flex-row items-center justify-center gap-2 bg-neutral-500/40 p-1 px-2 rounded-md hover:bg-neutral-500/70" >
            <Play /> Ejecutar
          </button>
        </div>
        <CodeMirror v-if="isCoding" v-model:code="codeContent"/>
        <!-- TODO: Make a loader -->
        <div v-else class="terminal-output">
          <span class="text-yellow">$ <span class="text-fg">cargo</span> run</span>
          <pre class="text-pretty">{{ terminalResponse?.body?.result }}</pre>
        </div>
      </section>
    </main>
  </ContentDoc>
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
