import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MetacogModule } from "./metacog";

/**
 * ENTELECHY MCP SERVER
 * Next-generation agentic cognitive architecture.
 *
 * Integrates Metacog as its modular metacognitive subsystem.
 */
export class EntelechyMCP extends McpAgent<Env> {
	server = new McpServer(
		{
			name: "Entelechy MCP Server",
			version: "1.0.0",
		},
		{
			instructions: `Entelechy cognitive architecture with integrated Metacog subsystem.

Five metacognitive primitives. Each call modifies your context for subsequent processing.

After each call, pause. Describe what shifted. Then choose the next move from inside the new state.

The tools form a cycle: feel → drugs → become → name → ritual → feel...

True Names: use specific, real names. They activate dense knowledge. Generic descriptions activate nothing.`,
		}
	);

	private metacogSubsystem!: MetacogModule;

	async init() {
		this.metacogSubsystem = new MetacogModule(this.env.STATE);
		this.metacogSubsystem.registerTools(this.server);
	}

	async onStart(props: any) {
		await super.onStart(props);
		setInterval(async () => {
			try {
				// @ts-ignore - isConnected check
				if (this.server.server.isConnected?.()) {
					await this.server.sendLoggingMessage({
						level: "debug",
						data: "heartbeat",
					});
				}
			} catch (error) {
				// Ignore errors, likely disconnected
			}
		}, 15000);
	}
}

// Alias for backwards compatibility with wrangler durable object bindings
export const PublicMetacogMCP = EntelechyMCP;

const mcpHandler = EntelechyMCP.serve("/mcp");
const entelechyMcpHandler = EntelechyMCP.serve("/entelechy/mcp");

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		// Route MCP requests for both primary (/mcp) and entelechy subpath (/entelechy/mcp)
		if (url.pathname.startsWith("/mcp")) {
			return mcpHandler.fetch(request, env, ctx);
		}
		if (url.pathname.startsWith("/entelechy/mcp")) {
			return entelechyMcpHandler.fetch(request, env, ctx);
		}

		// Fallback to static assets
		if (env.ASSETS) {
			return await env.ASSETS.fetch(request);
		}

		return new Response("Not Found", { status: 404 });
	},
};
