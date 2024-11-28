import { Converter, ParameterType, type Application } from 'typedoc';

export function load(app: Application) {
	app.options.addDeclaration({
		name: 'externalLinkPath',
		help: 'Define the path to the external links config file',
		type: ParameterType.Path,
		defaultValue: 'externalConfig.js',
	});

	app.converter.on(Converter.EVENT_RESOLVE, async () => {
		const filePath = app.options.getValue('externalLinkPath');

		if (!filePath || typeof filePath !== 'string') {
			app.logger.error(
				`[typedoc-plugin-external-link]: Invalid external links config file path \`${filePath}\` provided`,
			);
			return;
		}

		const config = await import(filePath).catch(() => null);

		if (!config) {
			app.logger.error(`[typedoc-plugin-external-link]: External links config file \`${filePath}\` not found`);
			return;
		}

		const { packageNames, getURL } = config;

		if (!packageNames.length) {
			app.logger.error(`[typedoc-plugin-external-link]: No packages defined in \`${filePath}\``);
			return;
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
					caption: names[0],
				};
			}

			return url;
		});
	});
}

export type * from './interfaces/config.js';
