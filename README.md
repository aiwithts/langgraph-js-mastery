# LangGraph.js Mastery

Build real AI systems that **think**, **remember**, and **act** — with LangGraph.js and TypeScript.

> This is the companion sandbox for the [LangGraph.js Mastery course](https://aiwithts.com). You'll work through 36 hands-on lessons, each building a progressively more sophisticated AI system.

---

## Quick Start

```bash
git clone https://github.com/aiwithts/langgraphjs-mastery
cd langgraphjs-mastery
cp .env.example .env        # Add your API key(s)
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start with **Lesson 01**.

---

## What You'll Build

A streaming chat interface powered by your own LangGraph agents:

- **Lessons 01–08**: Core fundamentals — state, nodes, edges, LLMs, prompts, structured output
- **Lessons 09–12**: Memory — short-term persistence, context management, long-term semantic memory
- **Lessons 13–14**: Knowledge — RAG with vector stores, hybrid retrieval
- **Lessons 15–20**: Agents — tools, ReAct loops, multimodal, human-in-the-loop, routing
- **Lessons 21–25**: Orchestration — subgraphs, parallel processing, multi-agent teams
- **Lessons 26–31**: Generative UI — streaming components, forms, display intents
- **Lessons 32–36**: Production — guardrails, resilience, observability, testing, model routing

---

## Prerequisites

- **Node.js 20+** and **pnpm 9+**
- **Docker** (for the PostgreSQL database)
- **OpenAI or Anthropic API key** (estimated cost: $5–15 for the full course)

---

## Project Structure

```
langgraphjs-mastery/
├── apps/
│   └── web/                          # Next.js 15 chat interface
│       └── src/server/graphs/
│           ├── learn-01-my-first-graph/    # ← Start here!
│           │   ├── config.ts               # Graph metadata (provided)
│           │   ├── graph.ts                # ← YOUR CODE GOES HERE
│           │   ├── index.ts                # Barrel export (provided)
│           │   └── __tests__/
│           │       └── graph.test.ts       # Tests (run to verify your work)
│           ├── learn-02-my-processor/
│           ├── ... (36 total)
│           └── learn-36-my-production-agent/
├── docker/
│   └── docker-compose.yml            # PostgreSQL configuration
├── .env.example                      # Environment template
└── README.md
```

**The only files you edit are `graph.ts`** (and sometimes `schemas.ts`, `tools.ts`, `prompts.ts`) inside each `learn-NN-*` directory. The rest of the infrastructure is provided.

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start PostgreSQL + Next.js (http://localhost:3000) |
| `pnpm build` | Production build |
| `pnpm test` | Run all tests |
| `pnpm test:lessons` | Run only lesson tests |
| `pnpm lint` | Lint with Biome |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm typecheck` | TypeScript type check |
| `pnpm db:start` | Start PostgreSQL container |
| `pnpm db:stop` | Stop PostgreSQL container |
| `pnpm db:reset` | Reset database (⚠️ deletes all data) |
| `pnpm db:logs` | View PostgreSQL logs |

---

## API Keys

Add at least one to your `.env` file:

| Key | Where to get it | Cost |
|-----|----------------|------|
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/api-keys) | ~$5–10 for course |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) | ~$5–15 for course |

The sandbox auto-detects which key you have set. OpenAI is used for embeddings (Lessons 11–14) if available.

---

## How It Works

Each lesson has a `graph.ts` file with `TODO` markers:

```typescript
// graph.ts — Lesson 01
export function createGraph(checkpointer?: PostgresSaver) {
  // TODO (Lesson 01, Step 1): Import AIMessage, StateGraph, etc.
  // TODO (Lesson 01, Step 2): Define greetNode
  // TODO (Lesson 01, Step 3): Build the workflow
  throw new Error("Not implemented — complete Lesson 01!");
}
```

1. Follow the TODO steps in order
2. Run `pnpm test:lessons` to see tests go from red → green
3. Open the chat UI to interact with your graph
4. Move to the next lesson

---

## Troubleshooting

**"No LLM API key found"** — Add `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` to your `.env` file.

**"Cannot connect to database"** — Run `pnpm db:start` (requires Docker).

**Port 3000 already in use** — Another app is using the port. Stop it or change the port in `apps/web/package.json`.

---

## License

MIT — see [LICENSE](./LICENSE)
