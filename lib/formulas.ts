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


  {
  slug: "sumifs",
  title: "Excel SUMIFS Formula",
  category: "Math & Statistics",
  description:
    "Learn how to use the SUMIFS formula in Excel to sum values based on one or more conditions.",
  syntax:
    "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2], [criteria2])",
  example:
    '=SUMIFS(C:C, A:A, "Finance")',
  content:
    "SUMIFS adds numbers from a selected range when one or more conditions are met. It is commonly used for sales analysis, department-wise totals, finance reports, inventory summaries, and business dashboards.",
  examples: [
    {
      input: "Department = Finance",
      formula: '=SUMIFS(C:C, A:A, "Finance")',
      output: "Total salary or value for Finance rows",
    },
    {
      input: "Region = North and Product = Laptop",
      formula: '=SUMIFS(D:D, A:A, "North", B:B, "Laptop")',
      output: "Total sales for laptops in North region",
    },
  ],
  related: ["countifs", "vlookup", "xlookup"],
},
{
  slug: "countifs",
  title: "Excel COUNTIFS Formula",
  category: "Math & Statistics",
  description:
    "Learn how to use the COUNTIFS formula in Excel to count rows that match one or more conditions.",
  syntax:
    '=COUNTIFS(criteria_range1, criteria1, [criteria_range2], [criteria2])',
  example:
    '=COUNTIFS(A:A, "Finance")',
  content:
    "COUNTIFS counts cells or rows that meet one or more conditions. It is useful for counting matching records in HR data, finance sheets, sales reports, survey results, inventory files, and business datasets.",
  examples: [
    {
      input: "Department = Finance",
      formula: '=COUNTIFS(A:A, "Finance")',
      output: "Number of Finance rows",
    },
    {
      input: "Region = North and Status = Active",
      formula: '=COUNTIFS(A:A, "North", B:B, "Active")',
      output: "Number of active rows in North region",
    },
  ],
  related: ["sumifs", "vlookup", "xlookup"],
},

];