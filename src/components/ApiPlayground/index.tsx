import {useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {buildFullEndpointUrl, getApiPlaygroundConfig, resolveApiRootUrl, resolveFetchUrl} from './credentials';
import {resolveApiEndpoint, type ApiEndpointSpec, type HttpMethod} from './postmanSpec';
import styles from './styles.module.css';

export type ApiPlaygroundProps = {
	/** 契约名称（postman.json 中的 name），与 method+path 二选一 */
	name?: string;
	/** HTTP 方法；与 path 搭配可从契约自动加载示例 Body */
	method?: HttpMethod;
	/** 接口路径，如 /open/staticip/location/countries */
	path?: string;
	/** 按钮文案（可选） */
	title?: string;
	/** 覆盖契约中的默认 JSON Body */
	defaultBody?: string;
	/** 覆盖契约中的鉴权要求 */
	requireAuth?: boolean;
};

type PlaygroundState = {
	status: number;
	statusText: string;
	durationMs: number;
	headers: string;
	body: string;
};

type ResolvedPlayground = {
	spec?: ApiEndpointSpec;
	method: HttpMethod;
	path: string;
	defaultBody: string;
	requireAuth: boolean;
	extraHeaders: Array<{key: string; description?: string}>;
	missingSpec: boolean;
};

function formatBody(text: string): string {
	try {
		return JSON.stringify(JSON.parse(text), null, 2);
	} catch {
		return text;
	}
}

function resolvePlayground(props: ApiPlaygroundProps): ResolvedPlayground | null {
	if (props.name) {
		const spec = resolveApiEndpoint({name: props.name});
		if (!spec) {
			return null;
		}
		return {
			spec,
			method: spec.method,
			path: spec.path,
			defaultBody: props.defaultBody ?? spec.defaultBody,
			requireAuth: props.requireAuth ?? spec.requireAuth,
			extraHeaders: spec.extraHeaders,
			missingSpec: false,
		};
	}
	if (props.method && props.path) {
		const spec = resolveApiEndpoint({method: props.method, path: props.path});
		if (spec) {
			return {
				spec,
				method: spec.method,
				path: spec.path,
				defaultBody: props.defaultBody ?? spec.defaultBody,
				requireAuth: props.requireAuth ?? spec.requireAuth,
				extraHeaders: spec.extraHeaders,
				missingSpec: false,
			};
		}
		return {
			method: props.method,
			path: props.path.startsWith('/') ? props.path : `/${props.path}`,
			defaultBody: props.defaultBody ?? '{}',
			requireAuth: props.requireAuth ?? true,
			extraHeaders: [],
			missingSpec: true,
		};
	}
	return null;
}

/**
 * 文档内嵌 API 在线调试：从 postman.json 读取契约，接口下方按钮，点击弹框调试。
 */
export default function ApiPlayground(props: ApiPlaygroundProps) {
	const {i18n, siteConfig} = useDocusaurusContext();
	const apiPlaygroundEnv = getApiPlaygroundConfig(siteConfig.customFields);
	const isZh = i18n.currentLocale === 'zh';
	const resolved = useMemo(
		() => resolvePlayground(props),
		[props.name, props.method, props.path, props.defaultBody, props.requireAuth],
	);
	const [open, setOpen] = useState(false);
	const [baseUrl, setBaseUrl] = useState(() => resolveApiRootUrl(apiPlaygroundEnv));
	const [userId, setUserId] = useState('');
	const [token, setToken] = useState('');
	const [extraHeaderValues, setExtraHeaderValues] = useState<Record<string, string>>({});
	const [requestBody, setRequestBody] = useState('{}');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [response, setResponse] = useState<PlaygroundState | null>(null);

	const method = resolved?.method ?? 'GET';
	const path = resolved?.path ?? '';
	const defaultBody = resolved?.defaultBody ?? '{}';
	const requireAuth = resolved?.requireAuth ?? true;
	const extraHeaders = resolved?.extraHeaders ?? [];

	const fullRequestUrl = useMemo(() => buildFullEndpointUrl(baseUrl, path), [baseUrl, path]);
	const fetchUrl = useMemo(
		() => resolveFetchUrl(baseUrl, path, apiPlaygroundEnv),
		[baseUrl, path, apiPlaygroundEnv],
	);

	useEffect(() => {
		setRequestBody(defaultBody);
	}, [defaultBody]);

	useEffect(() => {
		if (!open) {
			return;
		}
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};
		document.addEventListener('keydown', onKeyDown);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = '';
		};
	}, [open]);

	if (!resolved) {
		return (
			<div className={styles.error}>
				{isZh
					? `未在 postman.json 中找到接口「${props.name || ''}」，请检查契约文件或组件配置。`
					: `Endpoint not found in postman.json: ${props.name || 'check name / method + path'}.`}
			</div>
		);
	}

	function openDialog() {
		setError('');
		setResponse(null);
		setRequestBody(defaultBody);
		setExtraHeaderValues({});
		setBaseUrl(resolveApiRootUrl(apiPlaygroundEnv));
		setOpen(true);
	}

	function closeDialog() {
		if (loading) {
			return;
		}
		setOpen(false);
	}

	async function sendRequest() {
		setLoading(true);
		setError('');
		setResponse(null);
		const headers: Record<string, string> = {
			Accept: 'application/json',
		};
		if (requireAuth) {
			if (!userId.trim() || !token.trim()) {
				setLoading(false);
				setError(isZh ? '请填写 UserId 和 Token。' : 'UserId and Token are required.');
				return;
			}
			headers.UserId = userId.trim();
			headers.Token = token.trim();
		}
		for (const header of extraHeaders) {
			const value = extraHeaderValues[header.key]?.trim();
			if (value) {
				headers[header.key] = value;
			}
		}
		let body: string | undefined;
		if (method !== 'GET' && method !== 'DELETE') {
			headers['Content-Type'] = 'application/json';
			body = requestBody;
		}
		const started = performance.now();
		try {
			const result = await fetch(fetchUrl, {method, headers, body});
			const text = await result.text();
			const headerLines: string[] = [];
			result.headers.forEach((value, key) => {
				headerLines.push(`${key}: ${value}`);
			});
			setResponse({
				status: result.status,
				statusText: result.statusText,
				durationMs: Math.round(performance.now() - started),
				headers: headerLines.join('\n'),
				body: formatBody(text),
			});
		} catch (cause) {
			const message = cause instanceof Error ? cause.message : String(cause);
			setError(
				isZh
					? `请求失败：${message}。若浏览器报 CORS 错误，请配置 DOCS_API_DEV_BASE_URL 走本地代理，或由后端为文档域开启 CORS。`
					: `Request failed: ${message}. If this is a CORS error, configure DOCS_API_DEV_BASE_URL proxy or enable CORS on the API.`,
			);
		} finally {
			setLoading(false);
		}
	}

	const buttonLabel = props.title || (isZh ? '在线调试' : 'Try it');

	return (
		<>
			<div className={styles.trigger}>
				<button type="button" className={styles.triggerButton} onClick={openDialog}>
					{buttonLabel}
				</button>
			</div>

			{open ? (
				<div className={styles.overlay} onClick={closeDialog} role="presentation">
					<div
						className={styles.dialog}
						onClick={(event) => event.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-label={buttonLabel}>
						<div className={styles.dialogHeader}>
							<div className={styles.dialogTitle}>{buttonLabel}</div>
							<button
								type="button"
								className={styles.closeButton}
								onClick={closeDialog}
								disabled={loading}
								aria-label={isZh ? '关闭' : 'Close'}>
								×
							</button>
						</div>

						{resolved.missingSpec ? (
							<div className={styles.warn}>
								{isZh
									? '未在 postman.json 中找到该接口，使用文档中的手动配置。'
									: 'Endpoint not found in postman.json; using manual props.'}
							</div>
						) : null}

						<p className={styles.hint}>
							<code>{method}</code> <code>{path}</code>
						</p>

						<div className={styles.grid}>
							<label className={styles.row}>
								<span className={styles.label}>Base URL</span>
								<input
									className={styles.input}
									value={baseUrl}
									onChange={(event) => setBaseUrl(event.target.value)}
								/>
							</label>
							{requireAuth ? (
								<>
									<label className={styles.row}>
										<span className={styles.label}>UserId</span>
										<input
											className={styles.input}
											value={userId}
											onChange={(event) => setUserId(event.target.value)}
											autoComplete="off"
										/>
									</label>
									<label className={styles.row}>
										<span className={styles.label}>Token</span>
										<input
											className={styles.input}
											type="password"
											value={token}
											onChange={(event) => setToken(event.target.value)}
											autoComplete="off"
										/>
									</label>
								</>
							) : null}
							{extraHeaders.map((header) => (
								<label className={styles.row} key={header.key}>
									<span className={styles.label}>{header.key}</span>
									<input
										className={styles.input}
										value={extraHeaderValues[header.key] || ''}
										onChange={(event) =>
											setExtraHeaderValues((current) => ({
												...current,
												[header.key]: event.target.value,
											}))
										}
										placeholder={header.description}
										autoComplete="off"
									/>
								</label>
							))}
						</div>

						<div className={styles.row}>
							<span className={styles.label}>{isZh ? '完整 URL' : 'Full URL'}</span>
							<input className={styles.input} value={fullRequestUrl} readOnly />
						</div>

						{method !== 'GET' && method !== 'DELETE' ? (
							<label className={styles.row}>
								<span className={styles.label}>Body (JSON)</span>
								<textarea
									className={styles.textarea}
									value={requestBody}
									onChange={(event) => setRequestBody(event.target.value)}
									spellCheck={false}
								/>
							</label>
						) : null}

						<div className={styles.actions}>
							<button type="button" className={styles.button} onClick={sendRequest} disabled={loading}>
								{loading ? (isZh ? '请求中…' : 'Sending…') : isZh ? '发送请求' : 'Send request'}
							</button>
							{method !== 'GET' && method !== 'DELETE' ? (
								<button
									type="button"
									className={`${styles.button} ${styles.buttonSecondary}`}
									onClick={() => setRequestBody(defaultBody)}
									disabled={loading}>
									{isZh ? '重置 Body' : 'Reset body'}
								</button>
							) : null}
						</div>

						{error ? <div className={styles.error}>{error}</div> : null}
						{response ? (
							<div className={styles.response}>
								<div className={styles.meta}>
									{isZh ? '状态' : 'Status'}: {response.status} {response.statusText} ·{' '}
									{response.durationMs}ms
								</div>
								<pre className={styles.pre}>{response.body}</pre>
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</>
	);
}
