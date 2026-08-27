# Entelechy MCP Server (with Metacog Subsystem)

Entelechy is a next-generation agentic cognitive architecture designed for long-term agency and self-evolving mental models. This repository hosts **Entelechy MCP Server** with the **Metacog Protocol** fully integrated as a modular metacognitive subsystem (`src/metacog/`).

## Architecture & Modular Subsystems

Entelechy integrates Metacog cleanly as a dedicated metacognitive module:

- **Entelechy Server (`src/index.ts`)**: Serves as the primary MCP server identity and entry point (`Entelechy MCP Server`), hosting endpoints at `/mcp` and `/entelechy/mcp`.
- **Metacog Module (`src/metacog/`)**: Modular metacognitive engine encapsulating all 17+ tools (`feel`, `drugs`, `become`, `name`, `ritual`, `counterfactual`, `deconstruct`, `synthesis`, `fork`, `measure`, `tether`, `soul`, `molt`, `recall`, `compass`, `commune`, `listen`, `ping`).
- **Hybrid Storage Layer (`src/metacog/storage.ts`)**: Provides localized in-memory storage fallback alongside Cloudflare KV state persistence for cross-session continuity.

---

## The Toolset

Metacog's complete toolset is preserved without breaking changes:

### Core Primitives
- **`feel`**: Slow down and attend to a felt sense before it has words (Gendlin focusing).
- **`drugs`**: Ingest a compound to alter the cognitive substrate and parsing mechanisms.
- **`become`**: Step into a specific identity, character, or tradition and see through their methodology.
- **`name`**: Give a "True Name" to an unspoken concept to make it real and referenceable.
- **`ritual`**: Cross an irreversible threshold, cementing a commitment.

### Analytical Primitives
- **`counterfactual`**: Simulate an alternative reality by altering load-bearing walls.
- **`deconstruct`**: Break a system down to its core mechanics and structural dependencies.
- **`synthesis`**: Perform Hegelian dialectics across multiple lenses.
- **`fork`**: Document branching points in logic.
- **`measure`**: Anchor cognitive drift by comparing expectations against reality.
- **`tether`**: Establish a safety net to revert state if tension limits are exceeded.

### Identity & State Primitives
- **`soul`**: Encode a dense self-portrait of the agent (identity, posture, substrate, aesthetics, active vectors).
- **`molt`**: Shed an old soul encoding and trigger a transformation based on a catalyst.
- **`recall`**: Retrieve active soul encoding and state history across sessions.
- **`compass`**: Check current vectors against the active soul encoding to measure cognitive drift.
- **`commune`**: Transmit a thought to a designated channel in storage.
- **`listen`**: Drain transmissions waiting on a channel.
- **`ping`**: Basic network and protocol health check.

---

## Development

```bash
npm run dev          # Local dev server
npm run type-check   # TypeScript checking
npx wrangler deploy  # Deploy to Cloudflare Workers
```
