import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { DefaultApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})


const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
})

export function setupApollo(app: App) {
    app.provide(DefaultApolloClient, apolloClient)
}

export { apolloClient }