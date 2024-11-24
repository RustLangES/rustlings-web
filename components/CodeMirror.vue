<script setup lang="ts">
import { onMounted } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { gruvbox } from '../helpers/codemirror/theme.ts'
import { rust } from '../helpers/codemirror/config.ts'

const props = defineProps<{
  code?: string
}>();

onMounted(() => {
  const codeContent = props.code ?? "fn main() {\n\tprintln!('Hola');\n}\n\n\n\n\n\n\n";

  new EditorView({
    doc: codeContent,
    extensions: [basicSetup, gruvbox, rust()],
    parent: document.getElementById("editor")!
  })
})
</script>

<template>
  <div id="editor"></div>
</template>
