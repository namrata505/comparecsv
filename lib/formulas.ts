export const formulas = [
  {
    slug: "vlookup",
    title: "Excel VLOOKUP Formula",
    category: "Lookup & Reference",

    description:
      "Learn how to use VLOOKUP in Excel with syntax, examples, and explanations.",

    syntax:
      "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",

    example:
      "=VLOOKUP(A2, D2:F20, 2, FALSE)",

    content:
      "VLOOKUP searches for a value in the first column of a table and returns matching data from another column.",

    examples: [
      {
        input: "Apple",
        formula: "=VLOOKUP(A2,D2:F20,2,FALSE)",
        output: "$120",
      },
    ],

    related: ["xlookup", "if"],
  },

  {
    slug: "xlookup",
    title: "Excel XLOOKUP Formula",
    category: "Lookup & Reference",

    description:
      "Learn how to use XLOOKUP formula in Excel.",

    syntax:
      "=XLOOKUP(lookup_value, lookup_array, return_array)",

    example:
      "=XLOOKUP(A2,D2:D20,E2:E20)",

    content:
      "XLOOKUP is the modern replacement for VLOOKUP.",

    examples: [
      {
        input: "101",
        formula: "=XLOOKUP(A2,D:D,E:E)",
        output: "John",
      },
    ],

    related: ["vlookup"],
  },
];