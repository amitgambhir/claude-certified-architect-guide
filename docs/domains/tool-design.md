# 2. Tool Interface Design

**Domain 2 (18%) — Tool Design & MCP Integration**

??? note "Descriptions drive tool selection — KEY EXAM TOPIC"

    - Claude selects tools by description, not just name.
    - Disambiguate similar tools explicitly: *"Use this for X. Do NOT use for Y."*
    - Add negative examples: *"Call `lookup_order` for order status, NOT `get_customer`"*
    - Include preconditions: *"Only call after `get_customer` returns a valid record"*

    !!! info
        Mental test: if a human developer couldn't figure out when to call this tool from the description alone, the model won't either.

    | Quality | Example |
    |---|---|
    | ❌ Losing | "Checks code quality" |
    | ✅ Winning | "Runs static analysis across all source files, checking for unused variables, unreachable code, and style violations. Returns severity-ranked list with file paths, line numbers, and suggested fixes. Do NOT use for runtime errors — use `run_tests` instead." |

??? note "Defining a tool — JSON Schema anatomy"

    ```json
    {
      "name": "get_customer",
      "description": "Retrieve customer record by ID. Use this for account lookups, NOT for order history — use lookup_order instead.",
      "input_schema": {
        "type": "object",
        "properties": {
          "customer_id": { "type": "string", "description": "Customer UUID" },
          "status": {
            "type": ["string", "null"],
            "enum": ["active", "inactive", "other", null]
          }
        },
        "required": ["customer_id"]
      }
    }
    ```

    !!! warning
        Use `"type": ["string", "null"]` for fields that may be absent. This prevents Claude from fabricating values. Rule: absent info → return `null`, never hallucinate.

??? note "Fixing ambiguous parameters"

    | | |
    |---|---|
    | Interdependent constraints | Split into separate tools. Each enforces its own constraints structurally. `create_bank_transfer(iban, bic)` makes it impossible to pass a credit card number. |
    | Entity resolution | Lookup-then-act: one tool searches and returns IDs, a second acts on a specific ID. |
    | Known valid values | Use `enum` constraints — but enums alone don't capture relationships between parameters. |

??? note "Safety-critical ops: two-tool pattern"

    A single tool with a `preview: boolean` flag lets the agent skip the preview. Two separate tools close that path:

    1. Preview tool generates a plan and returns a **one-time approval token**
    2. Execute tool requires that token to run

    !!! danger
        Prompt-based instructions ("always preview before executing") are unreliable — the model skips them some percentage of the time.

??? note "Structured output via tool_use (not JSON mode)"

    **Why `tool_use` > JSON mode:** Schema validation errors are eliminated. Claude is structurally forced into schema compliance — not just asked to produce valid JSON.

    - Use `"type": ["string", "null"]` for potentially absent fields
    - Prevents Claude from fabricating values when info isn't in the source document
    - Only mark fields as `required` if they are truly always present

    **Validation-retry loop:** If the structured output fails validation, return the validation error as a tool result so Claude can correct the specific field rather than regenerating everything.
