# MkDocs Material Migration Design

**Date:** 2026-04-05
**Status:** Approved
**Goal:** Convert the single-file HTML GitHub Pages site to a MkDocs Material documentation site with grouped navigation, preserving all content and interactive features.

---

## Current State

- Single `index.html` (1,224 lines) containing all HTML, CSS, and JS inline
- 16 tab-based sections with sticky pill-button navigation
- Interactive quiz (15 JS-driven questions with scoring and progress tracking)
- Accordion cards, alert boxes, styled tables, code blocks, light/dark mode
- Deployed via GitHub Pages from `main` branch root
- One PDF asset (`anthripic-exam-guide-en.pdf`)

## Target State

- MkDocs Material site with 16 markdown pages
- Grouped sidebar navigation (domains nested under "Exam Domains")
- Interactive quiz preserved via custom JS
- Automatic light/dark mode toggle
- Deployed via GitHub Actions to `gh-pages` branch

---

## File Structure

```
claude-certified-architect-guide/
├── mkdocs.yml
├── requirements.txt
├── .github/workflows/deploy-pages.yml
├── .gitignore                   (add site/)
├── index.html                   (kept as archive, not served)
├── docs/
│   ├── index.md                 (Overview — domain summary table with links)
│   ├── exam-info.md             (Official Exam Details)
│   ├── domains/
│   │   ├── messages-api.md      (1. Messages API & Stop Reasons)
│   │   ├── tool-design.md       (2. Tool Interface Design)
│   │   ├── error-handling.md    (3. Error Handling)
│   │   ├── mcp.md               (4. MCP)
│   │   ├── agent-skills.md      (5. Agent Skills — Claude Code)
│   │   ├── agent-sdk.md         (6. Agent SDK)
│   │   ├── agentic-patterns.md  (7. Agentic Patterns)
│   │   ├── workflow-design.md   (8. Workflow Design)
│   │   ├── prompt-engineering.md (9. Prompt Engineering)
│   │   └── context-management.md (10. Context Management)
│   ├── gotchas.md               (Traps & Gotchas)
│   ├── quiz.md                  (Self-test Quiz — JS-powered)
│   ├── cheat-sheet.md           (Quick-reference)
│   ├── resources.md             (External links)
│   ├── assets/
│   │   └── anthripic-exam-guide-en.pdf
│   ├── javascripts/
│   │   └── quiz.js              (interactive quiz logic)
│   └── stylesheets/
│       └── custom.css
```

## Navigation Structure

```yaml
nav:
  - Overview: index.md
  - Official Exam Info: exam-info.md
  - Exam Domains:
    - 1. Messages API & Stop Reasons: domains/messages-api.md
    - 2. Tool Interface Design: domains/tool-design.md
    - 3. Error Handling: domains/error-handling.md
    - 4. MCP: domains/mcp.md
    - 5. Agent Skills — Claude Code: domains/agent-skills.md
    - 6. Agent SDK: domains/agent-sdk.md
    - 7. Agentic Patterns: domains/agentic-patterns.md
    - 8. Workflow Design: domains/workflow-design.md
    - 9. Prompt Engineering: domains/prompt-engineering.md
    - 10. Context Management: domains/context-management.md
  - Traps & Gotchas: gotchas.md
  - Self-test Quiz: quiz.md
  - Cheat Sheet: cheat-sheet.md
  - Resources: resources.md
```

## Feature Mapping (Zero Content Loss)

### Accordion Cards → Collapsible Admonitions

Current HTML:
```html
<div class="card">
  <div class="ch" onclick="tog(this)"><div><div class="ct">Title</div><div class="cs">Subtitle</div></div><span class="ti">+</span></div>
  <div class="cb">...content...</div>
</div>
```

MkDocs equivalent:
```markdown
??? note "Title — Subtitle"
    ...content...
```

Uses `pymdownx.details` extension. All cards start collapsed (matching current behavior). Use `???+` for any that should default open.

### Alert Boxes → Admonitions

| Current class | MkDocs syntax |
|---|---|
| `.alert.warn` | `!!! warning` |
| `.alert.info` | `!!! info` |
| `.alert.success` | `!!! success` |
| `.alert.danger` | `!!! danger` |

### Tables

All `.kv` and `.gt` tables convert to standard markdown pipe tables. The `tables` extension handles rendering. Column alignment via `:---` syntax where needed.

### Code Blocks

Current inline `<pre>` with `<span class="kw">` etc. converts to fenced code blocks with language tags:

````markdown
```json
{
  "name": "get_customer",
  "description": "..."
}
```
````

Syntax highlighting via `pymdownx.highlight` with `anchor_linenums: true`.

### Interactive Quiz

**quiz.md** contains only:
```markdown
# Self-test Quiz

15 scenario-based questions covering all domains including the new material.

<div id="quiz-container"></div>
```

**docs/javascripts/quiz.js** contains:
- The `quiz[]` array (all 15 questions, unchanged)
- `renderQuiz()`, `answer()`, `nextQ()`, `prevQ()` functions
- Minor adaptations: uses `document.querySelector` instead of assuming specific parent structure
- Initializes on DOMContentLoaded if quiz container exists

