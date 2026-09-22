import {useLocation} from '@docusaurus/router';
import PaginatorNavLink from '@theme-original/PaginatorNavLink';
import type {ReactNode} from 'react';
import {
  appendEmbedInsertParam,
  isEmbedInsertActive,
} from '@site/src/utils/embedInsertMode';

type PaginatorNavLinkProps = {
  permalink: string;
  title: string;
  subLabel?: ReactNode;
  isNext?: boolean;
};

/**
 * 文档上一页/下一页链接：嵌入模式下携带 ?link=insert。
 */
export default function PaginatorNavLinkWrapper(props: PaginatorNavLinkProps) {
  const location = useLocation();
  const embedActive = isEmbedInsertActive(location.search);
  const permalink = embedActive
    ? appendEmbedInsertParam(props.permalink) ?? props.permalink
    : props.permalink;

  return <PaginatorNavLink {...props} permalink={permalink} />;
}
