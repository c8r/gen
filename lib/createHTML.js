module.exports = ({
  data = {},
  css = '',
  fontLinks = '',
  body = ''
}) => {
  const meta = getMeta(data)

  return [
    '<!DOCTYPE html>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta http-equiv="x-ua-compatible" content="ie=edge">',
    '<meta name="generator" content="Compositor Gen">',
    `<title>${data.title}</title>`,
    meta('description'),
    meta('og:image'),
    getTwitterCard(data.twitter),
    // meta('twitter:image'),
    fontLinks,
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

const getMeta = data => (key, name) =>
  data[key] ? `<meta name='${name || key}' content='${data[key]}'>` : ''

const getStylesheets = stylesheets => Array.isArray(stylesheets)
  ? stylesheets.map(href => `<link rel='stylesheet' href='${href}'>`)
  : ''

const getTwitterCard = (twitter = {}) => Object.keys(twitter || {})
  .map(key => getMeta(twitter)(key, 'twitter:' + key))
  .join('')

const getScripts = scripts => Array.isArray(scripts)
  ? scripts.map(script => `<script>${script}</script>`)
  : ''

const baseCSS = `*{box-sizing:border-box}body{margin:0}`
