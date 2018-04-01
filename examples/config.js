import styled from 'styled-components'
import {
  space,
  color
} from 'styled-system'

const Heading = styled.h1`
  font-size: 64px;
  ${space}
  ${color}
`
Heading.defaultProps = {
  m: 0,
  color: 'blue'
}

export default {
  components: {
    Heading
  },
  theme: {
    fonts: {
      sans: 'system-ui, sans-serif',
      mono: 'Menlo, monospace'
    },
    colors: {
      blue: '#0af',
    }
  }
}
