# MkDocs Material Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-file HTML GitHub Pages site to a MkDocs Material documentation site with grouped navigation, preserving all content and interactive features.

**Architecture:** 16 markdown pages under `docs/`, MkDocs Material theme with grouped sidebar navigation, interactive quiz via custom JS, deployed via GitHub Actions to `gh-pages` branch.

**Tech Stack:** MkDocs Material 9.6+, Python 3.12, GitHub Actions, pymdownx extensions

**Source of truth:** All content comes from `index.html` in the repo root. Every section, table, code block, alert, and link must be ported verbatim. The spec at `docs/superpowers/specs/2026-04-05-mkdocs-migration-design.md` has the full feature mapping.

---

## Task 1: MkDocs scaffolding and configuration

**Files:**
- Create: `requirements.txt`
- Create: `mkdocs.yml`
- Create: `docs/stylesheets/custom.css`
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `.gitignore`

- [ ] **Step 1: Create `requirements.txt`**

```
mkdocs-material>=9.6
```

- [ ] **Step 2: Create `mkdocs.yml`**

```yaml
site_name: Claude Certified Architect — Exam Prep Guide
site_description: Study guide for the Claude Certified Architect exam covering all 10 domains, quiz, traps & gotchas, and cheat sheet.
site_url: https://amitgambhir.github.io/claude-certified-architect-guide/
repo_url: https://github.com/amitgambhir/claude-certified-architect-guide
repo_name: amitgambhir/claude-certified-architect-guide

theme:
  name: material
  font:
    text: Roboto
    code: Roboto Mono
  palette:
    - scheme: default
      primary: white
      accent: white
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: grey
      accent: grey
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  features:
    - navigation.instant
    - navigation.tabs
    - navigation.sections
    - navigation.top
    - navigation.footer
    - navigation.path
    - navigation.tracking
    - content.code.copy
    - content.tooltips
    - search.highlight
    - search.suggest
    - toc.follow
  icon:
    repo: fontawesome/brands/github

extra_css:
  - stylesheets/custom.css

extra_javascript:
  - javascripts/quiz.js

plugins:
  - search

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

markdown_extensions:
  - toc:
      permalink: true
  - tables
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.highlight:
      anchor_linenums: true
  - attr_list
  - md_in_html

copyright: Built by <a href="https://github.com/amitgambhir">Amit Gambhir</a> · <a href="https://github.com/amitgambhir/claude-certified-architect-guide/blob/main/LICENSE">MIT License</a> · <a href="https://github.com/amitgambhir/claude-certified-architect-guide">Source on GitHub</a>
```

- [ ] **Step 3: Create `docs/stylesheets/custom.css`**

