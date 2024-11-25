import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { Copy } from 'lucide-vue-next';
import { useClipboard } from '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProsePre",
  __ssrInlineRender: true,
  props: {
    code: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const { copy, copied } = useClipboard();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="bg-editor-bg shadow-lg my-5 rounded-md pt-3 px-5 group"><div class="flex justify-between items-center"><div class="border-b font-mono text-xs text-center">${ssrInterpolate(__props.filename)}</div><div class="flex justify-end">`);
      if (!unref(copied)) {
        _push(ssrRenderComponent(unref(Copy), {
          class: "cursor-pointer opacity-50",
          size: 16,
          onClick: ($event) => unref(copy)(__props.code)
        }, null, _parent));
      } else {
        _push(`<div class="text-xs opacity-50">Copied!</div>`);
      }
      _push(`</div></div><pre class="${ssrRenderClass([_ctx.$props.class, "my-0 font-[500] bg-transparent leading-normal font-mono"])}">        `);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`
      </pre></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProsePre.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProsePre-CQN-c8c9.mjs.map
