# 1. Messages API & Stop Reasons

**Domain 1 & 5 (18%) — foundational for everything**

??? note "Stop reasons — memorize all 7"

    !!! info
        `stop_reason` ≠ error. It is always part of a **successful** HTTP response. Errors = HTTP 4xx/5xx.

    | stop_reason | Meaning | What to do |
    |---|---|---|
    | `end_turn` | Natural completion | Process response normally |
    | `max_tokens` | Hit your token limit | Continuation prompt or increase limit |
    | `stop_sequence` | Hit a custom stop string | Check `response.stop_sequence` |
    | `tool_use` | Claude wants to call a tool | Execute tool, return result |
    | `pause_turn` | Server tool loop hit iteration limit (default 10) | Resend full messages as-is to continue |
    | `refusal` | Safety refusal | Rephrase or modify request |
    | `model_context_window_exceeded` | Hit model's context window (not your max_tokens) | Response is valid but was capped |

??? note "Key API rules"

    - **Empty `end_turn` response fix:** Never add text after `tool_result`. Add a new user message with "Please continue" instead.
    - **Streaming:** `stop_reason` is `null` in `message_start` event; appears in `message_delta` event only.
    - **`pause_turn` pattern:** append `{role: "assistant", content: response.content}` to messages and re-call the API.
    - **Stateless:** The API has no memory. Your app sends complete history every request. "Model forgot X" = application bug, not a model failure.
    - Costs and latency grow linearly with conversation length (input tokens each turn).

??? note "Tool use flow (the loop)"

    ```text
    User message
      → Claude responds with stop_reason: "tool_use"
      → You execute the tool
      → You return tool_result in next user message
      → Claude responds (end_turn or another tool_use)
      → Repeat until end_turn
    ```

    The `tool_choice` parameter controls Claude's tool-calling behaviour:

    | Value | Behaviour |
    |---|---|
    | `{"type": "auto"}` | Claude decides whether to use tools (default) |
    | `{"type": "any"}` | Claude MUST use at least one tool |
    | `{"type": "tool", "name": "X"}` | Claude MUST use tool X specifically (forced) |

??? note "Parallel tool use"

    - **Read-only tools** (`Read`, `Glob`, `Grep`, MCP read-only) → run **concurrently**
    - **State-modifying tools** (`Edit`, `Write`, `Bash`) → run **sequentially**
    - Claude can request multiple tools in one turn; the SDK / your code handles parallelism.