```css
/* Wider content area */
.md-grid {
  max-width: 80%;
}

/* Bold blue sidebar section titles */
nav.md-nav--primary .md-nav__item--section > .md-nav__link {
  color: #1565C0;
  font-weight: bold;
  font-size: 0.8rem;
}

/* Dark mode: header and sidebar blend with background */
[data-md-color-scheme="slate"] .md-header {
  background-color: var(--md-default-bg-color);
}

[data-md-color-scheme="slate"] .md-tabs {
  background-color: var(--md-default-bg-color);
}

/* Dark mode: sidebar section titles */
[data-md-color-scheme="slate"] nav.md-nav--primary .md-nav__item--section > .md-nav__link {
  color: #90CAF9;
}

/* Hide source repo metadata line */
.md-source__facts {
  display: none !important;
}

/* ── Quiz styles ── */
.quiz-q {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 12px;
}

.quiz-opt {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: var(--md-default-fg-color);
  margin-bottom: 6px;
  transition: background 0.15s;
}

.quiz-opt:hover:not(:disabled) {
  background: var(--md-code-bg-color);
}

.quiz-opt.correct {
  background: #EAF3DE;
  border-color: #639922;
  color: #3B6D11;
}

.quiz-opt.wrong {
  background: #FCEBEB;
  border-color: #E24B4A;
  color: #A32D2D;
}

.quiz-opt.selected {
  background: #E6F1FB;
  border-color: #378ADD;
  color: #0C447C;
}

[data-md-color-scheme="slate"] .quiz-opt.correct {
  background: #173404;
  border-color: #639922;
  color: #C0DD97;
}

[data-md-color-scheme="slate"] .quiz-opt.wrong {
  background: #501313;
  border-color: #A32D2D;
  color: #F7C1C1;
}

[data-md-color-scheme="slate"] .quiz-opt.selected {
  background: #042C53;
  border-color: #185FA5;
  color: #B5D4F4;
}

.qfb {
  font-size: 13px;
  padding: 10px 12px;
  border-radius: 8px;
  margin-top: 8px;
  line-height: 1.5;
  display: none;
}

.qfb-ok {
  background: #EAF3DE;
  color: #3B6D11;
}

.qfb-bad {
  background: #FCEBEB;
  color: #A32D2D;
}

[data-md-color-scheme="slate"] .qfb-ok {
  background: #173404;
  color: #C0DD97;
}

[data-md-color-scheme="slate"] .qfb-bad {
  background: #501313;
  color: #F7C1C1;
}

.pdots {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.dot {
  width: 18px;
  height: 4px;
  border-radius: 2px;
  background: var(--md-default-fg-color--lightest);
}

.dot.done {
  background: var(--md-default-fg-color);
}

.dot.cur {
  background: var(--md-default-fg-color--light);
}

.quiz-nav {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.next-btn, .prev-btn {
  padding: 8px 18px;
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 8px;
  background: var(--md-code-bg-color);
  color: var(--md-default-fg-color);
  cursor: pointer;
  font-size: 13px;
  display: none;
}

.next-btn:hover, .prev-btn:hover {
  background: var(--md-default-fg-color--lightest);
}
```

- [ ] **Step 4: Create `.github/workflows/deploy-pages.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Deploy to GitHub Pages
        run: mkdocs gh-deploy --force
```

- [ ] **Step 5: Add `site/` to `.gitignore`**

Append to existing `.gitignore`:
```
site/
```

- [ ] **Step 6: Copy PDF asset**

```bash
mkdir -p docs/assets
cp anthripic-exam-guide-en.pdf docs/assets/
```

- [ ] **Step 7: Create placeholder `docs/javascripts/quiz.js`**

Create an empty file — actual content comes in Task 14.

```javascript
// Quiz logic — populated in Task 14
```

- [ ] **Step 8: Install and test locally**

```bash
pip install -r requirements.txt
```

- [ ] **Step 9: Commit**

```bash
git add requirements.txt mkdocs.yml docs/stylesheets/custom.css .github/workflows/deploy-pages.yml .gitignore docs/assets/anthripic-exam-guide-en.pdf docs/javascripts/quiz.js
git commit -m "chore: add MkDocs Material scaffolding, theme config, quiz CSS, and deploy workflow"
```

---

## Task 2: Overview page (`docs/index.md`)

**Files:**
- Create: `docs/index.md`

**Source:** `index.html` lines 266–278 (overview section) + lines 1082–1116 (domains JS array)

- [ ] **Step 1: Create `docs/index.md`**

Port the 4 metric summary, the info note about 5 official domains mapping to 10 guide sections, the instruction text, and the full domain summary table. The domain table must include all 10 entries with links to their pages, exam weights, and key topic tags.

Content comes from:
- The `.grid4` metrics block (lines 267–272): Total domains = 10, Top area = Agent SDK (27%), Tools + MCP = 18% combined, Core model = Stateless API
- The `.alert.info` block (lines 273–275): the note about 5 official → 10 guide sections
- The paragraph (line 276): focus on trade-offs text
- The `domains[]` JS array (lines 1082–1093): all 10 domain entries with id, num, title, weight, tags, note

