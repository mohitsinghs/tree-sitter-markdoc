/* eslint-disable no-undef */
module.exports = grammar({
  name: 'markdoc',
  word: ($) => $.identifier,
  conflicts: ($) => [[$.tag_start, $.interpolation, $.annotation]],
  rules: {
    content: ($) =>
      repeat(choice($.tag, $.interpolation, $.annotation, $.markdown)),
    markdown: ($) => prec.right(token(repeat1(/[^\s{][^{]*/))),

    // tags
    tag: ($) => seq($.tag_start, optional($._space), $.tag_interior, $.tag_end),
    tag_start: ($) => '{%',
    tag_end: ($) => '%}',
    tag_interior: ($) => choice($.tag_open, $.tag_self_closing, $.tag_close),
    tag_open: ($) =>
      seq(
        field('tag_name', $.identifier),
        optional(seq($._space, $.value)),
        repeat(seq($._space, $.attribute)),
        optional($._space)
      ),
    tag_self_closing: ($) => seq($.tag_open, '/'),
    tag_close: ($) => seq('/', field('tag_name', $.identifier)),

    // attributes
    attribute: ($) => choice($._attribute_full, $._attribute_shorthand),
    _attribute_full: ($) => seq(field('key', $.identifier), '=', $.value),
    _attribute_shorthand: ($) =>
      field('shorthand', seq($._shorthand_sigil, $.identifier)),
    _shorthand_sigil: ($) => choice('.', '#'),

    // annotations
    annotation: ($) =>
      seq(
        $.tag_start,
        repeat1(seq(optional($._space), $.attribute)),
        optional($._space),
        $.tag_end
      ),

    // interpolation
    interpolation: ($) =>
      seq(
        $.tag_start,
        repeat1(seq($._space, choice($.function, $.variable))),
        optional($._space),
        $.tag_end
      ),
    interpolation_value: ($) => choice($.function, $.variable),

    // values
    value: ($) => choice($.primitive, $.compound, $.variable, $.function),

    // primitives
    primitive: ($) => choice($.null, $.boolean, $.number, $.string),
    null: ($) => 'null',
    boolean: ($) => choice('true', 'false'),
    number: ($) => {
      const digit = /\d+/
      return token(seq(optional('-'), digit, optional(seq('.', digit))))
    },

    // string
    string: ($) => seq('"', repeat($._string_element), '"'),
    _string_element: ($) =>
      choice($._string_character, $._string_escape_sequence),
    _string_character: ($) => token.immediate(prec(1, /[^"\\]/)),
    _string_escape_sequence: ($) =>
      token.immediate(seq('\\', choice('n', 'r', 't', '\\', '"'))),

    // compound
    compound: ($) => choice($.array, $.hash),

    // array
    array: ($) =>
      seq(
        '[',
        repeat($._array_item),
        optional($._array_item_with_optional_comma),
        ']'
      ),
    _array_item: ($) => prec(1, seq($.value, ',')),
    _array_item_with_optional_comma: ($) => seq($.value, optional(',')),

    // hash
    hash: ($) =>
      seq(
        '{',
        repeat($._hash_item),
        optional($._hash_item_with_optional_comma),
        '}'
      ),
    _hash_item: ($) => prec(1, seq($._hash_key_value, ',')),
    _hash_key_value: ($) => seq($.hash_key, ':', $.value),
    _hash_item_with_optional_comma: ($) =>
      seq($._hash_key_value, optional(',')),
    hash_key: ($) => choice(field('key', $.identifier), $.string),

    // variable
    variable: ($) =>
      prec.right(
        seq(
          $.variable_sigil,
          field('variable', $.identifier),
          repeat($.variable_tail)
        )
      ),
    variable_tail: ($) =>
      choice(
        seq('.', field('property', $.identifier)),
        seq('[', $.variable_segment_value, ']')
      ),
    variable_segment_value: ($) => choice($.number, $.string, $.variable),
    variable_sigil: ($) => choice('$', '@'),

    // function
    function: ($) =>
      prec.right(
        1,
        seq(
          field('function_name', $.identifier),
          '(',
          repeat($.function_parameters),
          ')'
        )
      ),
    function_parameters: ($) => seq($.value, repeat($.function_parameter_tail)),
    function_parameter_tail: ($) => seq(',', $.function_parameter),
    function_parameter: ($) => choice($.function_parameter_named, $.value),
    function_parameter_named: ($) =>
      seq(field('parameter', $.identifier), '=', $.value),

    // identifier
    identifier: ($) => {
      const identifierTail = /[-_a-zA-Z0-9]/
      return token(seq(/[a-zA-Z]/, repeat(identifierTail)))
    },
    _space: ($) => repeat1(choice('\t', ' ', '\n')),
  },
})
