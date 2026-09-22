import type {ApiPlaygroundRuntimeConfig} from '@site/src/components/ApiPlayground/env';

declare module '@docusaurus/types' {
	interface SiteCustomFields {
		apiPlayground?: ApiPlaygroundRuntimeConfig;
	}
}
