import path from 'path'
import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './App'

const div = window.root || document.body
const mount = window.app ? hydrate : render

window.app = mount(
  React.createElement(App),
  div
)