**docs/stylesheets/custom.css** contains quiz-specific styles:
- `.quiz-q`, `.quiz-opt`, `.quiz-opt.correct`, `.quiz-opt.wrong`, `.quiz-opt.selected`
- `.qfb`, `.qfb-ok`, `.qfb-bad`
- `.pdots`, `.dot`, `.dot.done`, `.dot.cur`
- `.next-btn`, `.prev-btn`
- Uses MkDocs Material CSS variables for colors where possible

Loaded in mkdocs.yml:
```yaml
extra_javascript:
  - javascripts/quiz.js
extra_css:
  - stylesheets/custom.css
```

### Overview Page (Domain Cards)

The JS-generated domain cards become a markdown table with links:

| # | Domain | Exam Weight | Key Topics |
|---|---|---|---|
| 1 | [Messages API & Stop Reasons](domains/messages-api.md) | 18% | stop reasons, tool_choice, tool use loop, parallel tools |
| ... | ... | ... | ... |

Plus the info admonition about 5 official domains → 10 guide sections.

### Exam Info Page

All accordion content (domain mapping table, 6 scenarios, scoring/access, prep resources, registration CTA) converts to collapsible admonitions and tables. External links preserved as markdown links.

### Cheat Sheet

Grouped sections with headers and markdown tables:

```markdown
## API & Stop Reasons

| Concept | Key Point |
|---|---|
| stop_reason ≠ error | Always part of a successful response. HTTP 4xx/5xx = errors. |
| ... | ... |
```

### Gotchas Table

Direct conversion to a 3-column markdown table with the same headers.

### Resources

Each resource category becomes a collapsible section with a link table. All URLs preserved exactly.

### Footer

MkDocs Material `copyright` field in mkdocs.yml:
```yaml
copyright: Built by <a href="https://github.com/amitgambhir">Amit Gambhir</a> · <a href="https://github.com/amitgambhir/claude-certified-architect-guide/blob/main/LICENSE">MIT License</a>
```

### Light/Dark Mode

Built-in MkDocs Material palette toggle replaces `prefers-color-scheme` media query. Config:
```yaml
palette:
  - scheme: default
    toggle:
      icon: material/brightness-7
      name: Switch to dark mode
  - scheme: slate
    toggle:
      icon: material/brightness-4
      name: Switch to light mode
```

## Custom CSS Scope

`docs/stylesheets/custom.css` handles:

1. **Wider content area** — `.md-grid { max-width: 80%; }`
2. **Quiz styles** — all quiz component CSS (buttons, progress dots, feedback)
3. **Dark mode blending** — header/sidebar background matching
4. **Sidebar section titles** — bold blue for grouped nav sections
5. **Hidden source facts** — `.md-source__facts { display: none; }`

## MkDocs Configuration

Key extensions:
- `toc` with `permalink: true`
- `tables`
- `admonition` + `pymdownx.details` + `pymdownx.superfences` (collapsible cards)
- `pymdownx.highlight` with `anchor_linenums: true` (code blocks)
- `attr_list` + `md_in_html` (inline HTML where needed, e.g., quiz div)

## Deployment

### GitHub Actions Workflow

`.github/workflows/deploy-pages.yml`:
- Triggers on push to `main`
- Installs Python 3.12 + `requirements.txt`
- Runs `mkdocs gh-deploy --force`
- Publishes to `gh-pages` branch

### GitHub Pages Settings Change

After first deploy:
- Settings > Pages > Source: "Deploy from a branch"
- Branch: `gh-pages`, folder: `/ (root)`

### What Happens to index.html

- Kept in repo as archive reference
- No longer served by GitHub Pages (gh-pages branch won't include it)
- Can be removed later at user's discretion

## Content Verification Checklist

After migration, verify each page contains all content from the corresponding HTML section:

- [ ] Overview — 4 metric boxes, info note about 5→10 domains, domain summary table with all 10 entries
- [ ] Exam Info — 4 metrics, domain mapping table, 6 scenarios, format/scoring/access, prep resources, registration links
- [ ] Messages API — stop reasons table (all 7), key API rules, tool use flow diagram, parallel tool rules, tool_choice table
- [ ] Tool Design — descriptions importance, JSON schema anatomy with code block, ambiguous params table, two-tool pattern, structured output via tool_use
- [ ] Error Handling — 3 error categories, structured error response code block, MCP error tiers
- [ ] MCP — core concepts table, .mcp.json code block, API connector code block, descriptions fix
- [ ] Agent Skills — CLAUDE.md hierarchy with code block, .claude/rules/ with code block, commands/skills table, plan mode vs direct execution, CI/CD + iterative techniques
- [ ] Agent SDK — 5-step loop, ClaudeAgentOptions code block, escalation triggers
- [ ] Agentic Patterns — 4 decomposition patterns, sub-agent context transfer, built-in tool reference
- [ ] Workflow Design — escalation logic, frustrated customer sequence, enforcement spectrum
- [ ] Prompt Engineering — principles vs conditionals, dilution problem, system prompt facts
- [ ] Context Management — fundamentals, 4 strategies table, compaction/SDK, information provenance
- [ ] Gotchas — full 17-row trap table
- [ ] Quiz — all 15 questions with options, answers, explanations; scoring; progress dots; navigation
- [ ] Cheat Sheet — all 8 sections (API & Stop Reasons, Tool Design, Error Handling, Context Management, Claude Code, MCP, System Prompts, Agentic Patterns)
- [ ] Resources — all 5 categories with every link preserved
