import _RemarkEmoji from 'remark-emoji'
import _Highlight from 'C:/Users/jonat/Programacion/rustlings-web/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.js'

export const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":{"default":"dracula"}}