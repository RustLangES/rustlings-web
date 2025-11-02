interface OutputLineProps {
	type: "stdout" | "stderr"
	content: string
}

export default function OutputLine({ type, content }: OutputLineProps) {
	if (type === "stdout") {
		return (
			<div className="whitespace-pre-wrap font-medium">
				<span className="text-cyan-400">{">>> "}</span>
				<span className="text-emerald-300">{content}</span>
			</div>
		)
	}

	if (type === "stderr") {
		return (
			<div className="whitespace-pre-wrap">
				<span className="text-neutral-400">{content}</span>
			</div>
		)
	}

	return null
}
