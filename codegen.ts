import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
   schema: process.env.VENDURE_API_URL,
   documents: ['src/**/*.{ts,svelte}', '!src/__generated__/*'],
   generates: {
      './src/__generated__/': {
         preset: 'client',
         presetConfig: {
            gqlTagName: "gql",
         },
      },
   },
   ignoreNoDocuments: true
}
export default config