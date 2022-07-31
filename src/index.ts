import { join } from 'node:path';
import { ParameterType, type Application } from 'typedoc';
import type { getURL } from './interfaces/config';

export function load(app: Application) {
	app.options.addDeclaration({
		name: 'external-link-path',
		help: 'Define the path to the external links config file',
		type: ParameterType.String, // The default
		defaultValue: 'external-config.js' // The default
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
	const { packageNames, getURL }: { packageNames: string[]; getURL: getURL } = require(join(
		process.cwd(),
		app.options.getValue('external-link-path') as string
	));

	for (const packageName of packageNames)
		app.renderer.addUnknownSymbolResolver(packageName, (name) => {
			return getURL(packageName, name);
		});
}

export * from './interfaces/config';
