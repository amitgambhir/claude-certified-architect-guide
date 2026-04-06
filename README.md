# 🧠 Claude Certified Architect — Exam Prep Guide

**A documentation site covering all 5 official exam domains across 10 focused sections, with an interactive quiz, traps & gotchas, and a cheat sheet.**

![MkDocs Material](https://img.shields.io/badge/MkDocs-Material-526CFE?logo=materialformkdocs&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub_Pages-222?logo=github)

## The Problem

The Claude Certified Architect exam covers 5 official domains — from Tool Design & MCP to Agentic Architecture & Orchestration. The official prep material is spread across docs, cheat sheets, and guides. There's no single place to study everything, test yourself, and review traps in one sitting.

## What It Does

A MkDocs Material site hosted on GitHub Pages with grouped navigation, collapsible study sections, and a fully interactive quiz.

| Feature | Details |
|---|---|
| **5 domains, 10 sections** | Each official exam domain is broken into focused sections — see mapping below |
| **Self-test quiz** | 15 exam-style questions with scoring, progress tracking, and explanations |
| **Traps & Gotchas** | Side-by-side correct vs. wrong answers for common exam traps |
| **Cheat sheet** | Quick-reference tables for every section |
| **Light/dark mode** | Built-in toggle with automatic detection |
| **Search** | Full-text search across all pages |

### Domain → Section Mapping

| Official Exam Domain | Weight | Guide Sections |
|---|---|---|
| Tool Design & MCP Integration | 18% | 1. Messages API, 2. Tool Design, 3. Error Handling, 4. MCP |
| Claude Code Configuration & Workflows | 20% | 5. Agent Skills |
| Agentic Architecture & Orchestration | 27% | 6. Agent SDK, 7. Agentic Patterns, 8. Workflows |
| Prompt Engineering & Structured Output | 20% | 9. Prompt Engineering |
| Context Management & Reliability | 15% | 10. Context Management |

## Built On

| Tech | Why |
|---|---|
| **MkDocs Material** | Clean documentation theme with built-in search, dark mode, collapsible sections, and code copy |
| **Markdown** | Content in 16 separate `.md` files — easy to read, edit, and review via PRs |
| **GitHub Actions** | Auto-deploys to GitHub Pages on every push to `main` |

## Live Site

**[https://amitgambhir.github.io/claude-certified-architect-guide/](https://amitgambhir.github.io/claude-certified-architect-guide/)**

## Quickstart

```bash
# Study online
# Visit the live site above

# Or run locally
git clone https://github.com/amitgambhir/claude-certified-architect-guide.git
cd claude-certified-architect-guide
uv venv .venv && source .venv/bin/activate
uv pip install -r requirements.txt
mkdocs serve
# Open http://127.0.0.1:8000/
```

## Deploy Your Own

1. Fork or clone this repo
2. Push to GitHub
3. Go to **Settings > Pages**
4. Set source to "Deploy from a branch" → `gh-pages` branch, `/ (root)`
5. The GitHub Actions workflow will build and deploy on every push to `main`

## Why This Is Different

- **Exam-focused, not docs-focused** — organized by exam weight, with traps and gotchas called out explicitly.
- **Interactive self-testing** — quiz with scoring tells you exactly why each wrong answer is wrong.
- **Easy to contribute** — content lives in markdown files, not a monolithic HTML file.

## Contributing

Found a mistake? Have a better explanation for a tricky concept? Contributions are welcome.

1. Fork this repo
2. Edit the relevant `.md` file under `docs/`
3. Preview with `mkdocs serve`
4. Open a pull request with a clear description of what changed and why

Good contributions: fixing incorrect answers, adding missing exam topics, improving quiz explanations, accessibility improvements.

If this guide helped you study, consider giving it a star.

*Built to pass the exam, not to explain the docs.*
