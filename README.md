
# gen

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

### Options

- `--out-dir`, `-d`: output directory
- `--dev`, `-D`: run as development server
- `--open`, `-o`: open development server in default browser
- `--port`, `-p`: set port for development server

[Made by Compositor](https://compositor.io/)
|
[MIT License](LICENSE.md)

[lab]: https://compositor.io/lab/
[iso]: https://compositor.io/iso/

<!--
- gen.config.js (get data)
-->
