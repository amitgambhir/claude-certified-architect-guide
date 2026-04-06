# 6. Agent SDK

**Domain 1 (27%) — Agentic Architecture & Orchestration — highest weight!**

??? note "The agent loop — 5 steps — What happens inside every agentic turn"

    ```text
    1. Receive prompt → SDK yields SystemMessage (subtype: "init")
    2. Claude evaluates → SDK yields AssistantMessage (text + tool calls)
    3. Execute tools → SDK yields UserMessage (tool results)
    4. Repeat steps 2–3 (each cycle = one TURN)
    5. Claude produces text-only response
       → SDK yields final AssistantMessage + ResultMessage
    ```

??? note "ClaudeAgentOptions — cost and turn controls — How to cap cost and resuming sessions"

    ```python
    # Cap by turns (tool-use turns only)
    options = ClaudeAgentOptions(max_turns=10)

    # Cap by cost (good for production)
    options = ClaudeAgentOptions(max_budget_usd=0.50)

    # Resume a session
    async for msg in query(
      prompt="continue",
      options=ClaudeAgentOptions(resume="session-name")
    ): ...
    ```

??? note "Escalation triggers — 3 conditions — When to hand off to a human — and common wrong answers"

    1. **Policy gap** — request falls outside defined operating parameters
    2. **Customer requests** — explicit human escalation request
    3. **Inability to progress** — stuck, looping, or missing required information

    **Wrong answer traps on the exam:**

    - ❌ "Use LLM self-reported confidence score" — poorly calibrated, never the correct answer
    - ❌ "Add sentiment detection to reduce escalation" — solves a different problem
    - ✅ Fix: explicit escalation criteria + few-shot examples first
