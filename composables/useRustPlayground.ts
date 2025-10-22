import { ref, onMounted } from 'vue';
import { rustPlayground, type ExecuteOptions, type ExecutionResult } from '~/services/websocket';

export function useRustPlayground() {
  const isExecuting = ref(false);
  const output = ref({ stdout: '', stderr: '' });
  const lastResult = ref<ExecutionResult | null>(null);

  const executeCode = async (code: string, options: ExecuteOptions) => {
    isExecuting.value = true;
    output.value = { stdout: '', stderr: '' };
    lastResult.value = null;

    try {
      const result = await rustPlayground.execute(
        code,
        options,
        (stdout) => output.value.stdout += stdout,
        (stderr) => output.value.stderr += stderr
      );

      lastResult.value = result;
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      output.value.stderr = errorMsg;
      lastResult.value = { success: false, stdout: '', stderr: errorMsg };
      return lastResult.value;
    } finally {
      isExecuting.value = false;
    }
  };

  onMounted(() => rustPlayground.connect());

  return {
    executeCode,
    isExecuting,
    formattedOutput: output,
    terminalResponse: lastResult
  };
}