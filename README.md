# 🧠 Claude Certified Architect — Exam Prep Guide

**A single-page, offline-ready study guide covering all 5 official exam domains across 10 focused sections, with interactive quizzes and a cheat sheet.**

![HTML](https://img.shields.io/badge/HTML-single_file-E34F26?logo=html5&logoColor=white)
![Offline](https://img.shields.io/badge/works-fully_offline-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## The Problem

The Claude Certified Architect exam covers 5 official domains — from Tool Design & MCP to Agentic Architecture & Orchestration. The official prep material is spread across docs, cheat sheets, and guides. There's no single place to study everything, test yourself, and review traps in one sitting — especially offline.

## What It Does

A self-contained HTML page hosted on GitHub Pages — or download and open locally. No server, no build step, no internet required.

| Feature | Details |
|---|---|
| **5 domains, 10 sections** | Each official exam domain is broken into focused sections — see mapping below |
| **Self-test quiz** | 15 exam-style questions with immediate feedback and explanations |
| **Traps & Gotchas** | Side-by-side correct vs. wrong answers for common exam traps |
| **Cheat sheet** | Quick-reference tables for every section |
| **Dark mode** | Automatic via `prefers-color-scheme` |

### Domain → Section Mapping

| Official Exam Domain | Weight | Guide Sections |
| --- | --- | --- |
| Tool Design & MCP Integration | 18% | 1. Messages API, 2. Tool Design, 3. Error Handling, 4. MCP |
| Claude Code Configuration & Workflows | 20% | 5. Agent Skills |
| Agentic Architecture & Orchestration | 27% | 6. Agent SDK, 7. Agentic Patterns, 8. Workflows |
| Prompt Engineering & Structured Output | 20% | 9. Prompt Engineering |
| Context Management & Reliability | 15% | 10. Context Management |

## Demo

```text
┌─────────────────────────────────────────────────────┐
│  Overview  1. Messages API  2. Tool Design  ...     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ● Exam domains     5 official                      │
│  ● Guide sections   10 focused topics               │
│  ● Top weight       Agentic Architecture (27%)      │
│  ● Core model       Stateless API                   │
│                                                     │
│  [1] Messages API & Stop Reasons        18%  ██▌    │
│  [2] Tool Interface Design              18%  ██▌    │
│  [3] Error Handling                     18%  ██▌    │
│  [6] Agent SDK                          27%  ███▊   │
│  ...                                                │
└─────────────────────────────────────────────────────┘
```

## Built On

| Tech | Why |
|---|---|
| **Vanilla HTML/CSS/JS** | Zero dependencies means it works offline forever — no CDN, no framework, no build tool to break |
| **CSS custom properties** | Light/dark theming with a single `prefers-color-scheme` media query |
| **GitHub Pages** | Free static hosting, deploy by pushing to `main` |

## Live Site

**[https://amitgambhir.github.io/claude-certified-architect-guide/](https://amitgambhir.github.io/claude-certified-architect-guide/)**

## Quickstart

```bash
# Study online
# Visit the live site above

# Or run locally
git clone https://github.com/amitgambhir/claude-certified-architect-guide.git
open claude-certified-architect-guide/index.html
```

## Deploy Your Own

1. Fork or clone this repo
2. Push to GitHub
3. Go to **Settings > Pages**
4. Set source to `main` branch, root directory
5. Your guide is live at `https://amitgambhir.github.io/claude-certified-architect-guide/`

## Why This Is Different

- **One file, zero dependencies** — no `npm install`, no build, no API keys. Download and study.
- **Exam-focused, not docs-focused** — organized by exam weight, with traps and gotchas called out explicitly.
- **Interactive self-testing** — quiz with explanations tells you exactly why each wrong answer is wrong.

## Contributing

Found a mistake? Have a better explanation for a tricky concept? Contributions are welcome.

1. Fork this repo
2. Edit `index.html` (everything lives in one file)
3. Open a pull request with a clear description of what changed and why

Good contributions: fixing incorrect answers, adding missing exam topics, improving quiz explanations, accessibility improvements.

If this guide helped you study, consider giving it a star.

*Built to pass the exam, not to explain the docs.*
