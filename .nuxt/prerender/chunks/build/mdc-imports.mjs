import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import _RemarkEmoji from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/remark-emoji/index.js';
import { visit } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/unist-util-visit/index.js';
import { toString } from 'file://C:/Users/jonat/Programacion/rustlings-web/node_modules/hast-util-to-string/index.js';

function rehypeHighlight$1(opts) {
  const options = opts;
  return async (tree) => {
    const tasks = [];
    const styles = [];
    visit(
      tree,
      (node) => ["pre", "code"].includes(node.tagName) && !!(node.properties?.language || node.properties?.highlights),
      (node) => {
        const _node = node;
        const highlights = typeof _node.properties.highlights === "string" ? _node.properties.highlights.split(/[,\s]+/).map(Number) : Array.isArray(_node.properties.highlights) ? _node.properties.highlights.map(Number) : [];
        const task = options.highlighter(
          toString(node),
          _node.properties.language,
          options.theme,
          {
            highlights: highlights.filter(Boolean),
            meta: _node.properties.meta
          }
        ).then(({ tree: tree2, className, style, inlineStyle }) => {
          _node.properties.className = ((_node.properties.className || "") + " " + className).trim();
          _node.properties.style = ((_node.properties.style || "") + " " + inlineStyle).trim();
          if (_node.children[0]?.tagName === "code") {
            _node.children[0].children = tree2;
          } else {
            _node.children = tree2[0].children || tree2;
          }
          if (style)
            styles.push(style);
        });
        tasks.push(task);
      }
    );
    if (tasks.length) {
      await Promise.all(tasks);
      tree.children.push({
        type: "element",
        tagName: "style",
        children: [{ type: "text", value: cleanCSS(styles.join("")) }],
        properties: {}
      });
    }
  };
}
const cleanCSS = (css) => {
  const styles = css.split("}").filter((s) => Boolean(s.trim())).map((s) => s.trim() + "}");
  return Array.from(new Set(styles)).join("");
};

const defaults = {
  theme: {},
  async highlighter(code, lang, theme, options) {
    try {
      if (globalThis._importMeta_.browser && window.sessionStorage.getItem("mdc-shiki-highlighter") === "browser") {
        return import('./mdc-highlighter.mjs').then((h) => h.default(code, lang, theme, options)).catch(() => ({}));
      }
      return await $fetch("/api/_mdc/highlight", {
        params: {
          code,
          lang,
          theme: JSON.stringify(theme),
          options: JSON.stringify(options)
        }
      });
    } catch (e) {
      if (globalThis._importMeta_.browser && e?.response?.status === 404) {
        window.sessionStorage.setItem("mdc-shiki-highlighter", "browser");
        return this.highlighter?.(code, lang, theme, options);
      }
    }
    return Promise.resolve({ tree: [{ type: "text", value: code }], className: "", style: "" });
  }
};
function rehypeHighlight(opts = {}) {
  const options = { ...defaults, ...opts };
  if (typeof options.highlighter !== "function") {
    options.highlighter = defaults.highlighter;
  }
  return rehypeHighlight$1(options);
}

const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
};

const rehypePlugins = {
  'highlight': { instance: rehypeHighlight, options: {} },
};

const highlight = {"theme":{"default":"dracula"}};

export { highlight, rehypePlugins, remarkPlugins };
//# sourceMappingURL=mdc-imports.mjs.map
