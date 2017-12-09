const React = require('react')

const h = React.createElement

module.exports = props => (
  h('div', {
    style: {
      maxWidth: 768,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 64,
      paddingBottom: 128,
    }
  }, props.children)
)
