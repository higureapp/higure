import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_BACKEND_URL || '../api/src/schema.gql',

    documents: ['./**/*.{tsx,ts,graphql}'],

    ignoreNoDocuments: true,

    generates: {
        './gql_generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                "typescript-vue-apollo"
            ],
            config: {
                rawRequest: false,
                exposeQueryKeys: true,
                exposeDocument: true,
                withCompositionFunctions: true,
                vueCompositionApiImportFrom: 'vue'
            },
        },
    },
}

export default config