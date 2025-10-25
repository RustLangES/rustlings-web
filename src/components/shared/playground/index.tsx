import CodeMirror from "@uiw/react-codemirror"
import React from "react"
import { rust } from "../../../helpers/config"
import { gruvbox } from "../../../helpers/theme"

function Playground() {
	const [value, setValue] = React.useState('fn main() {\n    println!("Hola, mundo!");\n}\n')
	const onChange = React.useCallback((val, viewUpdate) => {
		setValue(val)
	}, [])
	return (
		<CodeMirror
			value={value}
			extensions={[rust()]}
			theme={gruvbox}
			onChange={onChange}
			className={"flex-1 min-h-[200px] overflow-y-auto scroll-container"}
			id="editor"
		/>
	)
}
export default Playground
