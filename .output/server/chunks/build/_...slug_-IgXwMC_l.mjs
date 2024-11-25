import _sfc_main$2 from './ContentDoc-0603aUKX.mjs';
import _sfc_main$3 from './ContentRenderer-DhdHnIg3.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, unref, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting, LRLanguage, indentNodeProp, continuedIndent, foldNodeProp, foldInside } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { parser } from '@lezer/rust';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-vue-next';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './ContentQuery-vqTj_WQG.mjs';
import './query-C25a5Py8.mjs';
import './server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './preview-q3S7Bnh7.mjs';
import './ContentRendererMarkdown-CCIh8IKt.mjs';
import 'property-information';
import './node-hwMnPqaI.mjs';

const chalky = "#d79921", coral = "#fb4934", cyan = "#83a598", invalid = "#ffffff", ivory = "#abb2bf", stone = "#7d8799", malibu = "#458588", sage = "#8ec07c", whiskey = "#fe9019", violet = "#b16286", darkBackground = "#1d2021", highlightBackground = "#1d2021", tooltipBackground = "#3c3836", selection = "#504945", cursor = "#fabd2f";
const gruvboxDarkTheme = EditorView.theme(
  {
    "&": {
      color: ivory
    },
    ".cm-content": {
      caretColor: cursor
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },
    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: highlightBackground },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
      outline: "1px solid #515a6b"
    },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: stone,
      border: "none"
    },
    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "none",
      backgroundColor: tooltipBackground
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: ivory
      }
    }
  },
  { dark: true }
);
const gruvboxDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: violet },
  {
    tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
    color: coral
  },
  { tag: [tags.function(tags.variableName), tags.labelName], color: malibu },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: whiskey },
  { tag: [tags.definition(tags.name), tags.separator], color: ivory },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: chalky
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: cyan
  },
  { tag: [tags.meta, tags.comment], color: stone },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: stone, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: coral },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage },
  { tag: tags.invalid, color: invalid }
]);
[
  gruvboxDarkTheme,
  syntaxHighlighting(gruvboxDarkHighlightStyle)
];
LRLanguage.define({
  name: "rust",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        IfExpression: continuedIndent({ except: /^\s*({|else\b)/ }),
        "String BlockComment": () => null,
        "AttributeItem": (cx) => cx.continue(),
        "Statement MatchArm": continuedIndent()
      }),
      foldNodeProp.add((type) => {
        if (/(Block|edTokens|List)$/.test(type.name)) return foldInside;
        if (type.name == "BlockComment") return (tree) => ({ from: tree.from + 2, to: tree.to - 2 });
        return void 0;
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:\{|\})$/,
    closeBrackets: { stringPrefixes: ["b", "r", "br"] }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CodeMirror",
  __ssrInlineRender: true,
  props: {
    code: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "editor" }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CodeMirror.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentDoc = _sfc_main$2;
      const _component_ContentRenderer = _sfc_main$3;
      const _component_CodeMirror = _sfc_main$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-2 gap-2.5 m-2.5" }, _attrs))} data-v-eb9a447d><section class="bg-light-bg h-[calc(100vh-20px)] border border-stroke-color rounded-[10px] flex flex-col" data-v-eb9a447d>`);
      _push(ssrRenderComponent(_component_ContentDoc, { class: "flex-grow" }, {
        default: withCtx(({ doc }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="scroll-container flex-grow m-2.5 overflow-auto" data-v-eb9a447d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ContentRenderer, { value: doc }, null, _parent2, _scopeId));
            _push2(`</div><div buttons class="flex justify-between m-2.5 mt-auto" data-v-eb9a447d${_scopeId}><a${ssrRenderAttr("href", doc && doc.previousPath ? `/${doc.previousPath}` : void 0)} class="${ssrRenderClass([{
              "pointer-events-none text-gray-400": !doc || !doc.previousPath
            }, "flex items-center"])}" data-v-eb9a447d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CircleChevronLeft), { size: 30 }, null, _parent2, _scopeId));
            _push2(`</a><a${ssrRenderAttr("href", doc && doc.nextPath ? `/${doc.nextPath}` : void 0)} class="${ssrRenderClass([{
              "pointer-events-none text-gray-400": !doc || !doc.nextPath
            }, "flex items-center"])}" data-v-eb9a447d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CircleChevronRight), { size: 30 }, null, _parent2, _scopeId));
            _push2(`</a></div>`);
          } else {
            return [
              createVNode("div", { class: "scroll-container flex-grow m-2.5 overflow-auto" }, [
                createVNode(_component_ContentRenderer, { value: doc }, null, 8, ["value"])
              ]),
              createVNode("div", {
                buttons: "",
                class: "flex justify-between m-2.5 mt-auto"
              }, [
                createVNode("a", {
                  href: doc && doc.previousPath ? `/${doc.previousPath}` : void 0,
                  class: [{
                    "pointer-events-none text-gray-400": !doc || !doc.previousPath
                  }, "flex items-center"]
                }, [
                  createVNode(unref(CircleChevronLeft), { size: 30 })
                ], 10, ["href"]),
                createVNode("a", {
                  href: doc && doc.nextPath ? `/${doc.nextPath}` : void 0,
                  class: [{
                    "pointer-events-none text-gray-400": !doc || !doc.nextPath
                  }, "flex items-center"]
                }, [
                  createVNode(unref(CircleChevronRight), { size: 30 })
                ], 10, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="bg-light-bg h-[calc(100vh-20px)] p-2.5 border border-stroke-color rounded-[10px]" data-v-eb9a447d>`);
      _push(ssrRenderComponent(_component_CodeMirror, null, null, _parent));
      _push(`</section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb9a447d"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-IgXwMC_l.mjs.map
