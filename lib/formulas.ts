export const formulas = [
  {
    slug: "vlookup",
    title: "Excel VLOOKUP Formula",
    description:
      "Learn how to use VLOOKUP in Excel with syntax, examples, and explanations.",
    syntax:
      "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    example:
      '=VLOOKUP(A2, D2:F20, 2, FALSE)',
    content:
      "VLOOKUP searches for a value in the first column of a table and returns matching data from another column.",
  },

  {
    slug: "xlookup",
    title: "Excel XLOOKUP Formula",
    description:
      "Learn how to use XLOOKUP formula in Excel.",
    syntax:
      "=XLOOKUP(lookup_value, lookup_array, return_array)",
    example:
      '=XLOOKUP(A2, D2:D20, E2:E20)',
    content:
      "XLOOKUP is the modern replacement for VLOOKUP and HLOOKUP.",
  },

  {
    slug: "if",
    title: "Excel IF Formula",
    description:
      "Learn IF formula in Excel with examples.",
    syntax:
      '=IF(logical_test, value_if_true, value_if_false)',
    example:
      '=IF(A2>50000,"Bonus","No Bonus")',
    content:
      "IF formula performs logical comparisons in Excel.",
  },

  {
    slug: "sumifs",
    title: "Excel SUMIFS Formula",
    description:
      "Learn SUMIFS formula in Excel.",
    syntax:
      '=SUMIFS(sum_range, criteria_range1, criteria1)',
    example:
      '=SUMIFS(C:C,A:A,"HR")',
    content:
      "SUMIFS adds values that match multiple conditions.",
  },

  {
    slug: "countifs",
    title: "Excel COUNTIFS Formula",
    description:
      "Learn COUNTIFS formula in Excel.",
    syntax:
      '=COUNTIFS(A:A,"HR",B:B,"Active")',
    example:
      '=COUNTIFS(A:A,"HR")',
    content:
      "COUNTIFS counts cells matching multiple conditions.",
  },
];