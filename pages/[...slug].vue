<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { CircleChevronRight, CircleChevronLeft, File, Terminal, Play, GripVertical } from "lucide-vue-next";
import { mdWidth, sectionMinWidth, sectionMaxWidth } from '~/consts/consts.ts';
import { useRustPlayground } from '~/composables/useRustPlayground';
import type { ParsedContent } from '@nuxt/content';

const route = useRoute()
const contentQuery = await queryContent(route.path).findOne();

console.log(contentQuery);

const isCoding = ref(true);
const sectionWidth = ref(50);
const isDragging = ref(false);
const isMobile = ref(false);
const codeContent = ref(contentQuery.initialCode ?? "fn main(){\n\t\n}");
const { executeCode, isExecuting, formattedOutput, terminalResponse } = useRustPlayground();

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= mdWidth;
};

const isSolvedNow = (doc: ParsedContent) => {
  if(!doc) return false;
  const step = Number(localStorage.getItem("step") ?? 0);
  return step == Number(doc.order);
};

const canBeSkipped = (doc: ParsedContent) => {
  return Number(localStorage.getItem("step") ?? 0) >= Number(doc.order);
};

const couldClickInNextButton = (doc: ParsedContent): boolean => {
  if(canBeSkipped(doc)) {
    return doc && doc.nextPath;
  }

  if(doc && (doc.expectedResponse || doc.tests) ) {
    const compiled_successfully = terminalResponse.value?.success ?? false;

    if (compiled_successfully && doc.expectedResponse) {
      const expectedResponse = doc.expectedResponse === terminalResponse.value?.stdout;
      
      if (expectedResponse) {
        localStorage.setItem("step", doc.order);
      } else {
        return false;
      }
    }
    console.log("tests", doc.tests);

    if (compiled_successfully && doc.tests) {
      const tests = doc.tests;
      let evaluation = true;

      tests.forEach((test: string) => {
        if (test.startsWith("should be contain ")) {
          const content = test.replace("should be contain ", "").trim();
          const expresionsToTest = content.split("`").filter((exp) => exp !== " " && exp !== "");
          if(expresionsToTest.length === 0) return;
          let aux = false;

          expresionsToTest.forEach((exp) => {
            if (terminalResponse.value?.stdout?.includes(exp)) {
              aux = true;
            }
          })

          evaluation = evaluation && aux;
        }
      });
      console.log("evaluation", evaluation);
      if (evaluation) {
        localStorage.setItem("step", doc.order);
      } else {
        return false;
      }
    }

    return compiled_successfully;
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

const runCode = async () => {
  isCoding.value = false;
  await executeCode(codeContent.value, {
    edition: "2024",
    channel: "stable",
    mode: "debug"
  });
};

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
            <NuxtLink :to="doc && doc.previousPath ? `/${doc.previousPath}` : '/'" :class="{
              'pointer-events-none text-gray-400': !doc || !doc.previousPath,
            }" class="flex items-center">
              <CircleChevronLeft :size="30" />
            </NuxtLink>
            
            <NuxtLink :to="couldClickInNextButton(doc) ? `/${doc.nextPath}` : '/'" :class="{
              'pointer-events-none text-gray-400': !couldClickInNextButton(doc),
            }" class="flex items-center gap-2 justify-center"
            >
              <span v-if="canBeSkipped(doc) && !isSolvedNow(doc)" class="text-green-200 font-semibold p-2 rounded bg-teal-400/30">Solucionado previamente</span>
              <span v-if="canBeSkipped(doc) && isSolvedNow(doc)" class="text-green-200 font-semibold p-2 rounded bg-teal-400/30">Solucionado</span>
              <CircleChevronRight :size="30" />
            </NuxtLink>
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
          <button @click="runCode" :disabled="isExecuting" class="flex flex-row items-center justify-center gap-2 bg-neutral-500/40 p-1 px-2 rounded-md hover:bg-neutral-500/70 disabled:opacity-50 disabled:cursor-not-allowed">
            <Play /> {{ isExecuting ? 'Ejecutando...' : 'Ejecutar' }}
          </button>
        </div>
        <CodeMirror v-if="isCoding" v-model:code="codeContent"/>
        <output v-else class="terminal-scroll block border border-stroke-color rounded-b-lg p-2 overflow-auto max-h-[calc(100vh-150px)] bg-editor-bg">
          <span class="text-yellow mb-2">$ <span class="text-fg">cargo</span> run</span>
          <!-- Stderr output -->
          <TerminalStderrOutput v-if="formattedOutput.stderr" :content="formattedOutput.stderr" />
          <!-- Standard output -->
          <div v-if="formattedOutput.stdout" class="mt-2">
            <div v-if="formattedOutput.stderr" class="border-t border-gray-700 mb-2"></div>
            <pre class="leading-relaxed whitespace-pre-wrap break-words">{{ formattedOutput.stdout }}</pre>
          </div>
          <!-- Default message -->
          <p v-if="!isExecuting && !formattedOutput.stderr && !formattedOutput.stdout" class="text-gray-400">
            Presiona "Ejecutar" para ver el output
          </p>
        </output>
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

.terminal-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--editor-bg) transparent;
}

.scroll-container::-webkit-scrollbar,
.terminal-scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-track,
.terminal-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb,
.terminal-scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover,
.terminal-scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--editor-bg);
  border-radius: 10px;
}
</style>
