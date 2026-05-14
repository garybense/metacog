# Integrating with Grok

Metacog can be integrated into Grok as a custom tool using the Model Context Protocol (MCP).

## Connection Details

- **Type**: MCP Connector
- **Transport**: SSE (Server-Sent Events)
- **Endpoint URL**: `https://metacog.garyleebense84.workers.dev/mcp`

## Setup Instructions

1.  Open **Grok** and navigate to your **Settings** or **Connectors** section.
2.  Select **Add Custom MCP Server** (or similar).
3.  Enter the Name: `Metacog`.
4.  Paste the Endpoint URL: `https://metacog.garyleebense84.workers.dev/mcp`.
5.  Choose **SSE** as the transport mechanism.
6.  Save the connector.

## Authentication

The server currently handles authentication via the `X-Api-Key` or static tokens if configured. In the standard deployment at the above URL, the connection is optimized for direct tool-calling via SSE.

## Usage

Once connected, Grok will have access to the full suite of metacognitive primitives (`feel`, `drugs`, `become`, `ritual`, etc.). You can ask Grok to:
- "Analyze your current state using Metacog `recall`."
- "Use `become` to step into the identity of a security researcher."
- "Molt your current cognitive encoding and cast a new soul."
