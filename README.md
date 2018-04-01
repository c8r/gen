
# Gen

Compositor JSX static site generator

```sh
npm install --save-dev @compositor/gen
```

- Build static sites with JSX and [MDX][mdx] files
- Exports static HTML and inlined CSS
- Handles multiple routes
- Export CSS using styled-components, glamorous, and more
- Use Lab components and themes in markdown
- Pass props data via front-matter

[mdx]: https://github.com/mdx-js/mdx

## Usage

Export a static site:

```sh
gen . --out-dir dist
```

Run in development mode:

```sh
gen .
```

### How it works

Given a folder structure like the following:

```
dist/
src/
  about.jsx
  index.jsx
  hello.mdx
```

Running `gen src --out-dir dist` will create HTML files:

```
dist/
  about/
    index.html
  hello/
    index.html
  index.html
```

### JSX

**Example JSX file**

```jsx
---
title: Hello World
description: This is a demo page
---
<Box px={3} py={4}>
  <Heading>{props.title}</Heading>
</Box>
<CustomLabComponent
  description={props.description}
/>
```

### Front Matter Options

All front matter is passed to the JSX file as a `props` object.
Additionally, page-level metadata can be set using the following properties:

- `title` page title
- `description` page description
- `og` object of open graph data
- `twitter` object of Twitter card data
- `stylesheets` array of stylesheet URLs to add as links in the head
- `scripts` array of JavaScript strings to include before the closing body tag

### Layouts

Gen will look for a `layout` prop in front-matter. If a JSX file with the same name is found, it will be used as a page layout component, passing the rendered content as children.

**Example mdx file**

```md
---
title: About
layout: layout
---

# About
```

**Example JSX layout file**

```jsx
---
---
<SiteHeader />
<Box px={3} py={4}>
  {props.children}
</Box>
<SiteFooter />
```

### Configuration

Use the `--config` flag to pass a config file to the renderer.
A config file can specify a `components` object to add components to scope and a `theme` object to be passed to styled-components [ThemeProvider][theme-provider]

[theme-provider]: https://www.styled-components.com/docs/advanced#theming

**Example config.js file**

```js
import { Box, Flex, Heading } from 'rebass'

export default {
  components: {
    Box,
    Flex,
    Heading
  },
  theme: {
    colors: {
      blue: '#0af'
    }
  }
}
```

### CLI options

- `--out-dir`, `-d`: output directory
- `--open`, `-o`: open development server in default browser
- `--port`, `-p`: set port for development server

---

[Made by Compositor](https://compositor.io/)
|
[MIT License](LICENSE.md)

[iso]: https://compositor.io/iso/
[front-matter]: https://jekyllrb.com/docs/frontmatter/

