
# Gen

Compositor JSX static site generator

```sh
npm i @compositor/gen -g
```

- Build static sites with [Lab][lab] components and [Iso][iso] JSX files
- Exports static HTML and inlined CSS
- Handles multiple routes
- Export CSS using styled-components, glamorous, and more
- Use Lab components and themes in markdown
- Pass props data via front-matter

## Usage

Export a static site:

```sh
gen . --out-dir dist
```

Run in development mode:

```sh
gen . --dev
```

### How it works

Given a folder structure like the following:

```
dist/
src/
  about.jsx
  index.jsx
  lab.json
  theme.json
```

Running `gen src --out-dir dist` will create HTML files:

```
dist/
  about/
    index.html
  index.html
```

### Files

Gen will load `theme.json` and `lab.json` files in the target directory and import Lab components.
Any files ending with `.jsx` or `.md` will be used to create pages.
Markdown and JSX files can include [front-matter][front-matter] for setting page-level attributes,
such as title and description, and also be passed to the page component as props.

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

When rendering markdown files, Gen will look for a `layout` property in front-matter. If a JSX file with the same name is found, it will be used as a page layout component, passing the rendered markdown content as children.

**Example markdown file**

```md
---
title: About
layout: default-layout
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

### CLI options

- `--out-dir`, `-d`: output directory
- `--dev`, `-D`: run as development server
- `--open`, `-o`: open development server in default browser
- `--port`, `-p`: set port for development server

---

[Made by Compositor](https://compositor.io/)
|
[MIT License](LICENSE.md)

[lab]: https://compositor.io/lab/
[iso]: https://compositor.io/iso/
[front-matter]: https://jekyllrb.com/docs/frontmatter/
[open-formats]: https://compositor.io/blog/open-formats/

<!--
- gen.config.js (get data)
-->
