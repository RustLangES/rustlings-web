import CodeMirror from "@uiw/react-codemirror"
import { useCallback, useState } from "react"
import { rust } from "~/helpers/config"
import { gruvbox } from "~/helpers/theme"

export function CodeEditor() {
	const [value, setValue] = useState('fn main() {\n    println!("Hola, mundo!");\n}\n')

	const onChange = useCallback((val: string) => {
		setValue(val)
	}, [])

	return (
		<CodeMirror
			value={value}
			extensions={[rust()]}
			theme={gruvbox}
			onChange={onChange}
			className="flex-1 min-h-[300px] overflow-y-auto scroll-container"
			id="editor"
		/>
	)
}
