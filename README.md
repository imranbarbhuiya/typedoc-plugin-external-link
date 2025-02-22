<div align="center">

# typedoc-plugin-external-link

**A typedoc plugin to add custom external links.**

[![GitHub](https://img.shields.io/github/license/imranbarbhuiya/typedoc-plugin-external-link)](https://github.com/imranbarbhuiya/typedoc-plugin-external-link/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/imranbarbhuiya/typedoc-plugin-external-link/branch/main/graph/badge.svg?token=token)](https://codecov.io/gh/imranbarbhuiya/typedoc-plugin-external-link)
[![npm](https://img.shields.io/npm/v/typedoc-plugin-external-link?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/typedoc-plugin-external-link)

</div>

## Description

A typedoc plugin to add custom external links.

## Install

You can use the following command to install this package, or replace npm install with your package manager of choice.

```bash
npm install -D typedoc-plugin-external-link
```

> **Note**: This plugin requires typedoc `>=0.27.0`.

## Usage

Create a file with name `externalConfig.js` at the root of the project. The file should export `packageNames` and a `getURL` function.

### Example

```js
const packageNames = ['typedoc', 'typedoc-plugin-external-link'];

/**
 *
 * @type {import('typedoc-plugin-external-link').getURL}
 */
function getURL(packageName, type) {
	return 'https://github.com/imranbarbhuiya/typedoc-plugin-external-link';
}

module.exports = { packageNames, getURL };
```

You can specify custom config file path by adding `externalLinkPath` in `typedoc.json` file.

> **Warning**: for `entryPointStrategy=Package`, you need to add `externalLinkPath` to all packages in `typedoc.json` file.

## Buy me some doughnuts

If you want to support me by donating, you can do so by using any of the following methods. Thank you very much in advance!

<a href="https://github.com/sponsors/imranbarbhuiya" target="_blank"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Buy Me A Coffee" height="41" width="174"></a>
<a href="https://www.buymeacoffee.com/parbez" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
<a href='https://ko-fi.com/Y8Y1CBIJH' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi4.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Contributors ✨

Thanks goes to these wonderful people:

<a href="https://github.com/imranbarbhuiya/typedoc-plugin-external-link/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=imranbarbhuiya/typedoc-plugin-external-link" />
</a>
