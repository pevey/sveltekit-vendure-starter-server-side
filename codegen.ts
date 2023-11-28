import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const IS_DEV = process.env.APP_ENV === 'dev'

const config: CodegenConfig = {
	schema: IS_DEV? process.env.VENDURE_SHOPAPI_DEV_URL: process.env.VENDURE_SHOPAPI_PROD_URL,
	documents: ['src/**/*.{ts,svelte}', '!src/lib/generated/*'],
	generates: {
		'src/lib/generated/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				useTypeImports: true, // This is needed to avoid Vite/SvelteKit import errors
				scalars: {
					// This tells codegen that the `Money` scalar is a number
					Money: 'number',
				}
			}
		},
	},
	ignoreNoDocuments: true
}
export default config