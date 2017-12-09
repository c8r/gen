import path from 'path'
import test from 'ava'
import {
  getData,
  render,
  writePages,
  server,
  createComponents,
  createHTML,
  jsx,
  Markdown,
  primitives,
  markdownComponents
} from './lib'

const dirname = path.join(__dirname, './examples')

test('getData reads theme.json, lab.json, .jsx, and .md files', async t => {
  const data = await getData(dirname)
  t.snapshot(data)
})

test('render creates pages', async t => {
  const data = await getData(dirname)
  const pages = await render(data)
  t.snapshot(pages)
})

test('exports primitives config', t => {
  t.snapshot(primitives)
})

test('generates markdown components', t => {
  const components = markdownComponents()
  t.snapshot(components)
})
