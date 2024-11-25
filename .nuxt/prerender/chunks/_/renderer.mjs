import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { getQuery, createError, appendResponseHeader, getResponseStatus, getResponseStatusText } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/h3/dist/index.mjs';
import { stringify, uneval } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/devalue/index.js';
import { joinURL, withoutTrailingSlash } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/@unhead/ssr/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unhead/dist/index.mjs';
import { d as defineRenderHandler, b as buildAssetsURL, p as publicAssetsURL, a as useStorage, g as getRouteRules, c as useRuntimeConfig, u as useNitroApp } from './nitro.mjs';
import { version, unref } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/vue/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/@unhead/shared/dist/index.mjs';
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
import 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/ofetch/dist/node.mjs';
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

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const componentIslands = false;

const appId = "nuxt-app";

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('../build/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getEntryIds = () => getClientManifest().then((r) => Object.values(r).filter(
  (r2) => (
    // @ts-expect-error internal key set by CSS inlining configuration
    r2._globalCSS
  )
).map((r2) => r2.src));
const getServerEntry = () => import('../build/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => import('../build/styles.mjs').then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await import('../virtual/_virtual_spa-template.mjs').then((r) => r.template).catch(() => "").then((r) => APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG);
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const payloadCache = useStorage("internal:nuxt:prerender:payload") ;
useStorage("internal:nuxt:prerender:island") ;
useStorage("internal:nuxt:prerender:island-props") ;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const PRERENDER_NO_SSR_ROUTES = /* @__PURE__ */ new Set(["/index.html", "/200.html", "/404.html"]);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = componentIslands;
  const islandContext = void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
    if (await payloadCache.hasItem(url)) {
      return payloadCache.getItem(url);
    }
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (PRERENDER_NO_SSR_ROUTES.has(url) ),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && !isRenderingIsland;
  const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, url, "_payload.json" ) + "?" + ssrContext.runtimeConfig.app.buildId : void 0;
  {
    ssrContext.payload.prerenderedAt = Date.now();
  }
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  {
    for (const id of await getEntryIds()) {
      ssrContext.modules.add(id);
    }
  }
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    {
      await payloadCache.setItem(url, response2);
    }
    return response2;
  }
  if (_PAYLOAD_EXTRACTION) {
    appendResponseHeader(event, "x-nitro-prerender", joinURL(url, "_payload.json" ));
    await payloadCache.setItem(withoutTrailingSlash(url), renderPayloadResponse(ssrContext));
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []) ;
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (_PAYLOAD_EXTRACTION && !NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", crossorigin: "anonymous", href: payloadURL } 
      ]
    }, headEntryOptions);
  }
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({ ssrContext, data: splitPayload(ssrContext).initial, src: payloadURL })  : renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: _PAYLOAD_EXTRACTION && !true ? "bodyClose" : "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      _rendered.html,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

export { renderer as default };
//# sourceMappingURL=renderer.mjs.map
