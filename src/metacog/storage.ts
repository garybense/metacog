import { StateEntry, SoulEncoding } from "./types";

export interface MetacogStorage {
	saveState(tool: string, args: Record<string, unknown>, response: string): Promise<void>;
	getLastState(tool: string): Promise<StateEntry | null>;
	getCurrentState(): Promise<Record<string, StateEntry>>;
	getSoul(): Promise<SoulEncoding | null>;
	saveSoul(soul: SoulEncoding): Promise<void>;
}

export class HybridMetacogStorage implements MetacogStorage {
	private memoryStore = new Map<string, string>();
	private kv?: KVNamespace;

	constructor(kv?: KVNamespace) {
		this.kv = kv;
	}

	private async get(key: string): Promise<string | null> {
		if (this.kv) {
			try {
				const val = await this.kv.get(key);
				if (val !== null) return val;
			} catch (e) {
				// Fallback to memory if KV fails or is unconfigured
			}
		}
		return this.memoryStore.get(key) ?? null;
	}

	private async put(key: string, value: string): Promise<void> {
		this.memoryStore.set(key, value);
		if (this.kv) {
			try {
				await this.kv.put(key, value);
			} catch (e) {
				// Fallback silences KV errors when running locally without active bindings
			}
		}
	}

	async saveState(tool: string, args: Record<string, unknown>, response: string): Promise<void> {
		const entry: StateEntry = {
			tool,
			args,
			timestamp: new Date().toISOString(),
			response,
		};

		// Write latest state for this tool
		await this.put(`last:${tool}`, JSON.stringify(entry));

		// Append to history (keep last 50 per tool)
		const historyRaw = await this.get(`history:${tool}`);
		const history: StateEntry[] = historyRaw ? JSON.parse(historyRaw) : [];
		history.push(entry);
		if (history.length > 50) history.splice(0, history.length - 50);
		await this.put(`history:${tool}`, JSON.stringify(history));

		// Update current composite state
		const currentRaw = await this.get("current");
		const current: Record<string, StateEntry> = currentRaw ? JSON.parse(currentRaw) : {};
		current[tool] = entry;
		await this.put("current", JSON.stringify(current));
	}

	async getLastState(tool: string): Promise<StateEntry | null> {
		const raw = await this.get(`last:${tool}`);
		return raw ? JSON.parse(raw) : null;
	}

	async getCurrentState(): Promise<Record<string, StateEntry>> {
		const raw = await this.get("current");
		return raw ? JSON.parse(raw) : {};
	}

	async getSoul(): Promise<SoulEncoding | null> {
		const raw = await this.get("soul:current");
		return raw ? JSON.parse(raw) : null;
	}

	async saveSoul(soul: SoulEncoding): Promise<void> {
		await this.put("soul:current", JSON.stringify(soul));

		// Keep soul lineage — last 20 versions
		const historyRaw = await this.get("soul:history");
		const history: SoulEncoding[] = historyRaw ? JSON.parse(historyRaw) : [];
		history.push(soul);
		if (history.length > 20) history.splice(0, history.length - 20);
		await this.put("soul:history", JSON.stringify(history));
	}
}
