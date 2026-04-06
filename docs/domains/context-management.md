# 10. Context Management

**Domain 5 (15%) — Context Management & Reliability**

??? note "Context window fundamentals — What fills context and how to think about it"

    - Context = system prompt + all messages (user + assistant) + tool results
    - **Position matters: most important info goes last** (recency bias)
    - Verbose tool output fills context fast → always **trim and extract structured facts**

    !!! warning
        Don't confuse context *capacity* with context *attention*. Even well under capacity, the model may not reliably track preferences scattered across many turns.

??? note "Four context management strategies — Know which to use when, and what each trades off"

    | Strategy | Description |
    |---|---|
    | Sliding window | Keep only the most recent N turns. Simple. Works for short conversations. Weakness: older context is completely gone. |
    | Progressive summarization | Summarize older turns, keep last 5–8 verbatim. **Best general-purpose approach.** Loses numerical precision. |
    | Structured state objects | Maintain a JSON object capturing current state. More reliable for iteratively-refined preferences. |
    | Retrieval-based (RAG) | Store extracted facts in a DB, retrieve on demand. For precision-dependent recall — exact numbers, stats. Summaries lose this. |

??? note "Compaction (Agent SDK) — What happens when context nears its limit"

    - When context nears limit, SDK runs automatic compaction
    - Yields a `SystemMessage` with `subtype: "compact_boundary"` before and after
    - Manual strategy: use scratchpad files for long sessions; subagent delegation offloads context

    | Pattern | When to use |
    |---|---|
    | Extract structured facts | Always — never pass raw verbose tool output |
    | Scratchpad files | Long multi-step sessions to preserve intermediate state |
    | Subagent delegation (Task tool) | Offload context-heavy subtasks to isolated agents |
    | Explore subagent | Verbose discovery (file listing, grep) — returns summary only |
    | `/compact` command | Claude Code: manually compact a long session |

??? note "Information provenance (multi-agent) — Handling conflicting sources"

    - Always maintain **claim → source** mappings
    - Conflicting sources: **preserve both values with attribution** (never pick one arbitrarily)
    - Add `conflict_detected: true` boolean to structured output when sources disagree
    - Coverage gaps: annotate final output with what couldn't be verified