- [ ] **Step 2: Verify all 10 domain links resolve**

Each domain link in the table must match a file that will be created in later tasks:
- `domains/messages-api.md`, `domains/tool-design.md`, `domains/error-handling.md`, `domains/mcp.md`, `domains/agent-skills.md`, `domains/agent-sdk.md`, `domains/agentic-patterns.md`, `domains/workflow-design.md`, `domains/prompt-engineering.md`, `domains/context-management.md`

- [ ] **Step 3: Commit**

```bash
git add docs/index.md
git commit -m "feat: add overview page with domain summary table"
```

---

## Task 3: Exam Info page (`docs/exam-info.md`)

**Files:**
- Create: `docs/exam-info.md`

**Source:** `index.html` lines 168–263 (s-examinfo section)

- [ ] **Step 1: Create `docs/exam-info.md`**

Port all content from the exam info section:

1. Page title and subtitle (lines 169–170)
2. Four metrics grid (lines 172–177): Questions=60 MCQ, Duration=120 min, Passing=720/1000, Fee=$99
3. Collapsible: "The 5 official domains → how this guide covers them" (lines 179–212) — info alert about 47% weight + domain mapping table with 5 rows (Official Domain, Weight, Guide Sections)
4. Collapsible: "The 6 exam scenarios" (lines 214–228) — 6-row scenario table + warning alert
5. Collapsible: "Format, scoring & access" (lines 230–242) — 6-row details table
6. Collapsible: "Official preparation resources" (lines 244–256) — bullet list of courses + success alert about free access
7. Registration CTA block (lines 258–262) — with both external links (Claude Partner Network + Anthropic Academy)

Use `???` for all collapsible sections. Use `!!! info`, `!!! warning`, `!!! success` for alerts.

- [ ] **Step 2: Commit**

```bash
git add docs/exam-info.md
git commit -m "feat: add exam info page with domains, scenarios, and prep resources"
```

---

## Task 4: Domain 1 — Messages API (`docs/domains/messages-api.md`)

**Files:**
- Create: `docs/domains/messages-api.md`

**Source:** `index.html` lines 280–346 (s-messages section)

- [ ] **Step 1: Create `docs/domains/messages-api.md`**

Port all content:

1. Section header (lines 282–285): number badge "1", title "Messages API & Stop Reasons", subtitle "Maps to Domain 1 & 5 — foundational for everything"
2. Collapsible: "Stop reasons — memorize all 7" (lines 287–302) — info alert (`stop_reason ≠ error`) + 7-row table (stop_reason, Meaning, What to do) with all values: end_turn, max_tokens, stop_sequence, tool_use, pause_turn, refusal, model_context_window_exceeded
3. Collapsible: "Key API rules" (lines 304–315) — 5 bullet points about empty end_turn fix, streaming, pause_turn pattern, stateless API, cost growth
4. Collapsible: "Tool use flow (the loop)" (lines 317–334) — text flow diagram as code block + tool_choice table (auto, any, tool)
5. Collapsible: "Parallel tool use" (lines 336–345) — 3 bullets about read-only vs state-modifying

Use `??? note "Title — Subtitle"` for each card. Use `` `code` `` for inline code. Use `!!! info` for alerts.

- [ ] **Step 2: Commit**

```bash
git add docs/domains/messages-api.md
git commit -m "feat: add Messages API & Stop Reasons domain page"
```

---

## Task 5: Domain 2 — Tool Design (`docs/domains/tool-design.md`)

**Files:**
- Create: `docs/domains/tool-design.md`

**Source:** `index.html` lines 348–431 (s-tools section)

- [ ] **Step 1: Create `docs/domains/tool-design.md`**

Port all content:

