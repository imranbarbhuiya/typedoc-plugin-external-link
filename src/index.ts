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
		const filePath = app.options.getValue('externalLinkPath');

		if (!filePath || typeof filePath !== 'string') {
			return app.logger.error(`[typedoc-plugin-external-link]: Invalid external links config file path \`${filePath}\` provided`);
		}

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
			const names = ref.symbolReference?.path?.map((part) => part.path) ?? [];
			const url = getURL(ref.moduleSource!, ...names);

			// If someone did {@link lodash!}, link them directly to the home page.
			if (!ref.symbolReference && url) return url;

			if (!ref.symbolReference?.path?.length) {
				// Someone included a meaning, but not a path.
				// https://typedoc.org/guides/declaration-references/#meaning
				return;
			}

			if (!url) return;

			if (ref.symbolReference.path.length === 1) {
				return {
					target: url,
					caption: names[0]
				};
			}

			return url;
		});
	});
}

export * from './interfaces/config';
