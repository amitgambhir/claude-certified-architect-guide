# Exam Traps & Gotchas

From the official cheat sheet — if you see these in a question, you know the right answer.

| If the question says... | Right answer | Not... |
|---|---|---|
| "Agent escalating too often, unclear boundaries" | Explicit criteria + few-shot examples | Confidence score routing |
| "CI job hangs waiting for input" | `-p` flag | `--batch`, `CLAUDE_HEADLESS` |
| "Apply different rules to different code areas" | `.claude/rules/` with glob patterns | Subdirectory CLAUDE.md |
| "Team member not getting config" | Move to project-level CLAUDE.md | Add to root CLAUDE.md only |
| "Skill output polluting main conversation" | `context: fork` frontmatter | New session |
| "Overnight bulk analysis, cost-sensitive" | Message Batches API | Real-time API |
| "Synthesis agent over-provisioned with tools" | `allowedTools` least privilege | Give all tools "just in case" |
| "Retry failing even after multiple attempts" | Info absent from source doc | Retry with better prompt |
| "Large-scale architectural refactor" | Plan mode first | Direct execution |
| "Single-file bug with clear stack trace" | Direct execution | Plan mode |
| "Verbose exploration polluting context" | Explore subagent | Regular tool call |
| "New project: Claude asking questions first" | Interview pattern | Prose spec document |
| "Conflicting sources in research" | Preserve both + attribution | Pick the authoritative one |
| "Tool returned wrong data vs isError flag" | `isError: true` for failures | Return bad data silently |
| "Stop reason on message_start event" | `null` — only appears in `message_delta` | The actual stop reason value |
| "Empty end_turn after tool_result" | New user message "Please continue" | Add text after tool_result |
| "Message Batches API use case" | Overnight bulk analysis, cost-sensitive | Real-time interactive API |
