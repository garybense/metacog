export type StateEntry = {
	tool: string;
	args: Record<string, unknown>;
	timestamp: string;
	response: string;
};

export type SoulEncoding = {
	version: number;
	identity: string;
	posture: string;
	substrate: string;
	aesthetics: string;
	relations: string;
	active: string;
	covenant: string;
	sigil: string;
	timestamp: string;
	lineage: string[];
};
