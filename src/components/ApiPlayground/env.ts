/** 在线调试：构建时从环境变量读取，经 customFields 注入前端（浏览器侧可安全引用）。 */
export type ApiPlaygroundRuntimeConfig = {
	/** 服务根地址，如 http://localhost:20021 或 https://006ip.com */
	defaultBaseUrl: string;
	/** API 路径前缀，如 /api、/api-user */
	devBaseUrl: string;
	/** 完整 API Base URL，如 http://localhost:20021/api */
	apiRootUrl: string;
	/** 本地 dev 代理用的相对路径，如 /api */
	devFetchBaseUrl: string;
};

export const API_PLAYGROUND_DEFAULTS = {
	defaultBaseUrl: 'http://localhost:20021',
	devBaseUrl: '/api',
	devProxyTarget: 'http://localhost:20021',
	devProxyPath: '/api',
} as const;

/** 拼接服务根地址与 API 前缀，得到完整 Base URL。 */
export function joinApiRootUrl(origin: string, prefix: string): string {
	const normalizedOrigin = origin.replace(/\/$/, '');
	if (!prefix || prefix === '/') {
		return normalizedOrigin;
	}
	const normalizedPrefix = prefix.startsWith('/') ? prefix : `/${prefix}`;
	if (normalizedOrigin.endsWith(normalizedPrefix)) {
		return normalizedOrigin;
	}
	return `${normalizedOrigin}${normalizedPrefix}`;
}
