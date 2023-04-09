export function resolvePath<T>(path: string): T | null {
	try {
		return require(path);
	} catch {
		return null;
	}
}
