# 9. Prompt Engineering & System Prompts

**Domain 4 (20%) — Prompt Engineering & Structured Output**

??? note "Principles vs. conditionals — The core design decision for every instruction"

    | Approach | When to use |
    |---|---|
    | Use principles when | The rule requires judgment. "Match financial detail to the user's demonstrated knowledge level" handles implicit cues you haven't enumerated. |
    | Use explicit conditionals when | The rule must fire deterministically. "If the user describes a medical emergency, always direct them to call emergency services." |
    | Use programmatic enforcement when | The rule must hold 100% of the time with legal/financial consequences. Prompt instructions have a non-zero failure rate regardless of how emphatic. |

??? note "The dilution problem — Why prompt influence fades — and how to fight it"

    System prompt influence gets diluted as conversations grow — **even in short conversations of just a few thousand tokens.** It's not a token-limit issue.

    Mitigation strategies:

    1. **Few-shot examples** — concrete demonstrations persist better than abstract rules
    2. **XML-style section tags** — `<escalation_policy>`, `<guardrails>` — increase salience
    3. Inject periodic reminders as system messages in long conversations
    4. Place critical instructions in high-attention positions

    !!! warning
        Using "CRITICAL", "NEVER", "ALWAYS" may slightly increase compliance but does not guarantee it. For 100% reliability, enforce programmatically.

??? note "Key facts about system prompts — Things the exam will test"

    - The system prompt is included in **every API request** — not just the first. If your app only sends it with the first request, that's a bug.
    - Adding more conditionals to cover edge cases dilutes attention to every other instruction.
    - Updating a system prompt for ongoing multi-session conversations can cause the model to contradict its prior statements — prompt versioning matters.
    - Few-shot examples within sections hold up better than verbose written rules over extended conversations.
