const createComponents = require('./createComponents')

module.exports = opts => createComponents([
  {
    name: 'Title',
    type: 'h1',
    style: {},
    props: {
      mt: 4,
      mb: 2
    }
  },
  {
    name: 'Heading',
    type: 'h2',
    style: {},
    props: {
      mt: 4,
      mb: 2,
    }
  },
  {
    name: 'Subhead',
    type: 'h3',
    style: {},
    props: {
      mt: 3,
      mb: 2
    }
  },
  {
    name: 'Pre',
    type: 'pre',
    style: {
      fontFamily: 'Menlo, monospace',
      overflow: 'auto',
    },
    props: {
      p: 0,
      mt: 3,
      mb: 3
    }
  },
  {
    name: 'Code',
    type: 'code',
    style: {
      fontFamily: 'Menlo, monospace',
    },
    props: {}
  },
  {
    name: 'Table',
    type: 'table',
    style: {
      borderCollapse: 'separate',
      borderSpacing: 0,
      maxWidth: '100%',
      width: '100%',
      '& th': {
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 'inherit',
        verticalAlign: 'bottom',
        padding: '4px',
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#ddd'
      },
      '& td': {
        verticalAlign: 'top',
        lineHeight: 'inherit',
        padding: '4px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#ddd'
      },
    },
    props: {
      mt: 3,
      mb: 3,
    }
  },
], opts)
