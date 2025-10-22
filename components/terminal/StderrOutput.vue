<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ content: string }>();
const linePatterns = [
  { 
    regex: /^(error|warning)\[E(\d+)\]:\s*(.+)$/, 
    handler: (match: RegExpMatchArray) => ({ 
      text: match[0], 
      type: match[1], 
      errorCode: match[2] 
    }) 
  },
  { 
    regex: /^(error|warning):/, 
    handler: (match: RegExpMatchArray, line: string, errors: any[]) => {
      if (line.includes('could not compile')) {
        errors.push({ text: '', type: 'separator' });
      }
      return { text: line, type: match[1] };
    }
  },
  { regex: /^\s*-->\s+/, type: 'file-path' },
  { regex: /^\s*(\d+\s*)?\|/, type: 'code' },
  { regex: /^help:/, type: 'help' },
  { regex: /^note:/, type: 'note' },
];

const parseStderr = computed(() => {
  const lines = props.content.split('\n');
  const compilation: string[] = [];
  const errors: { text: string; type: string; errorCode?: string }[] = [];
  let inErrorSection = false;

  for (const line of lines) {
    let matched = false;

    for (const pattern of linePatterns) {
      const match = line.match(pattern.regex);
      if (match) {
        inErrorSection = true;
        const result = pattern.handler 
          ? pattern.handler(match, line, errors) 
          : { text: line, type: pattern.type };
        errors.push(result);
        matched = true;
        break;
      }
    }

    if (!matched) {
      if (!inErrorSection && /Compiling|Finished|Running/.test(line)) {
        compilation.push(line);
      } else if (inErrorSection && line.trim()) {
        errors.push({ text: line, type: 'text' });
      }
    }
  }

  return { compilation, errors };
});

const getSpanClass = (type?: string) => type && ({
  error: 'text-red-400',
  warning: 'text-yellow',
  help: 'text-green-400',
  'file-path': 'text-blue-300',
  note: 'text-purple-400',
}[type]);
</script>

<template>
  <div class="terminal-stderr">
    <pre v-if="parseStderr.compilation.length" class="text-gray-400 text-sm whitespace-pre-wrap">{{ parseStderr.compilation.join('\n') }}</pre>

    <div v-if="parseStderr.compilation.length && parseStderr.errors.length" class="border-t border-gray-700 my-2" />

    <pre v-if="parseStderr.errors.length" class="text-sm font-mono whitespace-pre-wrap"><template v-for="(line, i) in parseStderr.errors" :key="i"><span v-if="line.type === 'separator'" class="block border-t border-gray-700 my-2"></span><template v-else-if="line.errorCode"><span :class="getSpanClass(line.type)">{{ line.type }}[<a 
            :href="`https://doc.rust-lang.org/stable/error_codes/E${line.errorCode}.html`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 underline"
          >E{{ line.errorCode }}</a>]: {{ line.text.split(']: ')[1] }}</span>
</template><span v-else-if="getSpanClass(line.type)" :class="getSpanClass(line.type)">{{ line.text }}
</span><template v-else>{{ line.text }}
</template></template></pre>
  </div>
</template>
