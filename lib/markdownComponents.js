const createComponents = require('./createComponents')

const gray = 'rgba(0, 0, 0, .125)'

module.exports = opts => createComponents([
  {
    name: 'Title',
    type: 'h1',
    style: {},
    props: {
      mt: 4,
      mb: 2
    },
    system: []
  },
  {
    name: 'Heading',
    type: 'h2',
    style: {},
    props: {
      mt: 4,
      mb: 2
    },
    system: []
  },
  {
    name: 'Subhead',
    type: 'h3',
    style: {
    },
    props: {
      mt: 4,
      mb: 2
    },
    system: []
  },
  {
    name: 'Pre',
    type: 'pre',
    style: {
      fontFamily: 'Menlo, monospace',
      overflow: 'auto',
    },
    props: {
      fontSize: 14,
      p: 0,
      pl: 3,
      mt: 3,
      mb: 3,
      borderWidth: 4,
      borderLeft: true,
      borderColor: gray
    },
    system: [
      'borderWidth',
      'borderColor'
    ]
  },
  {
    name: 'Code',
    type: 'code',
    style: {
      fontFamily: 'Menlo, monospace',
    },
    props: {
      fontSize: 14,
    }
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
        borderBottomColor: gray
      },
      '& td': {
        verticalAlign: 'top',
        lineHeight: 'inherit',
        padding: '4px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: gray
      },
    },
    props: {
      mt: 3,
      mb: 3,
    },
    system: []
  },
  {
    name: 'Divider',
    type: 'hr',
    style: {
      border: 0
    },
    props: {
      my: 3,
      borderWidth: 1,
      borderBottom: true,
      borderColor: gray
    },
    system: [
      'borderWidth',
      'borderColor'
    ]
  },
  {
    name: 'Blockquote',
    type: 'blockquote',
    style: {
    },
    props: {
      px: 3,
      mx: 0,
      my: 3,
      fontWeight: 'bold',
      borderWidth: 4,
      borderLeft: true,
      borderColor: gray
    },
    system: [
      'fontWeight',
      'borderWidth',
      'borderColor'
    ]
  }
], opts)
