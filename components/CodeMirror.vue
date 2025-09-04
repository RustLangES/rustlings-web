<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { basicSetup, EditorView } from 'codemirror';
import { gruvbox } from '../helpers/codemirror/theme.ts';
import { rust } from '../helpers/codemirror/config.ts';
import {keymap, lineNumbers} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"

const props = defineProps<{
  code?: string;
}>();

const emit = defineEmits(['update:code']);

const codeContent = ref(props.code);

onMounted(() => {
  new EditorView({
    doc: codeContent.value,
    extensions: [
      basicSetup,
      gruvbox,
      rust(),
      keymap.of([indentWithTab]),

      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const newCode = update.state.doc.toString();
          emit('update:code', newCode);
        }
      })
    ],
    parent: document.getElementById("editor")!
  });
});
</script>

<template>
  <div id="editor"></div>
</template>

