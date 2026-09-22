export const EMBED_QUERY_KEY = 'link';
export const EMBED_QUERY_VALUE = 'insert';
export const EMBED_STORAGE_KEY = 'docs-embed-insert-mode';
export const EMBED_MODE_CLASS = 'embed-insert-mode';

let embedSessionLocked = false;

/**
 * 锁定本次页面会话的嵌入模式（避免 iframe 内 sessionStorage 不可用）。
 */
export function lockEmbedInsertSession(): void {
  embedSessionLocked = true;
}

/**
 * 判断 URL 查询参数是否为 iframe 嵌入模式。
 */
export function isEmbedInsertMode(search: string): boolean {
  return new URLSearchParams(search).get(EMBED_QUERY_KEY) === EMBED_QUERY_VALUE;
}

/**
 * 写入嵌入模式会话标记。
 */
export function persistEmbedInsertMode(search: string): void {
  if (!isEmbedInsertMode(search)) {
    return;
  }

  lockEmbedInsertSession();

  try {
    sessionStorage.setItem(EMBED_STORAGE_KEY, '1');
  } catch {
    // iframe 或隐私模式下 sessionStorage 可能不可用
  }
}

/**
 * 判断当前是否应启用嵌入模式（查询参数或会话标记）。
 */
export function isEmbedInsertActive(search: string): boolean {
  if (isEmbedInsertMode(search)) {
    return true;
  }

  if (embedSessionLocked) {
    return true;
  }

  try {
    return sessionStorage.getItem(EMBED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * 为站内链接追加嵌入模式查询参数。
 */
export function appendEmbedInsertParam(href?: string): string | undefined {
  if (!href) {
    return href;
  }

  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return href;
  }

  if (/^https?:\/\//i.test(href)) {
    try {
      const url = new URL(href);
      if (
        typeof window !== 'undefined' &&
        url.origin !== window.location.origin
      ) {
        return href;
      }
      url.searchParams.set(EMBED_QUERY_KEY, EMBED_QUERY_VALUE);
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return href;
    }
  }

  const hashIndex = href.indexOf('#');
  const pathWithQuery = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const queryIndex = pathWithQuery.indexOf('?');
  const pathname =
    queryIndex >= 0 ? pathWithQuery.slice(0, queryIndex) : pathWithQuery;
  const query = queryIndex >= 0 ? pathWithQuery.slice(queryIndex + 1) : '';
  const params = new URLSearchParams(query);
  params.set(EMBED_QUERY_KEY, EMBED_QUERY_VALUE);

  const search = params.toString();
  return `${pathname}${search ? `?${search}` : ''}${hash}`;
}

/**
 * 将当前地址栏同步为嵌入模式 URL（不触发路由跳转）。
 */
export function syncEmbedInsertUrl(pathname: string, search: string, hash: string): void {
  const params = new URLSearchParams(search);
  params.set(EMBED_QUERY_KEY, EMBED_QUERY_VALUE);
  const nextUrl = `${pathname}?${params.toString()}${hash}`;

  if (`${pathname}${search}${hash}` !== nextUrl) {
    window.history.replaceState(window.history.state, '', nextUrl);
  }
}
