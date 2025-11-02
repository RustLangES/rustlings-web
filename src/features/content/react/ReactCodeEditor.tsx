import CodeMirror from "@uiw/react-codemirror"
import { useCallback, useState } from "react"
import { rust } from "~/helpers/config"
import { gruvbox } from "~/helpers/theme"

export default function ReactCodeEditor() {
	const [value, setValue] = useState("fn main() {\n" + '    println!("Hola, mundo!");\n'.repeat(100) + "}\n")
	const onChange = useCallback((val: string) => {
		setValue(val)
	}, [])

	return (
		<CodeMirror
			value={value}
			extensions={[rust()]}
			theme={gruvbox}
			onChange={onChange}
			height="100%"
			className="h-full"
			id="editor"
		/>
	)
}
