import { IconLoader2, IconTerminal } from "@tabler/icons-react"
import { useRustCompilerStore } from "~/features/content/stores/useRustCompilerStore.ts"

export default function ReactTerminal() {
	const isExecuting = useRustCompilerStore((state) => state.isExecuting)
	const liveOutput = useRustCompilerStore((state) => state.liveOutput)
	const result = useRustCompilerStore((state) => state.result)

	return (
		<div className="border-t border-stroke-color rounded-b-lg text-sm font-mono bg-dark-fg h-full flex flex-col">
			<div className="flex items-end gap-2 border-b border-stroke-color bg-light-bg px-3 h-8">
				<button
					type="button"
					className="flex items-center gap-2 px-3 py-1 rounded-t-sm text-fg font-medium shadow-inner hover:bg-neutral-600/90 transition-colors"
				>
					<IconTerminal size={18} />
					<span>Terminal</span>
				</button>
			</div>

			<div className="p-3 text-fg space-y-2 font-mono overflow-auto flex-1 min-h-0">
				{isExecuting && (
					<div className="text-yellow-400 font-semibold flex items-center gap-2">
						<IconLoader2 className={"animate-spin size-4"} /> $ cargo run
					</div>
				)}

				{liveOutput.stdout && (
					<div className="whitespace-pre-wrap font-medium">
						<span className="text-cyan-400">{">>> "}</span>
						<span className="text-emerald-300">{liveOutput.stdout}</span>
					</div>
				)}

				{liveOutput.stderr && (
					<div className="whitespace-pre-wrap">
						<span className="text-neutral-400">{liveOutput.stderr}</span>
					</div>
				)}

				{result && !isExecuting && (
					<div className={`font-semibold ${result.success ? "text-emerald-400" : "text-red-500"}`}>
						{result.success ? "✓ Compilado exitosamente" : "✗ Error de compilación"}
					</div>
				)}
			</div>
		</div>
	)
}
