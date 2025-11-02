import { create } from "zustand"
import { type ExecutionResult, rustPlayground } from "~/features/content/server/compiler.ts"

interface RustCompilerState {
	code: string
	isExecuting: boolean
	result: ExecutionResult | null
	liveOutput: { stdout: string; stderr: string }
	setCode: (code: string) => void
	execute: () => Promise<void>
	reset: () => void
}

export const useRustCompilerStore = create<RustCompilerState>((set, get) => ({
	code: 'fn main() {\n    println!("Hello, world!");\n}',
	isExecuting: false,
	result: null,
	liveOutput: { stdout: "", stderr: "" },

	setCode: (code) => set({ code }),

	execute: async () => {
		set({
			isExecuting: true,
			result: null,
			liveOutput: { stdout: "", stderr: "" },
		})

		try {
			const executionResult = await rustPlayground.execute(
				get().code,
				{
					channel: "stable",
					mode: "debug",
					edition: "2021",
				},
				(data) =>
					set((state) => ({
						liveOutput: { ...state.liveOutput, stdout: state.liveOutput.stdout + data },
					})),
				(data) =>
					set((state) => ({
						liveOutput: { ...state.liveOutput, stderr: state.liveOutput.stderr + data },
					})),
			)

			console.log("Resultado de la ejecución:", executionResult)

			set({ result: executionResult })
		} catch (error) {
			console.error("Error ejecutando código:", error)
		} finally {
			set({ isExecuting: false })
		}
	},

	reset: () =>
		set({
			code: 'fn main() {\n    println!("Hello, world!");\n}',
			isExecuting: false,
			result: null,
			liveOutput: { stdout: "", stderr: "" },
		}),
}))