1. Section header (lines 350–353)
2. Collapsible: "Descriptions drive tool selection — KEY EXAM TOPIC" (lines 355–370) — 4 bullets + info alert + quality comparison table (Losing vs Winning)
3. Collapsible: "Defining a tool — JSON Schema anatomy" (lines 372–393) — JSON code block with get_customer example showing nullable pattern + warning alert about `"type": ["string", "null"]`
4. Collapsible: "Fixing ambiguous parameters" (lines 395–405) — 3-row table (interdependent constraints, entity resolution, known valid values)
5. Collapsible: "Safety-critical ops: two-tool pattern" (lines 407–417) — description + numbered list + danger alert about prompt unreliability
6. Collapsible: "Structured output via tool_use (not JSON mode)" (lines 419–430) — explanation + 3 bullets + validation-retry loop paragraph

- [ ] **Step 2: Commit**

```bash
git add docs/domains/tool-design.md
git commit -m "feat: add Tool Interface Design domain page"
```

---

## Task 6: Domain 3 — Error Handling (`docs/domains/error-handling.md`)

**Files:**
- Create: `docs/domains/error-handling.md`

**Source:** `index.html` lines 433–483 (s-errors section)

- [ ] **Step 1: Create `docs/domains/error-handling.md`**

Port all content:

1. Section header (lines 435–438)
2. Collapsible: "The three error categories" (lines 440–449) — 3-row table (transient, permanent, uncertain state) + danger alert about uniform error handling
3. Collapsible: "Structured error response + isError flag" (lines 452–471) — JSON code block with isError example + 3 bullets + danger alert about exceptions stripping context
4. Collapsible: "MCP error tiers" (lines 474–482) — 2-row table (protocol-level vs application-level)

- [ ] **Step 2: Commit**

```bash
git add docs/domains/error-handling.md
git commit -m "feat: add Error Handling domain page"
```

---

## Task 7: Domain 4 — MCP (`docs/domains/mcp.md`)

**Files:**
- Create: `docs/domains/mcp.md`

**Source:** `index.html` lines 694–760 (s-mcp section)

- [ ] **Step 1: Create `docs/domains/mcp.md`**

Port all content:

1. Section header (lines 696–699)
2. Collapsible: "MCP core concepts" (lines 701–712) — 5-row table (MCP Server, MCP Tool, MCP Resource, .mcp.json, ~/.claude.json) + danger alert about what MCP does NOT provide
3. Collapsible: ".mcp.json structure + MCP Connector (API-level)" (lines 714–744) — .mcp.json code block + 2 bullets about simultaneous availability + env var syntax + Python API connector code block + description text
4. Collapsible: "Why MCP tools get ignored — fix it with descriptions" (lines 746–759) — explanation + danger alert (bad desc) + success alert (good desc) + 3 bullets about flat tool list, annotations trust, fix approach

- [ ] **Step 2: Commit**

```bash
git add docs/domains/mcp.md
git commit -m "feat: add MCP domain page"
```

---

## Task 8: Domain 5 — Agent Skills (`docs/domains/agent-skills.md`)

**Files:**
- Create: `docs/domains/agent-skills.md`

**Source:** `index.html` lines 548–638 (s-agentskills section)

- [ ] **Step 1: Create `docs/domains/agent-skills.md`**

Port all content:

1. Section header (lines 550–553)
2. Collapsible: "CLAUDE.md configuration hierarchy" (lines 555–567) — code block showing 3 levels + danger alert about user-level invisibility + @import syntax code block
3. Collapsible: ".claude/rules/ — path-scoped rules" (lines 569–583) — YAML code block + 3 bullets
4. Collapsible: "Commands & Skills — location and scope" (lines 585–602) — 4-row table (location, scope, version controlled) + SKILL.md frontmatter options list (context: fork, allowed-tools, argument-hint)
5. Collapsible: "Plan mode vs direct execution" (lines 604–617) — 2-column comparison table + info alert about pattern
6. Collapsible: "CI/CD integration + iterative techniques" (lines 619–637) — 5 bullets about -p flag, json output, session isolation, CLAUDE.md, /memory + 4 bullets about iterative refinement (concrete examples, test-driven, interview pattern, interacting issues)

