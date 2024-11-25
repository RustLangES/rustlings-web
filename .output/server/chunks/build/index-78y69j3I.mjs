import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _imports_0 = publicAssetsURL("/logo.svg");
const _imports_1 = publicAssetsURL("/ferris.png");
const _imports_2 = publicAssetsURL("/discord-mark-white.svg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(_attrs)} data-v-2a0d9c2d><section class="w-full h-screen flex flex-col bg-bg justify-center items-center" data-v-2a0d9c2d><img class="max-xs:w-52 logo"${ssrRenderAttr("src", _imports_0)} alt="rustlings" data-v-2a0d9c2d><div class="my-16 text-center" data-v-2a0d9c2d><h1 class="font-semibold text-6xl mb-4" data-v-2a0d9c2d>RustLings Web</h1><h3 class="text-xl" data-v-2a0d9c2d>Aprender Rust nunca fue tan f\xE1cil</h3></div><a class="px-8 py-2 border rounded-lg hover:border-white hover:-translate-y-1 hover:scale-110 cursor-pointer duration-300 border-stroke-color" data-v-2a0d9c2d>Aprender</a></section><section class="w-full h-[720px] p-20 justify-center items-center relative flex bg-dark-fg" data-v-2a0d9c2d><div class="w-full h-16 transform absolute bottom-full bg-[url(&#39;/figures.svg&#39;)] bg-repeat-x" data-v-2a0d9c2d></div><div class="max-w-5xl w-full gap-4 flex max-md:flex-col items-center" data-v-2a0d9c2d><img class="max-w-max w-full md:w-1/2 h-auto z-20"${ssrRenderAttr("src", _imports_1)} alt="" data-v-2a0d9c2d><p class="text-center w-full md:w-1/2 text-pretty" data-v-2a0d9c2d><span class="block font-bold text-lg" data-v-2a0d9c2d>\xA1Aprende Rust sin instalar nada!</span> Explora lecciones interactivas y experimenta con c\xF3digo en un playground integrado, directamente desde tu navegador. \u{1F680} </p></div><div class="w-full rotate-180 h-16 absolute top-full bg-[url(&#39;/figures.svg&#39;)] bg-repeat-x" data-v-2a0d9c2d></div></section><section class="min-h-screen h-max w-full flex p-20 justify-center items-center" data-v-2a0d9c2d><div class="max-w-5xl w-full gap-4 flex max-md:flex-col items-center" data-v-2a0d9c2d><div class="md:w-1/2 flex flex-col items-center" data-v-2a0d9c2d><p class="text-center w-full text-pretty" data-v-2a0d9c2d><span class="block font-bold text-lg" data-v-2a0d9c2d>Sigue aprendiendo junto a miles de entusiastas de Rust</span> Forma parte de nuestra comunidad, comparte tus avances, resuelve dudas y colabora con otros aprendices y expertos de Rust. </p><a class="mt-8 px-4 py-1 border rounded-lg hover:border-white hover:-translate-y-1 hover:scale-110 cursor-pointer duration-300 border-stroke-color font-bold flex items-center gap-1 w-max text-lg bg-light-bg" href="https://discord.com/channels/778674594856960012/1292726289479893044" target="_blank" data-v-2a0d9c2d><img class="aspect-square h-6"${ssrRenderAttr("src", _imports_2)} alt="" data-v-2a0d9c2d> Discord </a></div><div class="max-w-max w-full md:w-1/2 mx-auto relative flex items-center justify-center" data-v-2a0d9c2d><iframe src="https://discord.com/widget?id=778674594856960012&amp;theme=dark" allowtransparency="true" width="1000" height="475" frameborder="0" allowfullscreen sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" data-v-2a0d9c2d></iframe></div></div></section></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2a0d9c2d"]]);

export { index as default };
//# sourceMappingURL=index-78y69j3I.mjs.map
