# 5. Agent Skills — Claude Code Configuration

**Domain 3 (20%) — Claude Code Configuration & Workflows**

??? note "CLAUDE.md configuration hierarchy — Three levels — which one takes precedence where"

    ```text
    ~/.claude/CLAUDE.md          ← User-level (personal, NOT version controlled)
    .claude/CLAUDE.md            ← Project-level (shared via git ✅)
      or root CLAUDE.md
    subdirectory/CLAUDE.md       ← Directory-level (applies to that folder only)
    ```

    !!! danger "Critical Rule"
        User-level settings are INVISIBLE to teammates. Always put team config at project level.

    Use `@import` syntax to keep CLAUDE.md modular:

    ```text
    @import ./standards/api-conventions.md
    @import ./standards/testing.md
    ```

??? note ".claude/rules/ — path-scoped rules — Best answer for "apply different conventions to different code areas""

    ```yaml
    ---
    paths:
      - "src/api/**/*"
    ---
    # API conventions apply here
    Always use async/await with structured error handling...
    ```

    - YAML frontmatter with `paths` glob patterns
    - Rules only load when Claude is working on matching files
    - **Best answer for "apply different conventions to different code areas"**

??? note "Commands & Skills — location and scope — Project vs personal, version controlled vs not"

    | Location | Scope | Version Controlled? |
    |---|---|---|
    | `.claude/commands/` | Project (all teammates) | ✅ Yes |
    | `~/.claude/commands/` | Personal only | ❌ No |
    | `.claude/skills/` | Project skills | ✅ Yes |
    | `~/.claude/skills/` | Personal skill variants | ❌ No |

    **SKILL.md key frontmatter options:**

    - `context: fork` — most important for exam. Runs skill in isolated subagent — output doesn't pollute main conversation.
    - `allowed-tools` — restricts what tools the skill can call (least privilege)
    - `argument-hint` — UX hint shown to user

??? note "Plan mode vs direct execution — When to think before acting"

    | Use Plan Mode | Use Direct Execution |
    |---|---|
    | Large-scale changes (45+ files) | Single-file bug fix with clear stack trace |
    | Multiple valid implementation approaches | Well-understood, clear-scope change |
    | Architectural decisions (microservices split) | Adding a simple conditional |
    | Library migrations with unknown deps | Known refactor with clear target |

    !!! info "Pattern"
        Plan mode to explore → Direct execution to implement

??? note "CI/CD integration + iterative techniques — The -p flag and best practices for automation"

    - `-p` / `--print` flag = the ONLY correct way to run Claude Code in CI (non-interactive, prevents hanging)
    - `--output-format json` + `--json-schema` = machine-parseable findings for PR comments
    - **Session isolation:** fresh instance reviews code better than the one that wrote it
    - CLAUDE.md provides project context (testing standards, fixtures) to CI-invoked Claude
    - `/memory` command: shows which memory files are currently loaded — use to diagnose inconsistent behavior across sessions

    **Iterative refinement techniques:**

    - **Concrete examples beat prose:** 2–3 input/output pairs > any description
    - **Test-driven:** Write tests first, share failures to guide fixes
    - **Interview pattern:** Have Claude ask questions BEFORE implementing in unfamiliar domains
    - **Interacting issues:** Fix in one message. **Independent issues:** Fix sequentially.