- [ ] **Step 2: Commit**

```bash
git add docs/domains/agent-skills.md
git commit -m "feat: add Agent Skills — Claude Code domain page"
```

---

## Task 9: Domain 6 — Agent SDK (`docs/domains/agent-sdk.md`)

**Files:**
- Create: `docs/domains/agent-sdk.md`

**Source:** `index.html` lines 640–692 (s-agentsdk section)

- [ ] **Step 1: Create `docs/domains/agent-sdk.md`**

Port all content:

1. Section header (lines 642–645)
2. Collapsible: "The agent loop — 5 steps" (lines 647–657) — text flow diagram as code block showing all 5 steps
3. Collapsible: "ClaudeAgentOptions — cost and turn controls" (lines 659–673) — Python code block showing max_turns, max_budget_usd, resume examples
4. Collapsible: "Escalation triggers — 3 conditions" (lines 675–691) — 3 numbered conditions + wrong answer traps (3 bullets)

- [ ] **Step 2: Commit**

```bash
git add docs/domains/agent-sdk.md
git commit -m "feat: add Agent SDK domain page"
```

---

## Task 10: Domain 7 — Agentic Patterns (`docs/domains/agentic-patterns.md`)

**Files:**
- Create: `docs/domains/agentic-patterns.md`

**Source:** `index.html` lines 808–852 (s-agentic section)

- [ ] **Step 1: Create `docs/domains/agentic-patterns.md`**

Port all content:

1. Section header (lines 810–813)
2. Collapsible: "The four decomposition patterns" (lines 815–825) — 4-row table (prompt chaining, routing, orchestrator-workers, dynamic decomposition) + warning alert about overhead
3. Collapsible: "Sub-agent context transfer" (lines 827–837) — 3-row table (summary-and-spawn, resume session, parallel agents)
4. Collapsible: "Built-in tool selection reference" (lines 839–851) — 6-row table (Grep, Glob, Read, Edit, Read→Write, Bash)

- [ ] **Step 2: Commit**

```bash
git add docs/domains/agentic-patterns.md
git commit -m "feat: add Agentic Patterns domain page"
```

---

## Task 11: Domain 8 — Workflow Design (`docs/domains/workflow-design.md`)

**Files:**
- Create: `docs/domains/workflow-design.md`

**Source:** `index.html` lines 854–898 (s-workflow section)

- [ ] **Step 1: Create `docs/domains/workflow-design.md`**

Port all content:

1. Section header (lines 856–859)
2. Collapsible: "Escalation: when and how" (lines 861–873) — 3 bullets for when to escalate + warning alert about mechanical rules + handoff content paragraph
3. Collapsible: "Handling frustrated customers — correct sequence" (lines 875–884) — 3 numbered steps + follow-up paragraph about offering choice
4. Collapsible: "Enforcement spectrum" (lines 886–897) — 4-row table (prompt instructions, few-shot examples, tool-level validation, orchestration-layer hooks)

- [ ] **Step 2: Commit**

```bash
git add docs/domains/workflow-design.md
git commit -m "feat: add Workflow Design domain page"
```

---

## Task 12: Domain 9 — Prompt Engineering (`docs/domains/prompt-engineering.md`)

**Files:**
- Create: `docs/domains/prompt-engineering.md`

**Source:** `index.html` lines 762–806 (s-prompts section)

- [ ] **Step 1: Create `docs/domains/prompt-engineering.md`**

Port all content:

1. Section header (lines 764–767)
2. Collapsible: "Principles vs. conditionals" (lines 769–778) — 3-row table (use principles when, use explicit conditionals when, use programmatic enforcement when)
3. Collapsible: "The dilution problem" (lines 780–792) — explanation paragraph + 4 numbered mitigation strategies + warning alert about CRITICAL/NEVER/ALWAYS
4. Collapsible: "Key facts about system prompts" (lines 794–805) — 4 bullet points

