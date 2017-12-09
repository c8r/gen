const http = require('http')
const url = require('url')
const path = require('path')

const React = require('react')
const chokidar = require('chokidar')
const portfinder = require('portfinder')
const WebSocket = require('ws')

const getData = require('./getData')
const render = require('./render')

const getPages = async (dirname, opts) => {
  const data = await getData(dirname, opts)
  const pages = await render(data, opts)
  return pages
}

const start = async (dirname, opts) => {
  if (opts.port) {
    portfinder.basePort = parseInt(opts.port)
  }
  const port = await portfinder.getPortPromise()
  portfinder.basePort = port + 2
  const socketPort = await portfinder.getPortPromise()

  let socket
  let pages = await getPages(dirname, opts)

  const watcher = chokidar.watch(dirname, {
    depth: 1,
    ignoreInitial: true,
    ignored: '!*.(jsx|md|json)'
  })

  const socketServer = new WebSocket.Server({ port: socketPort })

  socketServer.on('connection', res => {
    socket = res
  })

  const update = async () => {
    if (!socket) return
    pages = await getPages(dirname, opts)
    socket.send(JSON.stringify({ reload: true }))
  }

  watcher.on('change', async filename => {
    if (!socket) return
    const base = path.basename(filename)
    const ext = path.extname(base)
    if (!/\.(jsx|md|json)$/.test(ext)) return
    // todo: handle this per file
    update()
  })

  const app = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const name = pathname === '/' ? 'index' : pathname.replace(/^\//, '').replace(/\/$/, '')
    const page = pages.find(page => page.name === name)
    if (!page) {
      res.write('page not found: ' + pathname)
      res.end()
      return
    }
    res.write(page.html)
    res.write(script(socketPort))
    res.end()
  })

  try {
    const server = await app.listen(port)
    return server
  } catch (err) {
    console.log(err)
    throw err
  }
}

const script = (port) => `<script type='text/javascript'>
const socket = new WebSocket('ws://localhost:${port}')
socket.onmessage = msg => {
  const data = JSON.parse(msg.data)
  if (data.reload) {
    window.location.reload()
  }
}
</script>`

module.exports = start
