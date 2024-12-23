import { parser } from "@lezer/rust";
import {
  continuedIndent,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  LRLanguage,
  LanguageSupport
} from "@codemirror/language";
import { completeFromList } from "@codemirror/autocomplete";
import { rustCompletions } from "./keywords"

const rustLanguage = LRLanguage.define({
  name: "rust",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        IfExpression: continuedIndent({ except: /^\s*({|else\b)/ }),
        "String BlockComment": () => null,
        "AttributeItem": cx => cx.continue(),
        "Statement MatchArm": continuedIndent()
      }),
      foldNodeProp.add(type => {
        if (/(Block|edTokens|List)$/.test(type.name)) return foldInside;
        if (type.name == "BlockComment") return tree => ({ from: tree.from + 2, to: tree.to - 2 });
        return undefined;
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:\{|\})$/,
    closeBrackets: { stringPrefixes: ["b", "r", "br"] },
    autocomplete: completeFromList(rustCompletions),
  }
});

export function rust() {
  return new LanguageSupport(rustLanguage);
}