- [ ] **Step 2: Commit**

```bash
git add docs/domains/prompt-engineering.md
git commit -m "feat: add Prompt Engineering domain page"
```

---

## Task 13: Domain 10 — Context Management (`docs/domains/context-management.md`)

**Files:**
- Create: `docs/domains/context-management.md`

**Source:** `index.html` lines 485–546 (s-context section)

- [ ] **Step 1: Create `docs/domains/context-management.md`**

Port all content:

1. Section header (lines 487–490)
2. Collapsible: "Context window fundamentals" (lines 492–502) — 3 bullets + warning alert about capacity vs attention
3. Collapsible: "Four context management strategies" (lines 504–514) — 4-row table (sliding window, progressive summarization, structured state objects, retrieval-based)
4. Collapsible: "Compaction (Agent SDK)" (lines 516–533) — 3 bullets about compaction + 5-row pattern table (extract facts, scratchpad, subagent delegation, explore subagent, /compact)
5. Collapsible: "Information provenance (multi-agent)" (lines 535–545) — 4 bullets about claim→source, conflicting sources, conflict_detected, coverage gaps

- [ ] **Step 2: Commit**

```bash
git add docs/domains/context-management.md
git commit -m "feat: add Context Management domain page"
```

---

## Task 14: Traps & Gotchas page (`docs/gotchas.md`)

**Files:**
- Create: `docs/gotchas.md`

**Source:** `index.html` lines 900–924 (s-gotchas section)

- [ ] **Step 1: Create `docs/gotchas.md`**

Port the full gotchas section:

1. Title and subtitle (lines 902–903)
2. Complete 3-column table with all 17 rows. Headers: "If the question says...", "Right answer", "Not..."
3. Every row from lines 906–923 must be present, preserving inline code formatting

- [ ] **Step 2: Commit**

```bash
git add docs/gotchas.md
git commit -m "feat: add Traps & Gotchas page"
```

---

## Task 15: Interactive Quiz (`docs/quiz.md` + `docs/javascripts/quiz.js`)

**Files:**
- Create: `docs/quiz.md`
- Modify: `docs/javascripts/quiz.js` (replace placeholder from Task 1)

**Source:** `index.html` lines 926–931 (quiz HTML) + lines 1118–1205 (quiz JS)

- [ ] **Step 1: Create `docs/quiz.md`**

```markdown
---
hide:
  - toc
---

# Self-test Quiz

15 scenario-based questions covering all domains including the new material.

<div id="quiz-container"></div>
```

The `hide: toc` frontmatter removes the table of contents sidebar for this page since the quiz is dynamic content.

- [ ] **Step 2: Create `docs/javascripts/quiz.js`**

Port the full quiz JS from `index.html` lines 1118–1205. This includes:

1. The complete `quiz[]` array with all 15 question objects (q, opts, ans, exp fields) — lines 1118–1133
2. State variables: `qi`, `confirmed`, `scores`, `picks` — line 1136
3. `renderQuiz()` function — lines 1137–1162
4. `highlightPick()` function — lines 1164–1168
5. `showConfirmed()` function — lines 1169–1177
6. `answer()` function — lines 1178–1182
7. `nextQ()` function — lines 1183–1201
8. `prevQ()` function — lines 1203–1205

