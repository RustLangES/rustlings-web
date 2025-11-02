import { IconLoader2 } from "@tabler/icons-react"

export default function ExecutingIndicator() {
	return (
		<div className="text-yellow-400 font-semibold flex items-center gap-2">
			<IconLoader2 className={"animate-spin size-4"} /> $ cargo run
		</div>
	)
}
