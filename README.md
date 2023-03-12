# tree-sitter-markdoc

[![test](https://github.com/markdoc-extra/tree-sitter-markdoc/actions/workflows/ci.yml/badge.svg)](https://github.com/markdoc-extra/tree-sitter-markdoc/actions/workflows/ci.yml)

Markdoc grammar for [tree-sitter][].

[tree-sitter]: https://github.com/tree-sitter/tree-sitter

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
