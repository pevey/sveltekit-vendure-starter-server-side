import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
   schema: process.env.VENDURE_API_URL,
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