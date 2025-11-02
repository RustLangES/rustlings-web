import { useRustCompilerStore } from "~/features/content/stores/useRustCompilerStore.ts"
import TerminalHeader from "./terminal/TerminalHeader"
import TerminalOutput from "./terminal/TerminalOutput"

export default function ReactTerminal() {
	const isExecuting = useRustCompilerStore((state) => state.isExecuting)
	const liveOutput = useRustCompilerStore((state) => state.liveOutput)
	const result = useRustCompilerStore((state) => state.result)

	return (
		<div className="border-t border-stroke-color rounded-b-lg text-sm font-mono bg-dark-fg h-full flex flex-col">
			<TerminalHeader />
			<TerminalOutput isExecuting={isExecuting} liveOutput={liveOutput} result={result} />
		</div>
	)
}
