# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A study guide for the **Claude Certified Architect** exam, built with MkDocs Material. 16 markdown pages covering all 10 exam domains, interactive quiz, traps & gotchas, cheat sheet, and resources. Hosted on GitHub Pages at `https://amitgambhir.github.io/claude-certified-architect-guide/`.

## Development

- **Local preview**: `source .venv/bin/activate && mkdocs serve` → `http://127.0.0.1:8000/`
- **Install deps**: `uv venv .venv && source .venv/bin/activate && uv pip install -r requirements.txt`
- **No tests** — manual browser verification only
- **Deployment** — push to `main` branch; GitHub Actions builds and deploys to `gh-pages` branch

## Architecture

- **MkDocs Material** site with `mkdocs.yml` config at repo root
- **Content**: 16 markdown files under `docs/` — 10 domain pages in `docs/domains/`, plus overview, exam info, gotchas, quiz, cheat sheet, resources
- **Interactive quiz**: `docs/javascripts/quiz.js` — 15 JS-driven questions with scoring and progress tracking. Loaded via `extra_javascript` in mkdocs.yml. Quiz data is a JS array of objects with `q`, `opts`, `ans` (0-indexed), and `exp` fields
- **Custom styles**: `docs/stylesheets/custom.css` — wider content area, quiz component styles, dark mode overrides
- **Navigation**: grouped sidebar with "Exam Domains" section containing all 10 domain pages; top-level tabs for overview, exam info, gotchas, quiz, cheat sheet, resources
- **Light/dark mode**: built-in MkDocs Material palette toggle

## Content Pages

| Page | File |
|---|---|
| Overview | `docs/index.md` |
| Official Exam Info | `docs/exam-info.md` |
| Domains 1–10 | `docs/domains/{messages-api,tool-design,error-handling,mcp,agent-skills,agent-sdk,agentic-patterns,workflow-design,prompt-engineering,context-management}.md` |
| Traps & Gotchas | `docs/gotchas.md` |
| Self-test Quiz | `docs/quiz.md` + `docs/javascripts/quiz.js` |
| Cheat Sheet | `docs/cheat-sheet.md` |
| Resources | `docs/resources.md` |

## Conventions

- Collapsible sections use `??? note "Title"` (pymdownx.details admonitions)
- Alert boxes use `!!! warning`, `!!! info`, `!!! success`, `!!! danger`
- Code blocks use fenced syntax with language tags
- Tables use standard markdown pipe syntax
- Quiz JS functions exposed on `window` for inline onclick handlers

## Hosting

Deployed via GitHub Actions (`.github/workflows/deploy-pages.yml`) to `gh-pages` branch. MkDocs builds the `docs/` directory into static HTML.
