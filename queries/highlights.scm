; highlights.scm

tag_name: (identifier) @tag
(tag_self_closing "/" @tag.delimiter)
(tag_close "/" @tag.delimiter)
([(tag_start) (tag_end) "="] @tag.delimiter)
(attribute [key : (identifier)] @tag.attribute)
(attribute [shorthand : (identifier)]  @property)
(variable [variable : (identifier) (variable_sigil)] @variable)
(variable_tail property : (identifier) @property)
(function function_name : (identifier) @function)
(function_parameter_named parameter : (identifier) @parameter)

(hash_key key: (identifier) @field)
(string) @string
(number) @number
(boolean) @boolean
(null) @keyword
