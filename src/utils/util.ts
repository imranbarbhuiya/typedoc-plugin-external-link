export function resolvePath<T>(path: string): { [key in keyof T]+?: T[key] } {
	try {
		return require(path);
	} catch {
		return {};
	}
}
