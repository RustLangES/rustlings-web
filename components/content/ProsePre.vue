<script setup lang="ts">
import { Copy } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";

defineProps({
  code: {
    type: String,
    default: "",
  },
  filename: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const { copy, copied } = useClipboard();

const showCopiedMessage = ref(false);
onMounted(() => {
  if (copied) {
    showCopiedMessage.value = true;
    setTimeout(() => {
      showCopiedMessage.value = false;
    }, 3000);
  }
});
</script>

<template>
  <div>
    <div class="bg-editor-bg shadow-lg my-5 rounded-md pt-3 px-5 group">
      <div class="flex justify-between items-center">
        <div
          class="border-b font-mono text-xs text-center"
        >
          {{ filename }}
        </div>
        <div class="flex justify-end">
          <Copy
            v-if="!copied"
            class="cursor-pointer opacity-50"
            :size="16"
            @click="copy(code)"
          />
          <div v-else class="text-xs opacity-50">Copied!</div>
        </div>
      </div>
      <pre
        class="my-0 font-[500] bg-transparent leading-normal font-mono"
        :class="$props.class"
      >
        <slot />
      </pre>
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
