# 8. Agentic Workflow Design

**Domain 3 (27%) — Agentic Architecture & Orchestration**

??? note "Escalation: when and how — Decision logic and handoff content"

    **Escalate when:**

    - Customer explicitly asks for a human
    - Issue requires authority the agent doesn't have (policy exceptions, amounts above limits)
    - Agent can't make meaningful progress

    !!! warning
        Don't use mechanical rules like "escalate after 3 failed tool calls" or "escalate when sentiment score exceeds threshold."

    **Handoff content:** structured summary (customer ID, root cause, transaction IDs, amounts, recommended action). Not a raw transcript. Not just the original complaint.

??? note "Handling frustrated customers — correct sequence — Order matters"

    1. **Acknowledge the frustration first.** Don't silently investigate their account.
    2. Ask one targeted question to understand the issue.
    3. Then decide: escalate or resolve directly.

    If the issue can be resolved and the customer still wants a human: **offer the choice.** Don't force either path. Don't process the return unilaterally.

??? note "Enforcement spectrum — From unreliable to deterministic"

    | Method | Reliability |
    |---|---|
    | Prompt instructions | Lowest reliability. Non-zero failure rate. Soft guidance only. |
    | Few-shot examples | Better than written rules. Demonstrations stick longer. |
    | Tool-level validation | Schema constraints, parameter checks. Reliable for structure. |
    | Orchestration-layer hooks | Highest reliability. For hard compliance rules: intercept tool calls, check conditions, block execution. Model is taken out of the decision entirely. |
