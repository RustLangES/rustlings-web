import { defineComponent, useSlots, h, useSSRContext } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/index.mjs';
import _sfc_main$1 from './ContentQuery-vqTj_WQG.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/ohash/dist/index.mjs';
import './query-C25a5Py8.mjs';
import './server.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unified/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/remark-parse/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/remark-rehype/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/remark-mdc/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/remark-gfm/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/rehype-external-links/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/rehype-sort-attribute-values/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/rehype-sort-attributes/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/rehype-raw/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/detab/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/micromark-util-sanitize-uri/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/hast-util-to-string/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/github-slugger/index.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unenv/runtime/fetch/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/jonat/Programacion/rustlings-web/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unhead/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/@unhead/shared/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/server-renderer/index.mjs';
import './preview-q3S7Bnh7.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/cookie-es/dist/index.mjs';

const emptyNode = (slot, data) => h("pre", null, JSON.stringify({ message: "You should use slots with <ContentList>", slot, data }, null, 2));
const ContentList = defineComponent({
  name: "ContentList",
  props: {
    /**
     * Query props
     */
    /**
     * The path of the content to load from content source.
     * @default '/'
     */
    path: {
      type: String,
      required: false,
      default: void 0
    },
    /**
     * A query builder params object to be passed to <ContentQuery /> component.
     */
    query: {
      type: Object,
      required: false,
      default: void 0
    }
  },
  /**
   * Content empty fallback
   * @slot empty
   */
  /**
   * Content not found fallback
   * @slot not-found
   */
  render(ctx) {
    const slots = useSlots();
    const { path, query } = ctx;
    const contentQueryProps = {
      ...query || {},
      path: path || (query == null ? void 0 : query.path) || "/"
    };
    return h(
      _sfc_main$1,
      contentQueryProps,
      {
        // Default slot
        default: (slots == null ? void 0 : slots.default) ? ({ data, refresh, isPartial }) => slots.default({ list: data, refresh, isPartial, ...this.$attrs }) : (bindings) => emptyNode("default", bindings.data),
        // Empty slot
        empty: (bindings) => (slots == null ? void 0 : slots.empty) ? slots.empty(bindings) : emptyNode("default", bindings == null ? void 0 : bindings.data),
        // Not Found slot
        "not-found": (bindings) => {
          var _a;
          return (slots == null ? void 0 : slots["not-found"]) ? (_a = slots == null ? void 0 : slots["not-found"]) == null ? void 0 : _a.call(slots, bindings) : emptyNode("not-found", bindings == null ? void 0 : bindings.data);
        }
      }
    );
  }
});
const _sfc_main = ContentList;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentList-Dq0VicXr.mjs.map
