import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'

const httpLink = new HttpLink({
    uri: 'https://api.example.com/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

export function setupApollo(app: App) {
    app.provide(DefaultApolloClient, apolloClient)
}