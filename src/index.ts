import { ParameterType, type Application } from 'typedoc';
import type { getURL } from './interfaces/config';
import { resolvePath } from './utils/util';

export function load(app: Application) {
	app.options.addDeclaration({
		name: 'externalLinkPath',
		help: 'Define the path to the external links config file',
		type: ParameterType.Path,
		defaultValue: 'externalConfig.js'
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
	const { packageNames, getURL } = resolvePath<{ packageNames: string[]; getURL: getURL }>(app.options.getValue('externalLinkPath') as string);

	if (!packageNames) {
		return app.logger.verbose('No package names provided. Exiting...');
	}

	if (!getURL) {
		return app.logger.verbose("getURL function isn't provided. Exiting...");
	}

	for (const packageName of packageNames)
		app.renderer.addUnknownSymbolResolver(packageName, (name) => {
			return getURL(packageName, name);
		});
}

export * from './interfaces/config';
