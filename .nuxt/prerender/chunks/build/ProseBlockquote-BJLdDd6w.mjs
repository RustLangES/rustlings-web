import { ssrRenderAttrs, ssrRenderSlot } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/server-renderer/index.mjs';
import { useSSRContext } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<blockquote${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</blockquote>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProseBlockquote = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { ProseBlockquote as default };
//# sourceMappingURL=ProseBlockquote-BJLdDd6w.mjs.map
