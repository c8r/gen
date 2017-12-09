
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

### CLI options

- `--out-dir`, `-d`: output directory
- `--dev`, `-D`: run as development server
- `--open`, `-o`: open development server in default browser
- `--port`, `-p`: set port for development server

### Files

Gen will load `theme.json` and `lab.json` files in the target directory and import Lab components.
Any files ending with `.jsx` or `.md` will be used to create pages.
Markdown and JSX files can include [front-matter][front-matter] for setting page-level attributes, such as title and description, and also be passed to the page component as props.

### Front Matter Options

- `title` page title
- `description` page description


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
