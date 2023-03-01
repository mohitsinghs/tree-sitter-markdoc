; highlights.scm

[(tag_open) (tag_close)] (identifier) @tag
[(tag_close) (tag_self_closing)] "/" @tag.delimiter
[(tag_start) (tag_end)] @tag.delimiter
(attribute [(identifier) "="] @tag.attribute)

(string) @string
(number) @number
(boolean) @boolean
(null) @keyword

(function (identifier) @function)

(variable (identifier) @variable)
(variable_sigil) @variable

