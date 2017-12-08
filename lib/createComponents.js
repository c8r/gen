const system = require('styled-system')
const styled = require('styled-components').default
const glamorous = require('glamorous')
const babel = require('babel-standalone')
const transformJSX = require('babel-plugin-transform-react-jsx')

const { toComponent } = require('./jsx')

const componentCreators = {
  'styled-components': ({
    name,
    type,
    style,
    props,
    system = [],
  }, lib) => {
    const tag = lib[type] || type
    const funcs = getFunctions(system)
    const Comp = styled(tag)([], style, ...funcs)

    Comp.defaultProps = props
    Comp.displayName = name

    return Comp
  },
  glamorous: ({
    name,
    type,
    style,
    props,
    system,
  }, lib) => {
    console.log('todo')
  }
}

const createScope = (imports, lib) => imports
  .map(key => ({
    key,
    value: lib[key]
  }))
  .reduce((a, b) => Object.assign(a, {
    [b.key]: b.value
  }), {})

const createComposite = (comp, lib) => {
  // todo npm/local modules scope
  const scope = createScope(comp.imports, lib)
  const Comp = toComponent(comp.jsx, scope)
  return Comp
}

const getFunctions = funcs => funcs.map(key => system[key])
  .filter(func => typeof func === 'function')

const isBase = ({ type }) => type && /[a-z]/.test(type)
const isExtension = ({ type }) => type && /[A-Z]/.test(type)
const isComposite = ({ type, imports, jsx }) => !type && imports && jsx
const isExternal = ({ external }) => external

const mergeComponents = create => (a, comp) => Object.assign(a, {
  [comp.name]: create(comp, a)
}, {})

const createComponent = opts => (comp, lib) => {
  if (isExternal(comp)) return null
  if (isComposite(comp)) return createComposite(comp, lib)
  console.log(comp.name, !!comp.type, !!comp.style)
  if (!comp.name || !comp.type || !comp.style) return null

  const sx = componentCreators[opts.library] || componentCreators['styled-components']

  return sx(comp, lib)
}

const createComponents = (config, opts) => {
  const base = config.filter(isBase)
  const extensions = config.filter(isExtension)
  const composites = config.filter(isComposite)
  const externals = config.filter(isExternal)

  const sorted = [
    ...base,
    ...extensions,
    ...composites,
    ...externals
  ]

  const create = createComponent(opts)

  const components = sorted.reduce(mergeComponents(create))

  return components
}
module.exports = createComponents
