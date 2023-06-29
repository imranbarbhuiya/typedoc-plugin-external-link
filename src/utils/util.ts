export function resolvePath<T>(path: string): T | null {
	try {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		return require(path);
	} catch {
		return null;
	}
}
