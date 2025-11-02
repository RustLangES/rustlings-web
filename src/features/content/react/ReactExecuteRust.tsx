import { IconPlayerPlay } from "@tabler/icons-react"
import { useRustCompilerStore } from "~/features/content/stores/useRustCompilerStore.ts"

export default function ReactExecuteRust() {
	const execute = useRustCompilerStore((state) => state.execute)
	return (
		<button
			onClick={execute}
			type={"button"}
			className="md:absolute md:left-1/2 md:-translate-x-1/2 ml-auto flex items-center gap-1.5 bg-neutral-500/40 px-2 py-1 rounded-md
    hover:bg-neutral-500/70 text-sm cursor-pointer"
		>
			<IconPlayerPlay size={18} /> Ejecutar
		</button>
	)
}
