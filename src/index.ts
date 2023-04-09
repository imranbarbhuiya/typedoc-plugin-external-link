import { Converter, ParameterType, type Application } from 'typedoc';
import type { getURL } from './interfaces/config';
import { resolvePath } from './utils/util';

export function load(app: Application) {
	app.options.addDeclaration({
		name: 'externalLinkPath',
		help: 'Define the path to the external links config file',
		type: ParameterType.Path,
		defaultValue: 'externalConfig.js'
	});

	app.converter.on(Converter.EVENT_RESOLVE, () => {
		const filePath = app.options.getValue('externalLinkPath') as string;

		const config = resolvePath<{ packageNames: string[]; getURL: getURL }>(filePath);

		if (!config) {
			return app.logger.error(`[typedoc-plugin-external-link]: External links config file \`${filePath}\` not found`);
		}

		const { packageNames, getURL } = config;

		if (!packageNames.length) {
			return app.logger.error(`[typedoc-plugin-external-link]: No packages defined in \`${filePath}\``);
		}

		app.converter.addUnknownSymbolResolver((ref) => {
			if (!packageNames.includes(ref.moduleSource!)) return;
			const name = ref.symbolReference?.path?.[0].path;
			const url = getURL(ref.moduleSource!, name);

			// If someone did {@link lodash!}, link them directly to the home page.
			if (!ref.symbolReference && url) return url;

			if (!ref.symbolReference?.path?.length) {
				// Someone included a meaning, but not a path.
				// https://typedoc.org/guides/declaration-references/#meaning
				return;
			}

			if (!url) return;

			return {
				target: url,
				caption: name
			};
		});
	});
}

export * from './interfaces/config';
