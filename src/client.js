import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


// 딱 한번만 생성.
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})


export default client