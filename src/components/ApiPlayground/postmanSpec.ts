import postmanCollection from '@site/postman.json';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type PostmanHeader = {
	key?: string;
	name?: string;
	value?: string;
	description?: string;
	disabled?: boolean;
};

type PostmanUrl = {
	raw?: string;
	path?: string[];
};

type PostmanRequest = {
	method?: string;
	url?: PostmanUrl;
	body?: {
		mode?: string;
		raw?: string;
	};
	header?: PostmanHeader[];
	description?: string;
};

type PostmanItem = {
	name?: string;
	item?: PostmanItem[];
	request?: PostmanRequest;
	description?: string;
};

export type PostmanCollection = {
	info?: {name?: string};
	item?: PostmanItem[];
};

export type ApiEndpointSpec = {
	/** 契约中的接口名称 */
	name: string;
	method: HttpMethod;
	/** 不含 /api 前缀，如 /open/staticip/location/countries */
	path: string;
	defaultBody: string;
	requireAuth: boolean;
	/** 除 UserId / Token 外的请求头 */
	extraHeaders: Array<{key: string; description?: string}>;
	description?: string;
};

const AUTH_HEADER_KEYS = new Set(['userid', 'token']);

function normalizeMethod(method?: string): HttpMethod {
	const upper = (method || 'GET').toUpperCase();
	if (upper === 'GET' || upper === 'POST' || upper === 'PUT' || upper === 'DELETE') {
		return upper;
	}
	return 'GET';
}

function extractApiPath(url?: PostmanUrl): string {
	if (!url) {
		return '';
	}
	if (url.path?.length) {
		const segments = url.path.filter((segment) => segment && segment !== 'api');
		return `/${segments.join('/')}`;
	}
	if (url.raw) {
		try {
			const pathname = new URL(url.raw).pathname.replace(/^\/api/, '');
			return pathname || '/';
		} catch {
			return '';
		}
	}
	return '';
}

/** 契约里常把空值写成 "null" 或 "\"null\""，展示/发送前改成真正的 null */
function replaceNullStrings(value: unknown): unknown {
	if (value === 'null' || value === '"null"') {
		return null;
	}
	if (Array.isArray(value)) {
		return value.map(replaceNullStrings);
	}
	if (value !== null && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
				key,
				replaceNullStrings(nested),
			]),
		);
	}
	return value;
}

function formatDefaultBody(raw?: string): string {
	if (!raw?.trim()) {
		return '{}';
	}
	try {
		return JSON.stringify(replaceNullStrings(JSON.parse(raw)), null, 2);
	} catch {
		return raw;
	}
}

function parseHeaders(headers?: PostmanHeader[]): {
	requireAuth: boolean;
	extraHeaders: Array<{key: string; description?: string}>;
} {
	const enabled = (headers || []).filter((header) => !header.disabled);
	const keys = enabled.map((header) => (header.key || header.name || '').trim());
	const requireAuth = keys.some((key) => key.toLowerCase() === 'userid') && keys.some((key) => key.toLowerCase() === 'token');
	const extraHeaders = enabled
		.map((header) => ({
			key: (header.key || header.name || '').trim(),
			description: header.description,
		}))
		.filter((header) => header.key && !AUTH_HEADER_KEYS.has(header.key.toLowerCase()));
	return {requireAuth, extraHeaders};
}

function flattenItems(items: PostmanItem[] | undefined, bucket: ApiEndpointSpec[]): void {
	for (const item of items || []) {
		if (item.request) {
			const {requireAuth, extraHeaders} = parseHeaders(item.request.header);
			bucket.push({
				name: item.name || item.request.description || '',
				method: normalizeMethod(item.request.method),
				path: extractApiPath(item.request.url),
				defaultBody: formatDefaultBody(item.request.body?.raw),
				requireAuth,
				extraHeaders,
				description: item.description || item.request.description,
			});
			continue;
		}
		flattenItems(item.item, bucket);
	}
}

const ENDPOINTS: ApiEndpointSpec[] = [];
flattenItems(postmanCollection.item, ENDPOINTS);

const BY_NAME = new Map(ENDPOINTS.map((endpoint) => [endpoint.name, endpoint]));
const BY_ROUTE = new Map(ENDPOINTS.map((endpoint) => [`${endpoint.method} ${endpoint.path}`, endpoint]));

export function listApiEndpoints(): ApiEndpointSpec[] {
	return ENDPOINTS;
}

export function findApiEndpointByName(name: string): ApiEndpointSpec | undefined {
	return BY_NAME.get(name);
}

export function findApiEndpointByRoute(method: string, path: string): ApiEndpointSpec | undefined {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return BY_ROUTE.get(`${method.toUpperCase()} ${normalizedPath}`);
}

export function resolveApiEndpoint(input: {
	name?: string;
	method?: string;
	path?: string;
}): ApiEndpointSpec | undefined {
	if (input.name) {
		const found = BY_NAME.get(input.name);
		return found;
	}
	if (input.method && input.path) {
		return findApiEndpointByRoute(input.method, input.path);
	}
	return undefined;
}
