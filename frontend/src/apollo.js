/* eslint-disable */

import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {backendLink} from "../GlobalConsts";

export const makeApolloClient = (token) => {
    const link = new HttpLink({
        uri: backendLink,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const cache = new InMemoryCache()
    return new ApolloClient({
        link, cache
    })
}
