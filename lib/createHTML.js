module.exports = ({
  data = {},
  css = '',
  body = ''
}) => {
  const meta = getMeta(data)

  return [
    '<DOCTYPE html>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta http-equiv="x-ua-compatible" content="ie=edge">',
    '<meta name="generator" content="Compositor Gen">',
    `<title>${data.title}</title>`,
    meta('description'),
    meta('og:image'),
    meta('twitter:image'),
    getStylesheets(data.stylesheets),
    `<style>${baseCSS}</style>`,
    css,
    '<body>',
    body,
    getScripts(data.scripts),
    '</body>',
  ].filter(n => !!n)
  .join('')
}

const getMeta = data => key => data[key] ? `<meta name='${key}' content='${data[key]}'>` : ''

const getStylesheets = stylesheets => Array.isArray(stylesheets)
  ? stylesheets.map(href => `<link rel='stylesheet' href='${href}'>`)
  : ''

const getScripts = scripts => Array.isArray(scripts)
  ? scripts.map(script => `<script>${script}</script>`)
  : ''

const baseCSS = `*{box-sizing:border-box}body{margin:0}`
