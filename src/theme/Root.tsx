import {useLayoutEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import type {ReactNode} from 'react';
import {
  EMBED_MODE_CLASS,
  isEmbedInsertActive,
  isEmbedInsertMode,
  lockEmbedInsertSession,
  persistEmbedInsertMode,
  syncEmbedInsertUrl,
} from '@site/src/utils/embedInsertMode';

type RootProps = {
  children: ReactNode;
};

/**
 * 解析嵌入模式状态，并在本次页面会话内保持激活。
 */
function resolveEmbedInsertActive(search: string): boolean {
  if (isEmbedInsertMode(search)) {
    persistEmbedInsertMode(search);
    return true;
  }

  const active = isEmbedInsertActive(search);
  if (active) {
    lockEmbedInsertSession();
  }

  return active;
}

/**
 * 根布局：iframe 嵌入时（?link=insert）通过 Helmet 注入 html class，隐藏导航等区域。
 */
export default function Root({children}: RootProps) {
  const location = useLocation();
  const [embedActive, setEmbedActive] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return resolveEmbedInsertActive(window.location.search);
  });

  useLayoutEffect(() => {
    const active = resolveEmbedInsertActive(location.search);
    setEmbedActive(active);

    if (active && !isEmbedInsertMode(location.search)) {
      syncEmbedInsertUrl(
        location.pathname,
        location.search,
        location.hash,
      );
    }
  }, [location.pathname, location.search, location.hash]);

  if (!embedActive) {
    return <>{children}</>;
  }

  return (
    <HtmlClassNameProvider className={EMBED_MODE_CLASS}>
      {children}
    </HtmlClassNameProvider>
  );
}
