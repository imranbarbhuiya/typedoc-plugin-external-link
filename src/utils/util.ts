import { join } from 'node:path';

export function resolvePath<T>(path: string): T | null {
	try {
		return require(join(process.cwd(), path));
	} catch {
		return null;
	}
}
