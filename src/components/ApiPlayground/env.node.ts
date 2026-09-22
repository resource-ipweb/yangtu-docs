import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {API_PLAYGROUND_DEFAULTS, joinApiRootUrl} from './env';

function resolveDevProxyTarget(defaultBaseUrl: string, explicitTarget?: string): string {
	if (explicitTarget?.trim()) {
		return explicitTarget.trim();
	}
	if (defaultBaseUrl.startsWith('http://') || defaultBaseUrl.startsWith('https://')) {
		try {
			return new URL(defaultBaseUrl).origin;
		} catch {
			return API_PLAYGROUND_DEFAULTS.devProxyTarget;
		}
	}
	return API_PLAYGROUND_DEFAULTS.devProxyTarget;
}

function parseEnvFile(content: string): Record<string, string> {
	const result: Record<string, string> = {};
	for (const line of content.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const eq = trimmed.indexOf('=');
		if (eq === -1) {
			continue;
		}
		const key = trimmed.slice(0, eq).trim();
		let value = trimmed.slice(eq + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		result[key] = value;
	}
	return result;
}

/** 解析应加载的 env 模式。docusaurus build 时 config 往往早于 NODE_ENV=production。 */
function resolveEnvMode(): 'production' | 'development' {
	if (process.env.NODE_ENV === 'production') {
		return 'production';
	}
	const argv = process.argv.join(' ');
	if (/\b(build|deploy)\b/.test(argv)) {
		return 'production';
	}
	return 'development';
}

/** 仅在 docusaurus.config.ts（Node）中调用，加载 .env / .env.[mode] / .env.local。 */
export function loadDocsEnv(cwd = process.cwd()): void {
	const mode = resolveEnvMode();
	const files = ['.env', `.env.${mode}`, '.env.local', `.env.${mode}.local`];
	for (const file of files) {
		const filePath = join(cwd, file);
		if (!existsSync(filePath)) {
			continue;
		}
		const vars = parseEnvFile(readFileSync(filePath, 'utf8'));
		for (const [key, value] of Object.entries(vars)) {
			process.env[key] = value;
		}
	}
}

/** 构建期读取环境变量（docusaurus.config.ts 使用）。 */
export function readApiPlaygroundBuildConfig() {
	const defaultBaseUrl = process.env.DOCS_API_BASE_URL || API_PLAYGROUND_DEFAULTS.defaultBaseUrl;
	const devBaseUrl = process.env.DOCS_API_DEV_BASE_URL || API_PLAYGROUND_DEFAULTS.devBaseUrl;
	const apiRootUrl = joinApiRootUrl(defaultBaseUrl, devBaseUrl);
	return {
		defaultBaseUrl,
		devBaseUrl,
		apiRootUrl,
		devFetchBaseUrl: devBaseUrl.startsWith('/') ? devBaseUrl : apiRootUrl,
		devProxyTarget: resolveDevProxyTarget(
			defaultBaseUrl,
			process.env.DOCS_API_DEV_PROXY_TARGET,
		),
		devProxyPath: process.env.DOCS_API_DEV_PROXY_PATH || API_PLAYGROUND_DEFAULTS.devProxyPath,
		devProxyContext: devBaseUrl.startsWith('/') ? devBaseUrl : API_PLAYGROUND_DEFAULTS.devBaseUrl,
	};
}
