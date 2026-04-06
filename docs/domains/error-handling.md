# 3. Error Handling in Agent Tools

Domain 1 (18%) — Tool Design & MCP Integration

??? note "The three error categories"

    | | |
    |---|---|
    | Transient | Network timeouts, 503s. Handle with **automatic retry + backoff inside the tool**. Model never sees it. |
    | Permanent | Business rule violations. Return immediately with structured detail. `retryable: false`. |
    | Uncertain state | Write-operation timeout — you don't know if it succeeded. **Never mark retryable.** "Status unknown. May have been sent. Do not retry." |

    !!! danger
        Treating all errors identically is the single most common mistake — the model has to guess, producing unpredictable behavior.

??? note "Structured error response + isError flag"

    ```json
    {
      "isError": true,
      "content": [{
        "type": "text",
        "text": "{ \"error_category\": \"NOT_FOUND\", \"retryable\": false, \"message\": \"Customer not found\", \"customer_explanation\": \"We couldn't locate that account.\" }"
      }]
    }
    ```

    - `isError: true` signals structured failure — Claude receives this as a tool result and adapts
    - Include `error_category` + `retryable` flag for Claude to decide next action
    - Different from returning bad data with `isError: false` — always use the flag!

    !!! danger
        When a tool throws an exception, the framework presents a generic error to the model, stripping all detail. Always return errors as tool content.

??? note "MCP error tiers"

    | | |
    |---|---|
    | Protocol-level errors | Malformed requests, missing required params, invalid JSON-RPC. → JSON-RPC error response. The request itself was invalid. |
    | Application-level errors | API 404, service unavailable, business rule violation. → Tool result with `isError: true`. Tool was invoked correctly but operation failed. |
