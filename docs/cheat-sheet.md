# Quick-reference Cheat Sheet

Key facts for last-minute review — all domains combined.

## API & Stop Reasons

| Concept | Key Point |
|---|---|
| `stop_reason` ≠ error | Always part of a successful response. HTTP 4xx/5xx = errors. |
| `tool_use` stop reason | Execute the tool, return result in next user message. |
| `pause_turn` stop reason | Append assistant message and re-call. Server loop hit limit. |
| `model_context_window_exceeded` | Model's context limit (not your max_tokens). Response is valid but capped. |
| `stop_reason` in streaming | `null` in `message_start`. Appears in `message_delta` only. |
| Stateless API | No memory. Your app sends complete history every request. |

## Tool Design

| Concept | Key Point |
|---|---|
| Tool selection signal | Name + description. Make them detailed with negative examples. |
| Structured output | Return JSON with IDs — not natural language strings for chaining. |
| Nullable fields | Use `"type": ["string", "null"]`. Absent info → return `null`, never hallucinate. |
| `tool_use` > JSON mode | Structurally forces schema compliance. Eliminates validation errors. |
| Interdependent params | Split into separate tools. Each enforces its own constraints. |
| Safety-critical ops | Two-tool pattern: preview returns token, execute requires token. |
| Parallel read-only tools | Run concurrently. State-modifying tools run sequentially. |

## Error Handling

| Concept | Key Point |
|---|---|
| Transient errors | Auto-retry with backoff inside the tool. Model never sees it. |
| Permanent errors | Return immediately. `retryable: false`. |
| Uncertain state | Communicate uncertainty. Never mark retryable. "Status unknown." |
| Error format | Return as tool content with `isError` flag. Never throw exceptions. |
| MCP protocol error | Malformed/bad request → JSON-RPC error response. |
| MCP app error | API failure / business rule → tool result with `isError: true`. |

## Context Management

| Concept | Key Point |
|---|---|
| Position in context | Most important info goes LAST (recency bias). |
| Best general strategy | Progressive summarization — preserves history, keeps recent turns verbatim. |
| Precision-dependent recall | Retrieval-based (structured fact DB). Summaries lose numbers. |
| Iterative preferences | Structured state JSON object — don't rely on model to find latest. |
| Conflicting sources | Preserve both with attribution. Add `conflict_detected: true`. |
| SDK auto-compaction | `SystemMessage` with `subtype: "compact_boundary"` before and after. |

## Claude Code (Agent Skills)

| Concept | Key Point |
|---|---|
| CLAUDE.md levels | User (`~/.claude`) → Project (`.claude/`) → Directory (subdir/) |
| Team config location | Project-level CLAUDE.md. User-level is invisible to teammates. |
| Path-scoped rules | `.claude/rules/` with YAML `paths:` frontmatter. Best for per-area conventions. |
| `context: fork` | Most important SKILL.md option. Runs in isolated subagent — no context pollution. |
| CI/CD flag | `-p` / `--print` flag only. Prevents hanging. |
| Plan mode trigger | Large-scale changes, multiple valid approaches, architectural decisions. |
| Direct execution trigger | Single-file bug, clear scope, well-understood change. |

## MCP

| Concept | Key Point |
|---|---|
| Core value | Reusability — one server, many clients. |
| Non-adoption cause | Poor descriptions. Fix descriptions, not routing instructions. |
| Annotations trust | Self-reported. Not a security boundary. Trust the server, not the annotation. |
| Tool availability | All tools from all servers available simultaneously — flat list. |
| Secrets in config | `${VAR_NAME}` env variable expansion keeps keys out of `.mcp.json` |

## System Prompts

| Concept | Key Point |
|---|---|
| Prompt dilution fix | Few-shot examples + XML section tags + periodic reminders. |
| Hard compliance rule | Programmatic enforcement (orchestration-layer hooks) — not prompt instructions. |
| Principles vs conditionals | Principles for judgment calls. Explicit conditionals for deterministic rules. |
| System prompt sent | Every API request, not just the first. |

## Agentic Patterns

| Concept | Key Point |
|---|---|
| Prompt chaining | Fixed steps, same every time, repeating workflow. |
| Routing | Classify first → different input types need different handling. |
| Orchestrator-workers | Steps not known in advance, determined dynamically by input. |
| Dynamic decomposition | Investigative tasks — findings reshape the plan as you go. |
| Escalation triggers | Policy gap, customer requests human, inability to progress. |
