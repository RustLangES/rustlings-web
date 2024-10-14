<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCodeStore } from "../stores/useCodeStore";
import { request } from "../services/request";
import * as monaco from "monaco-editor";
import PlayIcon from "../../public/assets/icons/play_icon.vue";
import SettingsIcon from "../../public/assets/icons/settings_icon.vue";

const codeStore = new useCodeStore();

const editor = ref<HTMLElement | null>(null);
const code = ref<string | null>(await codeStore.getCode());
const terminalResponse = ref("");
const showCode = ref(true);
const showHelp = ref(false); /*
  Vim mode: https://github.com/brijeshb42/monaco-vim
  Themes:
*/
let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;

async function runCode() {
  if (!code.value) {
    await codeStore.clearCode();
    return;
  }
  try {
    terminalResponse.value = "Loading...";
    showCode.value = false;
    codeStore.setCode(code.value);
    await getResponse();
  } catch (error) {
    console.error(error);
  }
}

async function getResponse() {
  const payload = {
    language: "rust",
    version: "1.68.2",
    files: [
      {
        name: "main.rs",
        content: code.value,
      },
    ],
  };

  const response = await request(
    "POST",
    "https://emkc.org/api/v2/piston/execute",
    payload,
  );

  if (response.run.code !== 0) {
    terminalResponse.value = response.run.stderr;
  } else {
    terminalResponse.value = response.run.stdout;
  }
}

onMounted(() => {
  if (editor.value) {
    monaco.languages.register({ id: "rust" });
    monacoEditor = monaco.editor.create(editor.value, {
      value: code.value,
      language: "rust",
      theme: "vs-dark",
      automaticLayout: true,
    });
    monacoEditor.onDidChangeModelContent(() => {
      code.value = monacoEditor?.getValue() || "";
    });
  }
});
</script>

<template>
  <div class="flex justify-between h-[40px]">
    <div class="flex gap-4">
      <button
        @click="showCode = true"
        :class="showCode ? 'text-white bg-black h-full px-2 ' : 'text-black'"
      >
        main.rs
      </button>
      <button
        @click="showCode = false"
        :class="!showCode ? 'text-white bg-black h-full px-2' : 'text-black'"
      >
        Terminal
      </button>
    </div>
    <div class="flex gap-4">
      <!-- Remove this v-if, if the menu has features -->
      <button v-if="showHelp" @click="showHelp = true">
        <SettingsIcon sizeClass="w-5" />
      </button>
      <button @click="runCode()" class="mr-3">
        <PlayIcon sizeClass="w-5" />
      </button>
    </div>
  </div>

  <div v-show="showCode" ref="editor" class="min-h-screen"></div>

  <pre
    v-show="!showCode"
    class="min-w-screen min-h-screen bg-gray-950 text-white overflow-y-scroll p-4"
  >
    {{ terminalResponse }}
  </pre>
</template>

<style scoped>
.min-h-screen {
  min-height: calc(100vh - 40px); /* 40px es el tamaño del header */
}
</style>
