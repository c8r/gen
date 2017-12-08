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
  /*
  { name: 'Text', },
  { name: 'Link', },
  { name: 'Pre', },
  { name: 'Code', },
  { name: 'Table', },
  */
], opts)
