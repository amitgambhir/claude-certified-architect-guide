# Claude Certified Architect — Exam Prep Guide

All guide sections · Quiz · Traps & Gotchas · Cheat sheet

| Metric | Value |
|---|---|
| Guide sections | 10 topics |
| Top area | Agent SDK (27%) |
| Tools + MCP | 18% combined |
| Core model | Stateless API |

!!! info "Note on structure"
    The official Claude Certified Architect – Foundations exam has **5 domains** (Agentic Architecture & Orchestration, Tool Design & MCP Integration, Claude Code Configuration & Workflows, Prompt Engineering & Structured Output, and Context Management & Reliability). This guide breaks those domains into **10 sections** for easier navigation — for example, Messages API, Stop Reasons, and the Agent SDK each get their own page rather than being grouped into one broad section. The content maps directly to the official 5 domains; it's just more granular.

Focus on **trade-offs** — not just what, but why one approach over another. Click any section to jump to its notes.

| # | Guide Section | Exam Domain | Weight | Key Topics |
|---|---|---|---|---|
| 1 | [Messages API & Stop Reasons](domains/messages-api.md) | Tool Design & MCP Integration | 18% | stop reasons, tool_choice, tool use loop, parallel tools |
| 2 | [Tool Interface Design](domains/tool-design.md) | Tool Design & MCP Integration | 18% | descriptions, nullable fields, tool_use > JSON, two-tool safety |
| 3 | [Error Handling](domains/error-handling.md) | Tool Design & MCP Integration | 18% | transient, permanent, uncertain state, isError flag |
| 4 | [MCP — Model Context Protocol](domains/mcp.md) | Tool Design & MCP Integration | 18% | mcp.json, API connector, descriptions, trust model |
| 5 | [Agent Skills — Claude Code](domains/agent-skills.md) | Claude Code Configuration & Workflows | 20% | CLAUDE.md hierarchy, path-scoped rules, context: fork, plan mode |
| 6 | [Agent SDK](domains/agent-sdk.md) | Agentic Architecture & Orchestration | 27% | 5-step loop, max_turns, max_budget_usd, escalation triggers |
| 7 | [Agentic Patterns & Decomposition](domains/agentic-patterns.md) | Agentic Architecture & Orchestration | 27% | chaining, routing, orchestrator-workers, dynamic |
| 8 | [Workflow Design](domains/workflow-design.md) | Agentic Architecture & Orchestration | 27% | escalation logic, enforcement spectrum, compliance, partial resolution |
| 9 | [Prompt Engineering & System Prompts](domains/prompt-engineering.md) | Prompt Engineering & Structured Output | 20% | principles vs conditionals, dilution, few-shot, versioning |
| 10 | [Context Management & Reliability](domains/context-management.md) | Context Management & Reliability | 15% | recency bias, compaction, provenance, scratchpad |