Wrap everything in a `DOMContentLoaded` listener that checks for the quiz container:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  // ... all quiz code here, using 'container' instead of
  // document.getElementById('quiz-container') in renderQuiz()
});
```

Key adaptation: In `renderQuiz()`, replace `document.getElementById('quiz-container').innerHTML = ...` with `container.innerHTML = ...` since `container` is captured in the closure.

All 15 questions, all answer indices, all explanation texts must be identical to the source.

- [ ] **Step 3: Commit**

```bash
git add docs/quiz.md docs/javascripts/quiz.js
git commit -m "feat: add interactive quiz with all 15 questions"
```

---

## Task 16: Cheat Sheet page (`docs/cheat-sheet.md`)

**Files:**
- Create: `docs/cheat-sheet.md`

**Source:** `index.html` lines 934–1015 (s-cheat section)

- [ ] **Step 1: Create `docs/cheat-sheet.md`**

Port all 8 cheat sheet sections as markdown tables:

1. Title and subtitle (lines 935–936)
2. **API & Stop Reasons** (lines 938–946) — 6 rows
3. **Tool Design** (lines 948–957) — 7 rows
4. **Error Handling** (lines 959–967) — 6 rows
5. **Context Management** (lines 969–977) — 6 rows
6. **Claude Code (Agent Skills)** (lines 979–988) — 7 rows
7. **MCP** (lines 990–997) — 5 rows
8. **System Prompts** (lines 999–1005) — 4 rows
9. **Agentic Patterns** (lines 1007–1014) — 5 rows

Each section uses an `## H2` header and a 2-column markdown table (Concept | Key Point). All inline `code` formatting preserved.

- [ ] **Step 2: Commit**

```bash
git add docs/cheat-sheet.md
git commit -m "feat: add cheat sheet with all 8 reference sections"
```

---

## Task 17: Resources page (`docs/resources.md`)

**Files:**
- Create: `docs/resources.md`

**Source:** `index.html` lines 1017–1076 (s-resources section)

- [ ] **Step 1: Create `docs/resources.md`**

Port all 5 resource categories as collapsible sections with link tables:

1. Title and subtitle (lines 1018–1019)
2. Collapsible: "Official Documentation" (lines 1021–1032) — 5 links with descriptions
3. Collapsible: "Model Context Protocol (MCP)" (lines 1034–1043) — 3 links
4. Collapsible: "Agentic Patterns & Architecture" (lines 1045–1054) — 3 links
5. Collapsible: "Foundational Concepts" (lines 1056–1065) — 3 links
6. Collapsible: "Claude Code" (lines 1067–1075) — 2 links

Every URL must be preserved exactly. Use `???+ note` (default open) since resource links are meant to be browsed.

- [ ] **Step 2: Commit**

```bash
git add docs/resources.md
git commit -m "feat: add resources page with all external links"
```

---

## Task 18: Local verification and final commit

**Files:**
- No new files

- [ ] **Step 1: Run `mkdocs serve` and verify**

```bash
mkdocs serve
```

Open `http://127.0.0.1:8000/` and check:

1. All 16 pages load without errors
2. Navigation: grouped "Exam Domains" section in sidebar with all 10 domains
3. Top-level nav tabs: Overview, Exam Info, Exam Domains, Traps & Gotchas, Quiz, Cheat Sheet, Resources
4. Light/dark mode toggle works
5. Collapsible sections expand/collapse on every domain page
6. Quiz: all 15 questions navigate correctly, scoring works, progress dots update
7. All external links in Resources page are correct
8. Footer shows author, license, source links
9. PDF download link works from any page referencing it
10. Code blocks have syntax highlighting and copy button

- [ ] **Step 2: Run content verification against checklist**

Go through the spec's Content Verification Checklist (spec lines 267–284) page by page.

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address verification findings from local testing"
```

---

## Task 19: Update CLAUDE.md for new project structure

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md**

Replace the current content with updated documentation reflecting the MkDocs structure:

- Project overview now mentions MkDocs Material
- Development section: `pip install -r requirements.txt` + `mkdocs serve`
- Architecture: docs/ directory with 16 markdown pages, custom JS for quiz, custom CSS
- Deployment: GitHub Actions → gh-pages branch
- Keep section ID reference updated to page filenames
- Document the `extra_javascript` and `extra_css` config

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for MkDocs Material project structure"
```
