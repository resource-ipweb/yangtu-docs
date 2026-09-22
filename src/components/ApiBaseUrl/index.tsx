import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getApiPlaygroundConfig} from '@site/src/components/ApiPlayground/credentials';

/** 文档中展示构建期注入的 API Base URL（来自 DOCS_API_BASE_URL + DOCS_API_DEV_BASE_URL）。 */
export default function ApiBaseUrl() {
	const {siteConfig} = useDocusaurusContext();
	const {apiRootUrl} = getApiPlaygroundConfig(siteConfig.customFields);
	return <code>{apiRootUrl}</code>;
}
