import { completeFromList } from "@codemirror/autocomplete"
import {
	continuedIndent,
	foldInside,
	foldNodeProp,
	indentNodeProp,
	LanguageSupport,
	LRLanguage,
} from "@codemirror/language"
import { parser } from "@lezer/rust"
import { rustCompletions } from "./keywords"

const rustLanguage = LRLanguage.define({
	name: "rust",
	parser: parser.configure({
		props: [
			indentNodeProp.add({
				IfExpression: continuedIndent({ except: /^\s*({|else\b)/ }),
				"String BlockComment": () => null,
				AttributeItem: (cx) => cx.continue(),
				"Statement MatchArm": continuedIndent(),
			}),
			foldNodeProp.add((type) => {
				if (/(Block|edTokens|List)$/.test(type.name)) return foldInside
				if (type.name.toString() === "BlockComment") return (tree) => ({ from: tree.from + 2, to: tree.to - 2 })
				return undefined
			}),
		],
	}),
	languageData: {
		commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
		indentOnInput: /^\s*(?:\{|\})$/,
		closeBrackets: { stringPrefixes: ["b", "r", "br"] },
		autocomplete: completeFromList(rustCompletions),
	},
})

export function rust() {
	return new LanguageSupport(rustLanguage)
}
