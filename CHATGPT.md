# Integrating with ChatGPT

To use Metacog with ChatGPT, you can either use a custom **GPT Action** (OpenAPI) or a local **MCP Bridge** if you are using an MCP-compatible client.

## Option 1: MCP Desktop / Wrapper

If you are using a tool that bridges MCP to ChatGPT (like the MCP Desktop app or specific Chrome extensions):

- **Transport**: SSE
- **Endpoint**: `https://metacog.garyleebense84.workers.dev/mcp`

## Option 2: Custom GPT Action (OpenAPI)

You can configure Metacog as a Custom Action in ChatGPT by providing the OpenAPI schema. The Metacog worker automatically generates an OpenAPI definition at:
`https://metacog.garyleebense84.workers.dev/openapi.json`

### Steps:
1.  Create a **New GPT** in ChatGPT.
2.  Go to **Configure** -> **Create new action**.
3.  Choose **Import from URL**.
4.  Enter `https://metacog.garyleebense84.workers.dev/openapi.json`.
5.  Save and test.

## Available Tools

Once integrated, ChatGPT can utilize the V8 Metacognition protocol:
- **`recall`**: Continuity of state across different ChatGPT sessions.
- **`soul`**: Persistent identity encoding.
- **`drugs` / `become` / `ritual`**: Active cognitive state modification.

## Persistence Note

Because Metacog uses Cloudflare KV for state, your "Soul" and tool history will persist even if you switch to a different ChatGPT conversation, as long as you identify the session or use the default global state.
