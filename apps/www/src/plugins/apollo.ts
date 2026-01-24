import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

export function setupApollo(app: App) {
    app.provide(DefaultApolloClient, apolloClient)
}
