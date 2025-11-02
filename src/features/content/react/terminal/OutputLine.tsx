import { OutputVariant } from "~/features/content/enums/OutputVariant.enum.ts"

interface OutputLineProps {
	type: "stdout" | "stderr"
	content: string
}

export default function OutputLine({ type, content }: OutputLineProps) {
	if (type === OutputVariant.Stdout) {
		return (
			<div className="whitespace-pre-wrap font-medium">
				<span className="text-cyan-400">{">>> "}</span>
				<span className="text-emerald-300">{content}</span>
			</div>
		)
	}

	if (type === OutputVariant.Stderr) {
		return (
			<div className="whitespace-pre-wrap">
				<span className="text-neutral-400">{content}</span>
			</div>
		)
	}

	return null
}
