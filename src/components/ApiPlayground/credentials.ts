import type {ApiPlaygroundRuntimeConfig} from './env';
import {API_PLAYGROUND_DEFAULTS, joinApiRootUrl} from './env';

export function getApiPlaygroundConfig(
	customFields: Record<string, unknown> | undefined,
): ApiPlaygroundRuntimeConfig {
	const config = customFields?.apiPlayground;
	if (config && typeof config === 'object') {
		const defaultBaseUrl =
			'defaultBaseUrl' in config && typeof config.defaultBaseUrl === 'string'
				? config.defaultBaseUrl
				: API_PLAYGROUND_DEFAULTS.defaultBaseUrl;
		const devBaseUrl =
			'devBaseUrl' in config && typeof config.devBaseUrl === 'string'
				? config.devBaseUrl
				: API_PLAYGROUND_DEFAULTS.devBaseUrl;
		const apiRootUrl =
			'apiRootUrl' in config && typeof config.apiRootUrl === 'string'
				? config.apiRootUrl
				: joinApiRootUrl(defaultBaseUrl, devBaseUrl);
		const devFetchBaseUrl =
			'devFetchBaseUrl' in config && typeof config.devFetchBaseUrl === 'string'
				? config.devFetchBaseUrl
				: devBaseUrl.startsWith('/')
					? devBaseUrl
					: apiRootUrl;
		return {defaultBaseUrl, devBaseUrl, apiRootUrl, devFetchBaseUrl};
	}
	const devBaseUrl = API_PLAYGROUND_DEFAULTS.devBaseUrl;
	const apiRootUrl = joinApiRootUrl(API_PLAYGROUND_DEFAULTS.defaultBaseUrl, devBaseUrl);
	return {
		defaultBaseUrl: API_PLAYGROUND_DEFAULTS.defaultBaseUrl,
		devBaseUrl,
		apiRootUrl,
		devFetchBaseUrl: devBaseUrl,
	};
}

function isLocalDocsHost(): boolean {
	if (typeof window === 'undefined') {
		return false;
	}
	return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

/** 弹框默认展示的完整 API Base URL。 */
export function resolveApiRootUrl(config: ApiPlaygroundRuntimeConfig): string {
	return config.apiRootUrl;
}

/** 实际 fetch 使用的 URL（本地走相对路径代理，其余用绝对地址）。 */
export function resolveFetchUrl(
	baseUrl: string,
	path: string,
	config: ApiPlaygroundRuntimeConfig,
): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const normalizedBase = baseUrl.replace(/\/$/, '');

	if (isLocalDocsHost() && normalizedBase === config.apiRootUrl.replace(/\/$/, '')) {
		const fetchBase = config.devFetchBaseUrl.replace(/\/$/, '');
		return `${fetchBase}${normalizedPath}`;
	}

	return `${normalizedBase}${normalizedPath}`;
}

/** 拼接接口完整 URL（含协议、域名、路径），用于展示。 */
export function buildFullEndpointUrl(baseUrl: string, path: string): string {
	const normalizedBase = baseUrl.replace(/\/$/, '');
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const joined = `${normalizedBase}${normalizedPath}`;

	if (joined.startsWith('http://') || joined.startsWith('https://')) {
		return joined;
	}
	if (typeof window !== 'undefined') {
		return `${window.location.origin}${joined}`;
	}
	return joined;
}
