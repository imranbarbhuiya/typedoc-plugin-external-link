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

	const config = resolvePath<{ packageNames: string[]; getURL: getURL }>(app.options.getValue('externalLinkPath') as string);

	if (!config) {
		return app.logger.error('External links config file not found');
	}

	const { packageNames, getURL } = config;

	for (const packageName of packageNames)
		app.renderer.addUnknownSymbolResolver(packageName, (name) => {
			return getURL(packageName, name);
		});
}

export * from './interfaces/config';
