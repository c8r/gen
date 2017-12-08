module.exports = [
  {
    name: 'Box',
    type: 'div',
    props: {},
    style: {
      outline: '1px solid cyan'
    },
    system: []
  },
  {
    name: 'Flex',
    type: 'Box',
    props: {},
    style: {
      display: 'flex'
    },
    system: [
      'alignItems',
      'justifyContent',
      'flexWrap',
      'flexDirection'
    ]
  },
  {
    name: 'Grid',
    type: 'div',
    props: {},
    style: props => ({
      display: 'flex',
      flexWrap: 'wrap',
      // disable defaults from dxs
      width: '100% !important',
      margin: '0 !important',
      padding: '0 !important',
      color: 'inherit !important',
      backgroundColor: 'transparent !important',
      '& > *': Object.assign({},
        space(props),
        width(props),
      )
    }),
    system: [
      'alignItems',
      'justifyContent',
      'flexDirection'
    ]
  },
  {
    name: 'Text',
    type: 'div',
    props: {},
    style: {},
    system: [
      'textAlign',
      'fontWeight'
    ]
  },
  {
    name: 'Heading',
    type: 'h2',
    props: {
      m: 0
    },
    style: {
      lineHeight: 1.25
    },
    system: [
      'textAlign',
      'fontWeight'
    ]
  },
  {
    name: 'Link',
    type: 'a',
    props: {},
    style: {},
    system: []
  },
  {
    name: 'Image',
    type: 'img',
    props: {},
    style: {
      maxWidth: '100%',
      height: 'auto'
    },
    system: []
  },
]
