<h1 align='center'>tree-sitter-markdoc</h1>
<p align='center'>
  <a href="https://github.com/markdoc-extra/tree-sitter-markdoc/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/markdoc-extra/tree-sitter-markdoc/ci.yml?style=flat-square" />
  </a>
  <a href="https://github.com/markdoc-extra/tree-sitter-markdoc/blob/main/LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/github/license/markdoc-extra/tree-sitter-markdoc?style=flat-square" />
  </a>
</p>
<p align="center">
  <b>Markdoc grammar for <a href="https://github.com/tree-sitter/tree-sitter">tree-sitter</a></b><br/>
</p>

<br />

## Using with Neovim

1. Define a new filetype for markdoc.

```lua
vim.filetype.add({
  extension = {
    mdoc = "markdoc",
  },
})
```

2. Add markdoc parser config in nvim-treesitter.

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.markdoc = {
  install_info = {
    url = "https://github.com/markdoc-extra/tree-sitter-markdoc",
    files = { "src/parser.c" }
   },
  filetype = "markdoc",
}
```

3. Copy queries to `~/.config/nvim/queries/markdoc`.

4. Run `:TSInstall markdoc`

#### References

- [Markdoc](https://github.com/markdoc/markdoc)
- [Markdoc Spec](https://markdoc.dev/spec)
