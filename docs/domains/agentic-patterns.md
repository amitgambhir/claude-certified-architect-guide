# 7. Agentic Patterns & Task Decomposition

**Domain 3 (27%) — Agentic Architecture & Orchestration**

??? note "The four decomposition patterns — Match the pattern to the task type — this is what the exam tests"

    | Pattern | When to use |
    |---|---|
    | Prompt chaining | Fixed, repeating workflows with steps known in advance. Code reviews that always check style → security → docs. |
    | Routing | Classify input first, then dispatch. Different input types need completely different handling. |
    | Orchestrator-workers | Central LLM determines subtasks dynamically. When required steps aren't known in advance. |
    | Dynamic decomposition | Agent generates subtasks incrementally based on findings. Best for investigative tasks where each finding reshapes the plan. |

    !!! warning
        Applying orchestrator-workers to predictable workflows adds unnecessary overhead. If steps are the same every time, prompt chaining is simpler and cheaper.

??? note "Sub-agent context transfer — Summary-and-spawn vs. resume"

    | Approach | Notes |
    |---|---|
    | Summary-and-spawn | Summarize key findings → new sub-agent with that summary. Best efficiency. Some information loss but avoids overloading with full history. |
    | Resume session | Risk: if codebase changed since last session, transcript may reference renamed functions or moved files. |
    | Parallel agents | Export findings to a file → create two sessions referencing it. Avoids re-reading the same files in each parallel agent. |

??? note "Built-in tool selection reference — Claude Code / Agent SDK — which tool for which task"

    | Tool | Use |
    |---|---|
    | Grep | Search file *contents* by pattern |
    | Glob | Find files by *name/path* pattern |
    | Read | Read a specific file |
    | Edit | Targeted edit via unique string match |
    | Read → Write | Full file replacement (when Edit fails on repetitive content) |
    | Bash | Shell commands, system operations |
