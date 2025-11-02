import CodeMirror from "@uiw/react-codemirror"
import { useCallback } from "react"
import { useRustCompilerStore } from "~/features/content/stores/useRustCompilerStore.ts"
import { rust } from "~/helpers/config"
import { gruvbox } from "~/helpers/theme"

export default function ReactCodeEditor() {
	const code = useRustCompilerStore((state) => state.code)
	const setCode = useRustCompilerStore((state) => state.setCode)

	const onChange = useCallback(
		(val: string) => {
			setCode(val)
		},
		[setCode],
	)

	return (
		<CodeMirror
			value={code}
			extensions={[rust()]}
			theme={gruvbox}
			onChange={onChange}
			height="100%"
			className="h-full"
			id="editor"
		/>
	)
}
