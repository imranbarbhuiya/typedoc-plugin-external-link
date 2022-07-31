import { join } from 'node:path';

export function resolveFilePath(filePath: string): string {
	return join(process.cwd(), filePath);
}

export function resolvePath<T>(path: string): T | null {
	try {
		return require(resolveFilePath(path));
	} catch {
		return null;
	}
}
