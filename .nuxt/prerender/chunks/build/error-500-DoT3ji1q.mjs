import { mergeProps, useSSRContext } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useHead } from './server.mjs';
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
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/jonat/Programacion/rustlings-web/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/radix3/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unhead/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/@unhead/shared/dist/index.mjs';
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue-router/dist/vue-router.node.mjs';

const _sfc_main = {
  __name: "error-500",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: Number,
      default: 500
    },
    statusMessage: {
      type: String,
      default: "Server error"
    },
    description: {
      type: String,
      default: "This page is temporarily unavailable."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [
        {
          children: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();`
        }
      ],
      style: [
        {
          children: `*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black" }, _attrs))} data-v-f7ad9679><div class="-bottom-1/2 fixed h-1/2 left-0 right-0 spotlight" data-v-f7ad9679></div><div class="max-w-520px text-center" data-v-f7ad9679><h1 class="font-medium mb-8 sm:text-10xl text-8xl" data-v-f7ad9679>${ssrInterpolate(__props.statusCode)}</h1><p class="font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl" data-v-f7ad9679>${ssrInterpolate(__props.description)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/error-500.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error500 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7ad9679"]]);

export { error500 as default };
//# sourceMappingURL=error-500-DoT3ji1q.mjs.map
