import CompilationStatus from "./CompilationStatus"
import ExecutingIndicator from "./ExecutingIndicator"
import OutputLine from "./OutputLine"

interface TerminalOutputProps {
	isExecuting: boolean
	liveOutput: {
		stdout?: string
		stderr?: string
	}
	result?: {
		success: boolean
	} | null
}

export default function TerminalOutput({ isExecuting, liveOutput, result }: TerminalOutputProps) {
	return (
		<div className="p-3 text-fg space-y-2 font-mono overflow-auto flex-1 min-h-0">
			{isExecuting && <ExecutingIndicator />}

			{liveOutput.stdout && <OutputLine type="stdout" content={liveOutput.stdout} />}

			{liveOutput.stderr && <OutputLine type="stderr" content={liveOutput.stderr} />}

			{result && !isExecuting && <CompilationStatus success={result.success} />}
		</div>
	)
}
