import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, graphql} from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import App from './App.jsx';


const cache = new InMemoryCache();

const defaultState = {
  currentForm: {
    __typename: 'CurrentForm',
    firstName: 'Dawg',
    middleName: 'Dawg',
    lastName: 'Dawg',
    number: 'Dawg',
    email:'Dawg',
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    updateForm:(_, { firstName, middleName }, { cache }) => {
      console.log(firstName, middleName);
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'http://192.168.29.248:8000/graphql'
    })
  ]),
  cache
})

// const stateLink = withClientState({
//   cache,
//   resolvers: {
//     Mutation: {
//       updateNetworkStatus: (_, { isConnected }, { cache }) => {
//         const data = {
//           networkStatus: {
//             __typename: 'NetworkStatus',
//             isConnected
//           },
//         };
//         cache.writeData({ data });
//         return null;
//       },
//     },
//   },
//   defaults: {
//     networkStatus: {
//       __typename: 'NetworkStatus',
//       isConnected: true,
//     },
//   },
// });

// const client = new ApolloClient({
//   cache,
//   link: ApolloLink.from([stateLink, new HttpLink({ uri: 'http://192.168.29.248:8000/graphql'})]),
// });

// const UPDATE_NETWORK_STATUS = gql`
//   mutation updateNetworkStatus($isConnected: Boolean) {
//     updateNetworkStatus(isConnected: $isConnected) @client
//   }
// `;

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));